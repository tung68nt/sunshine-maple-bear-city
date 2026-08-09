import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { supabase } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const formId = resolvedParams.id

    const body = await request.json()
    const isPartial = body.isPartial === true

    // 1. IP Rate Limit check (Skipped or relaxed for partial auto-save typing)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1'
    if (!isPartial) {
      const { isRateLimited } = checkRateLimit(ip, 10, 10 * 60 * 1000)
      if (isRateLimited) {
        return NextResponse.json(
          { error: 'Too many submissions. Please wait a few minutes before submitting again.' },
          { status: 429 }
        )
      }
    }

    // Extract client metadata
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const referrer = request.headers.get('referer') || body.referrer || 'Direct'
    const pagePath = body.pagePath || `/forms/${formId}`

    const submissionPayload = {
      id: isPartial ? `draft-${Date.now()}` : `resp-${Date.now()}`,
      form_id: formId,
      form_title: body.formTitle || 'Dynamic Form Submission',
      answers: body.answers || {},
      is_partial: isPartial,
      utm_params: {
        utm_source: body.utm_source || body.utmParams?.utm_source || 'direct',
        utm_medium: body.utm_medium || body.utmParams?.utm_medium || 'none',
        utm_campaign: body.utm_campaign || body.utmParams?.utm_campaign || 'general',
        utm_term: body.utm_term || body.utmParams?.utm_term || '',
        utm_content: body.utm_content || body.utmParams?.utm_content || '',
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
