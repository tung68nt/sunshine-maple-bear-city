import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Try sending email notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        await resend.emails.send({
          from: 'Sunshine Maple Bear <noreply@resend.dev>', // Use verified domain in production
          to: [process.env.ADMIN_EMAIL || 'admin@smb-sunshine.example.com'], // Send to admin
          subject: `New Event Registration: ${body.eventTitle}`,
          html: `
            <h2>New Event Registration</h2>
            <p><strong>Event:</strong> ${body.eventTitle}</p>
            <p><strong>Registrant:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${body.phone}</p>
            <p><strong>Number of Participants:</strong> ${body.participants}</p>
            <p><strong>Notes:</strong> ${body.note || 'None'}</p>
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
