import 'server-only'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabasePublicEnv } from './env'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  const { url, key } = getSupabasePublicEnv()

  return createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      // Session refresh is performed by middleware. Route handlers must not mutate cookies.
      setAll: () => undefined,
    },
  })
}
