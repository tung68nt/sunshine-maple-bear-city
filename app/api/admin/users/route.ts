import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAuthFailure, requireRole } from '@/lib/auth/require-role'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

const inviteSchema = z.object({
  email: z.string().trim().email().max(254),
  displayName: z.string().trim().min(1).max(120),
  department: z.string().trim().max(120).optional().default(''),
  role: z.enum(['admin', 'editor', 'viewer']),
})

const updateSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(['admin', 'editor', 'viewer']).optional(),
  isActive: z.boolean().optional(),
}).refine((value) => value.role !== undefined || value.isActive !== undefined, {
  message: 'At least one field must be updated',
})

function configurationError() {
  return NextResponse.json({ error: 'User management is not configured.' }, { status: 503 })
}

export async function GET() {
  const auth = await requireRole(['admin'])
  if (isAuthFailure(auth)) return auth

  try {
    const admin = createAdminSupabaseClient()
    const [{ data: authUsers, error: authError }, { data: profiles, error: profileError }] = await Promise.all([
      admin.auth.admin.listUsers({ page: 1, perPage: 100 }),
      admin.from('profiles').select('id, role, is_active, display_name, department, updated_at'),
    ])
    if (authError || profileError) throw authError || profileError

    const profileById = new Map((profiles || []).map((profile) => [profile.id, profile]))
    const users = (authUsers?.users || []).map((user) => {
      const profile = profileById.get(user.id)
      return {
        id: user.id,
        email: user.email || '',
        displayName: profile?.display_name || user.user_metadata?.display_name || '',
        department: profile?.department || '',
        role: profile?.role || 'viewer',
        isActive: profile?.is_active ?? false,
        lastSignInAt: user.last_sign_in_at || null,
      }
    })
    return NextResponse.json({ data: users })
  } catch (error) {
    console.error('Admin user list failed', error)
    return configurationError()
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireRole(['admin'])
  if (isAuthFailure(auth)) return auth

  const parsed = inviteSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid user invitation.' }, { status: 400 })

  try {
    const admin = createAdminSupabaseClient()
    const origin = new URL(request.url).origin
    const { data, error } = await admin.auth.admin.inviteUserByEmail(parsed.data.email, {
      redirectTo: `${origin}/login`,
      data: { display_name: parsed.data.displayName },
    })
    if (error || !data.user) throw error || new Error('Invitation did not create a user')

    const { error: profileError } = await admin.from('profiles').upsert({
      id: data.user.id,
      role: parsed.data.role,
      is_active: true,
      display_name: parsed.data.displayName,
      department: parsed.data.department || null,
      updated_at: new Date().toISOString(),
    })
    if (profileError) throw profileError
    return NextResponse.json({ data: { id: data.user.id } }, { status: 201 })
  } catch (error) {
    console.error('Admin user invitation failed', error)
    return configurationError()
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await requireRole(['admin'])
  if (isAuthFailure(auth)) return auth
  const parsed = updateSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid user update.' }, { status: 400 })
  if (parsed.data.id === auth.userId && parsed.data.isActive === false) {
    return NextResponse.json({ error: 'You cannot deactivate your own account.' }, { status: 400 })
  }

  try {
    const admin = createAdminSupabaseClient()
    const update: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (parsed.data.role) update.role = parsed.data.role
    if (parsed.data.isActive !== undefined) update.is_active = parsed.data.isActive
    const { error } = await admin.from('profiles').update(update).eq('id', parsed.data.id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin user update failed', error)
    return configurationError()
  }
}
