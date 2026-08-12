import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import { admissionSchema } from '@/lib/validation/forms'
import { escapeHtml, getRequestIp, verifyTurnstile } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const ip = getRequestIp(request)
    const { isRateLimited } = checkRateLimit(ip, 5, 10 * 60 * 1000)

    if (isRateLimited) {
      return NextResponse.json(
        { error: 'Too many submissions from your IP. Please try again after 10 minutes.' },
        { status: 429 }
      )
    }

    const body = admissionSchema.safeParse(await request.json())
    if (!body.success) return NextResponse.json({ error: 'Thông tin đăng ký không hợp lệ.' }, { status: 400 })
    if (!await verifyTurnstile(body.data.turnstileToken, ip)) return NextResponse.json({ error: 'Không thể xác minh biểu mẫu.' }, { status: 403 })

    // 2. Input Validation
    const supabase = createAdminSupabaseClient()

    const { error } = await supabase
      .from('admissions')
      .insert([
        {
          id: crypto.randomUUID(),
          child_name: body.data.childName,
          // PostgreSQL `date` must receive an ISO date or NULL, never an empty string.
          child_dob: body.data.childDob || null,
          grade_level: body.data.gradeLevel || 'Nursery',
          parent_name: body.data.parentName,
          parent_email: body.data.parentEmail,
          parent_phone: body.data.parentPhone,
          notes: body.data.notes,
          status: 'submitted',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) throw error

    // 3. Resend Email Dispatch
    const recipient = process.env.ADMIN_EMAIL
    if (process.env.RESEND_API_KEY && recipient) {
      try {
        const { Resend } = require('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
          from: 'Sunshine Maple Bear <noreply@resend.dev>',
          to: [recipient],
          subject: `New admission application: ${escapeHtml(body.data.parentName)} (${escapeHtml(body.data.childName)})`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1D1D1B;">
              <h2 style="color: #C8102E;">New Admissions Application Submitted</h2>
              <p><strong>Parent Name:</strong> ${escapeHtml(body.data.parentName)}</p>
              <p><strong>Parent Email:</strong> ${escapeHtml(body.data.parentEmail)}</p>
              <p><strong>Parent Phone:</strong> ${escapeHtml(body.data.parentPhone)}</p>
              <p><strong>Child Full Name:</strong> ${escapeHtml(body.data.childName)} (DOB: ${escapeHtml(body.data.childDob)})</p>
              <p><strong>Grade Level:</strong> ${escapeHtml(body.data.gradeLevel || 'N/A')}</p>
              <p><strong>Notes:</strong> ${escapeHtml(body.data.notes || 'None')}</p>
            </div>
          `,
        })
      } catch (emailError) {
        // The application is already safely stored; alerts can be retried from the admin queue.
        console.error('Error sending admission notification:', emailError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Enrollment application submitted successfully. We will review and contact you shortly.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting admission:', error)
    return NextResponse.json(
      { error: 'An error occurred while submitting application.' },
      { status: 500 }
    )
  }
}
