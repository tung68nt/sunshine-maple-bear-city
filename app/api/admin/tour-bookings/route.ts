import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAuthFailure, requireRole } from '@/lib/auth/require-role'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const statusSchema = z.object({ id: z.string().min(1).max(100), status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']) })

export async function GET() {
  const auth = await requireRole(['admin'])
  if (isAuthFailure(auth)) return auth
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.from('tour_bookings').select('id,visitor_name,visitor_email,visitor_phone,preferred_date,preferred_time,child_age,notes,status,created_at').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: 'Unable to load tour bookings.' }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PATCH(request: NextRequest) {
  const auth = await requireRole(['admin'])
  if (isAuthFailure(auth)) return auth
  const parsed = statusSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid status update.' }, { status: 400 })
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('tour_bookings').update({ status: parsed.data.status }).eq('id', parsed.data.id)
  if (error) return NextResponse.json({ error: 'Unable to update tour booking.' }, { status: 500 })
  return NextResponse.json({ success: true })
}
