import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAuthFailure, requireRole } from '@/lib/auth/require-role'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const statusSchema = z.object({ id: z.string().min(1).max(100), status: z.enum(['submitted', 'new', 'reviewing', 'contacted', 'enrolled', 'rejected']) })

export async function GET() {
  const auth = await requireRole(['admin'])
  if (isAuthFailure(auth)) return auth
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.from('admissions').select('id,parent_name,parent_phone,parent_email,child_name,child_dob,grade_level,notes,status,created_at').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: 'Unable to load admissions.' }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PATCH(request: NextRequest) {
  const auth = await requireRole(['admin'])
  if (isAuthFailure(auth)) return auth
  const parsed = statusSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid status update.' }, { status: 400 })
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('admissions').update({ status: parsed.data.status }).eq('id', parsed.data.id)
  if (error) return NextResponse.json({ error: 'Unable to update admission.' }, { status: 500 })
  return NextResponse.json({ success: true })
}
