// Proposed Playwright scaffold. Use a dedicated preview Supabase project only.
import { test } from '@playwright/test'

test.describe('critical flows', () => {
  test.todo('rejects /admin without a valid Supabase session')
  test.todo('allows a provisioned marketing editor to sign in')
  test.todo('creates, edits, and deletes an isolated test blog post')
  test.todo('submits admission form only after consent and bot verification')
  test.todo('submits a school-tour booking')
  test.todo('submits an event registration')
})
