import 'server-only'

import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export const CMS_ROLES = ['admin', 'editor', 'viewer'] as const
export type CmsRole = (typeof CMS_ROLES)[number]

export type AuthContext = { userId: string; role: CmsRole }

export async function requireRole(allowedRoles: readonly CmsRole[]): Promise<AuthContext | NextResponse> {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile?.is_active || !CMS_ROLES.includes(profile.role as CmsRole)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const role = profile.role as CmsRole
  if (!allowedRoles.includes(role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  return { userId: user.id, role }
}

export function isAuthFailure(value: AuthContext | NextResponse): value is NextResponse {
  return value instanceof NextResponse
}
