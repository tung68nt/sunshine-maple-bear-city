import { NextRequest, NextResponse } from 'next/server'
import { eventRegistrationSchema } from '@/lib/validation/forms'
import { escapeHtml, getRequestIp, verifyTurnstile } from '@/lib/security'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const ip = getRequestIp(request)
    if (checkRateLimit(ip, 5, 10 * 60 * 1000).isRateLimited) {
      return NextResponse.json({ error: 'Too many registrations. Please try again after 10 minutes.' }, { status: 429 })
    }
    const body = eventRegistrationSchema.safeParse(await request.json())
    if (!body.success) return NextResponse.json({ error: 'Thông tin đăng ký không hợp lệ.' }, { status: 400 })
    if (!await verifyTurnstile(body.data.turnstileToken, getRequestIp(request))) return NextResponse.json({ error: 'Không thể xác minh biểu mẫu.' }, { status: 403 })

    // Try sending email notification via Resend
    const recipient = process.env.ADMIN_EMAIL
    if (process.env.RESEND_API_KEY && recipient) {
      try {
        const { Resend } = require('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        await resend.emails.send({
          from: 'Sunshine Maple Bear <noreply@resend.dev>', // Use verified domain in production
          to: [recipient],
          subject: `New Event Registration: ${escapeHtml(body.data.eventTitle)}`,
          html: `
            <h2>New Event Registration</h2>
            <p><strong>Event:</strong> ${escapeHtml(body.data.eventTitle)}</p>
            <p><strong>Registrant:</strong> ${escapeHtml(body.data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(body.data.email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(body.data.phone)}</p>
            <p><strong>Number of Participants:</strong> ${body.data.participants}</p>
            <p><strong>Notes:</strong> ${escapeHtml(body.data.note || 'None')}</p>
          `,
        })
      } catch (emailError) {
        console.error('Error sending email notification:', emailError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting event registration:', error)
    return NextResponse.json(
      { error: 'An error occurred while registering. Please try again.' },
      { status: 500 }
    )
  }
}
