import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit } from '@/lib/rate-limit'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import { getRequestIp, verifyTurnstile } from '@/lib/security'

const formSubmissionSchema = z.object({
  formTitle: z.string().trim().max(200).optional(),
  answers: z.record(z.string().max(100), z.union([z.string().max(1500), z.number(), z.boolean(), z.array(z.string().max(200))])).default({}),
  utmParams: z.object({
    utm_source: z.string().max(100).optional(), utm_medium: z.string().max(100).optional(),
    utm_campaign: z.string().max(100).optional(), utm_term: z.string().max(100).optional(), utm_content: z.string().max(100).optional(),
  }).optional(),
  pagePath: z.string().max(500).optional(),
  turnstileToken: z.string().min(1).optional(),
  website: z.string().max(0).optional().default(''),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const formId = resolvedParams.id

    const body = formSubmissionSchema.safeParse(await request.json())
    if (!body.success) return NextResponse.json({ error: 'Thông tin biểu mẫu không hợp lệ.' }, { status: 400 })
    const isPartial = false

    // 1. IP Rate Limit check (Skipped or relaxed for partial auto-save typing)
    const ip = getRequestIp(request)
    if (!isPartial) {
      const { isRateLimited } = checkRateLimit(ip, 10, 10 * 60 * 1000)
      if (isRateLimited) {
        return NextResponse.json(
          { error: 'Too many submissions. Please wait a few minutes before submitting again.' },
          { status: 429 }
        )
      }
    }
    if (!await verifyTurnstile(body.data.turnstileToken, ip)) return NextResponse.json({ error: 'Không thể xác minh biểu mẫu.' }, { status: 403 })

    // Extract client metadata
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const referrer = request.headers.get('referer') || 'Direct'
    const pagePath = body.data.pagePath || `/forms/${formId}`

    const submissionPayload = {
      id: crypto.randomUUID(),
      form_id: formId,
      form_title: body.data.formTitle || 'Dynamic Form Submission',
      answers: body.data.answers,
      is_partial: isPartial,
      utm_params: {
        utm_source: body.data.utmParams?.utm_source || 'direct',
        utm_medium: body.data.utmParams?.utm_medium || 'none',
        utm_campaign: body.data.utmParams?.utm_campaign || 'general',
        utm_term: body.data.utmParams?.utm_term || '',
        utm_content: body.data.utmParams?.utm_content || '',
      },
      client_metadata: {
        ip: ip,
        userAgent: userAgent,
        referrer: referrer,
        pagePath: pagePath,
        city: request.headers.get('x-vercel-ip-city') || 'Hanoi',
        country: request.headers.get('x-vercel-ip-country') || 'VN',
        isPartial: isPartial,
      },
      created_at: new Date().toISOString(),
    }

    // Save to Supabase DB
    const supabase = createAdminSupabaseClient()
    const { data: form, error: formError } = await supabase.from('custom_forms').select('id,is_active').eq('id', formId).maybeSingle()
    if (formError || !form?.is_active) return NextResponse.json({ error: 'Biểu mẫu không khả dụng.' }, { status: 404 })
    const { error } = await supabase
      .from('form_responses')
      .insert([submissionPayload])

    if (error) {
      console.warn('Supabase form_responses insert notice:', error.message)
    }

    return NextResponse.json(
      {
        success: true,
        isPartial: isPartial,
        message: isPartial ? 'Partial lead auto-saved.' : 'Form response submitted successfully. Thank you!',
        submissionId: submissionPayload.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting form response:', error)
    return NextResponse.json(
      { error: 'An error occurred while saving your form response.' },
      { status: 500 }
    )
  }
}
