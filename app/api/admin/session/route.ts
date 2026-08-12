import { NextResponse } from 'next/server'
import { isAuthFailure, requireRole } from '@/lib/auth/require-role'

export async function GET() {
  const auth = await requireRole(['admin', 'editor', 'viewer'])
  if (isAuthFailure(auth)) return auth
  return NextResponse.json({ role: auth.role })
}
