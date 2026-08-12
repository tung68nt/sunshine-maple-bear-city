import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import { tourBookingSchema } from '@/lib/validation/forms'
import { escapeHtml, getRequestIp, verifyTurnstile } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const ip = getRequestIp(request)
    const { isRateLimited } = checkRateLimit(ip, 10, 10 * 60 * 1000)

    if (isRateLimited) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait 10 minutes before submitting again.' },
        { status: 429 }
      )
    }

    const body = tourBookingSchema.safeParse(await request.json())
    if (!body.success) return NextResponse.json({ error: 'Thông tin đặt lịch không hợp lệ.' }, { status: 400 })
    if (!await verifyTurnstile(body.data.turnstileToken, ip)) return NextResponse.json({ error: 'Không thể xác minh biểu mẫu.' }, { status: 403 })

    // 2. Input Validation
    const supabase = createAdminSupabaseClient()
    const parsedAge = body.data.childAge ? parseInt(body.data.childAge.replace(/\D/g, ''), 10) : null
    const childAgeVal = parsedAge && !isNaN(parsedAge) ? parsedAge : null

    const { error } = await supabase
      .from('tour_bookings')
      .insert([
        {
          id: crypto.randomUUID(),
          visitor_name: body.data.visitorName,
          visitor_email: body.data.visitorEmail,
          visitor_phone: body.data.visitorPhone,
          preferred_date: body.data.preferredDate || new Date().toISOString().split('T')[0],
          preferred_time: body.data.preferredTime || '09:00',
          child_age: childAgeVal,
          notes: body.data.notes,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) throw error

    // 3. Email Dispatch via Resend API
    const recipient = process.env.ADMIN_EMAIL
    if (process.env.RESEND_API_KEY && recipient) {
      try {
        const { Resend } = require('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
          from: 'Sunshine Maple Bear <noreply@resend.dev>',
          to: [recipient],
          subject: `New school tour booking: ${escapeHtml(body.data.visitorName)}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1D1D1B;">
              <h2 style="color: #9E1B1E;">New Campus Tour Booking Request</h2>
              <p><strong>Visitor Name:</strong> ${escapeHtml(body.data.visitorName)}</p>
              <p><strong>Email:</strong> ${escapeHtml(body.data.visitorEmail)}</p>
              <p><strong>Phone:</strong> ${escapeHtml(body.data.visitorPhone)}</p>
              <p><strong>Preferred Date:</strong> ${escapeHtml(body.data.preferredDate)}</p>
              <p><strong>Preferred Time:</strong> ${escapeHtml(body.data.preferredTime)}</p>
              <p><strong>Child Age:</strong> ${childAgeVal ? `${childAgeVal} tuổi` : 'N/A'}</p>
              <p><strong>Notes:</strong> ${escapeHtml(body.data.notes || 'None')}</p>
            </div>
          `,
        })
      } catch (emailError) {
        console.error('Error sending tour confirmation email:', emailError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'School tour booked successfully. Our admissions representative will confirm via email/phone.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error booking tour:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    )
  }
}
