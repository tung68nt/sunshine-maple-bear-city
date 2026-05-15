import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase()
    const body = await request.json()

    const { data, error } = await supabase
      .from('tour_bookings')
      .insert([
        {
          visitor_name: body.visitorName,
          visitor_email: body.visitorEmail,
          visitor_phone: body.visitorPhone,
          preferred_date: body.preferredDate,
          preferred_time: body.preferredTime,
          number_of_visitors: body.numberOfVisitors,
          child_age: body.childAge,
          notes: body.notes,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) throw error

    // Try sending email notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        await resend.emails.send({
          from: 'Sunshine Maple Bear <noreply@resend.dev>', // Use verified domain in production
          to: [process.env.ADMIN_EMAIL || 'admin@smb-sunshine.example.com'], // Send to admin
          subject: `New School Tour Registration from ${body.visitorName}`,
          html: `
            <h2>New School Tour Registration</h2>
            <p><strong>Visitor Name:</strong> ${body.visitorName}</p>
            <p><strong>Email:</strong> ${body.visitorEmail}</p>
            <p><strong>Phone:</strong> ${body.visitorPhone}</p>
            <p><strong>Preferred Date:</strong> ${body.preferredDate}</p>
            <p><strong>Preferred Time:</strong> ${body.preferredTime}</p>
            <p><strong>Number of Visitors:</strong> ${body.numberOfVisitors}</p>
            <p><strong>Child's Age:</strong> ${body.childAge}</p>
            <p><strong>Notes:</strong> ${body.notes || 'None'}</p>
          `,
        })
      } catch (emailError) {
        console.error('Error sending email notification:', emailError)
        // Don't throw, we still want to return success for the database insertion
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'School tour booked successfully. We will confirm via email.',
        data: data[0],
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error booking tour:', error)
    return NextResponse.json(
      { error: 'An error occurred while booking. Please try again.' },
      { status: 500 }
    )
  }
}
