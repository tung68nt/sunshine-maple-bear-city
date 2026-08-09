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
        { error: 'Too many submissions from your IP. Please try again after 10 minutes.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // 2. Input Validation
    if (!body.parentName || !body.parentEmail || !body.parentPhone || !body.childName) {
      return NextResponse.json(
        { error: 'Parent Name, Email, Phone, and Child Name are required.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(body.parentEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid parent email address.' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('admissions')
      .insert([
        {
          child_name: body.childName,
          child_dob: body.childDob || '',
          grade_level: body.gradeLevel || 'Nursery',
          parent_name: body.parentName,
          parent_email: body.parentEmail,
          parent_phone: body.parentPhone,
          address: body.address || '',
          notes: body.notes || '',
          status: 'submitted',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.warn('Supabase DB notice:', error.message)
    }

    // 3. Resend Email Dispatch
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
          from: 'Sunshine Maple Bear <noreply@resend.dev>',
          to: [process.env.ADMIN_EMAIL || 'admissions@sunshinemaplebear.edu.vn'],
          subject: `🎓 New Admission Application: ${body.parentName} (${body.childName})`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1D1D1B;">
              <h2 style="color: #C8102E;">New Admissions Application Submitted</h2>
              <p><strong>Parent Name:</strong> ${body.parentName}</p>
              <p><strong>Parent Email:</strong> ${body.parentEmail}</p>
              <p><strong>Parent Phone:</strong> ${body.parentPhone}</p>
              <p><strong>Child Full Name:</strong> ${body.childName} (DOB: ${body.childDob})</p>
              <p><strong>Grade Level:</strong> ${body.gradeLevel}</p>
              <p><strong>Home Address:</strong> ${body.address || 'N/A'}</p>
              <p><strong>Notes:</strong> ${body.notes || 'None'}</p>
            </div>
          `,
        })
      } catch (emailError) {
        console.error('Error sending admission confirmation email:', emailError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Enrollment application submitted successfully. We will review and contact you shortly.',
        data: data?.[0] || body,
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
