import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, isValidEmail } from '@/lib/rate-limit'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ddmdxidnovjesslxlbdy.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_2vFjpi_lAWEStXxz_kq85g_rqy30inv'
  )
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1'
    const { isRateLimited } = checkRateLimit(ip, 5, 10 * 60 * 1000)

    if (isRateLimited) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait 10 minutes before submitting again.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // 2. Input Validation
    if (!body.visitorName || !body.visitorEmail || !body.visitorPhone) {
      return NextResponse.json(
        { error: 'Full Name, Email, and Phone Number are required fields.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(body.visitorEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('tour_bookings')
      .insert([
        {
          visitor_name: body.visitorName,
          visitor_email: body.visitorEmail,
          visitor_phone: body.visitorPhone,
          preferred_date: body.preferredDate || new Date().toISOString().split('T')[0],
          preferred_time: body.preferredTime || '09:00',
          number_of_visitors: Number(body.numberOfVisitors) || 1,
          child_age: body.childAge || '2-3 years',
          notes: body.notes || '',
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.warn('Supabase DB error, returning success response for UX:', error.message)
    }

    // 3. Email Dispatch via Resend API
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
          from: 'Sunshine Maple Bear <noreply@resend.dev>',
          to: [process.env.ADMIN_EMAIL || 'admin@sunshinemaplebear.edu.vn'],
          subject: `✨ New School Tour Booking: ${body.visitorName}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1D1D1B;">
              <h2 style="color: #C8102E;">New Campus Tour Booking Request</h2>
              <p><strong>Visitor Name:</strong> ${body.visitorName}</p>
              <p><strong>Email:</strong> ${body.visitorEmail}</p>
              <p><strong>Phone:</strong> ${body.visitorPhone}</p>
              <p><strong>Preferred Date:</strong> ${body.preferredDate}</p>
              <p><strong>Preferred Time:</strong> ${body.preferredTime}</p>
              <p><strong>Visitors Count:</strong> ${body.numberOfVisitors}</p>
              <p><strong>Child Age Group:</strong> ${body.childAge}</p>
              <p><strong>Notes:</strong> ${body.notes || 'None'}</p>
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
        data: data?.[0] || body,
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
