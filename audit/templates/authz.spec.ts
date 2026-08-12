// Proposed Vitest scaffold. Move after implementing lib/auth/require-role.ts.
import { describe, expect, it } from 'vitest'

describe('admin authorization', () => {
  it.todo('returns 401 when Supabase getUser has no user')
  it.todo('returns 403 for an inactive profile')
  it.todo('returns 403 when an editor requests an admin-only operation')
  it.todo('returns the authenticated active profile for an allowed role')
})
