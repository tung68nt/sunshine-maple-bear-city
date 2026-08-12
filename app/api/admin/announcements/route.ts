import { NextRequest, NextResponse } from 'next/server'
import { isAuthFailure, requireRole } from '@/lib/auth/require-role'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const auth = await requireRole(['admin', 'editor']); if (isAuthFailure(auth)) return auth
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireRole(['admin', 'editor']); if (isAuthFailure(auth)) return auth
    const supabase = await createServerSupabaseClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from('announcements')
      .insert([
        {
          title: body.title,
          content: body.content,
          priority: body.priority,
          status: body.status,
          target_audience: body.target_audience,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Error creating announcement:', error)
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 })
  }
}
