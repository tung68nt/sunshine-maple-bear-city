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
      .from('admissions')
      .insert([
        {
          child_name: body.childName,
          child_dob: body.childDob,
          grade_level: body.gradeLevel,
          parent_name: body.parentName,
          parent_email: body.parentEmail,
          parent_phone: body.parentPhone,
          address: body.address,
          notes: body.notes,
          status: 'submitted',
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
          subject: `New Admission Request from ${body.parentName} for ${body.childName}`,
          html: `
            <h2>New Enrollment Registration</h2>
            <p><strong>Parent:</strong> ${body.parentName}</p>
            <p><strong>Email:</strong> ${body.parentEmail}</p>
            <p><strong>Phone:</strong> ${body.parentPhone}</p>
            <p><strong>Child:</strong> ${body.childName} (DOB: ${body.childDob})</p>
            <p><strong>Grade Level:</strong> ${body.gradeLevel}</p>
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
        message: 'Admission form submitted successfully. We will contact you soon.',
        data: data[0],
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting admission:', error)
    return NextResponse.json(
      { error: 'An error occurred while submitting. Please try again.' },
      { status: 500 }
    )
  }
}
