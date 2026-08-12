import { NextRequest, NextResponse } from 'next/server'
import { isAuthFailure, requireRole } from '@/lib/auth/require-role'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireRole(['admin', 'editor']); if (isAuthFailure(auth)) return auth
    const supabase = await createServerSupabaseClient()
    const id = (await params).id
    const body = await request.json()

    const { data, error } = await supabase
      .from('announcements')
      .update({
        title: body.title,
        content: body.content,
        priority: body.priority,
        status: body.status,
        target_audience: body.target_audience,
      })
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error updating announcement:', error)
    return NextResponse.json({ error: 'Failed to update announcement' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireRole(['admin']); if (isAuthFailure(auth)) return auth
    const supabase = await createServerSupabaseClient()
    const id = (await params).id

    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting announcement:', error)
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 })
  }
}
