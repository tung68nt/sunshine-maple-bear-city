import { expect, test } from '@playwright/test'

const baseURL = process.env.PLAYWRIGHT_BASE_URL
test.skip(!baseURL, 'Set PLAYWRIGHT_BASE_URL to an isolated preview deployment before E2E tests.')

test('unauthenticated visitor is redirected from the CMS', async ({ page }) => {
  await page.goto('/admin')
  await expect(page).toHaveURL(/\/login/)
})

test('public admission form requires guardian consent', async ({ page }) => {
  await page.goto('/admissions')
  const submit = page.getByRole('button', { name: /Gửi Đăng Ký Tuyển Sinh/i })
  await expect(submit).toBeVisible()
  await expect(page.getByText(/Tôi là phụ huynh\/người giám hộ/i)).toBeVisible()
})
