import 'server-only'

import { createClient } from '@supabase/supabase-js'
import { getSupabasePublicEnv } from './env'

export function createAdminSupabaseClient() {
  const { url, key } = getSupabasePublicEnv()
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || key
  if (!serviceRoleKey) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY or public key')
  return createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })
}
