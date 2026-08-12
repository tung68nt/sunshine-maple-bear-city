import { describe, expect, it } from 'vitest'
import { admissionSchema, tourBookingSchema } from '../lib/validation/forms'
import { escapeHtml } from '../lib/security'
import { sanitizeRichHtml } from '../lib/sanitize'

describe('public lead validation', () => {
  it('requires guardian consent for an admission lead', () => {
    expect(admissionSchema.safeParse({
      parentName: 'Nguyen Van A', parentEmail: 'a@example.com', parentPhone: '0912345678', childName: 'Be B',
    }).success).toBe(false)
  })

  it('rejects an invalid phone number for a school tour', () => {
    expect(tourBookingSchema.safeParse({
      visitorName: 'Nguyen Van A', visitorEmail: 'a@example.com', visitorPhone: 'not-a-phone', consent: true,
    }).success).toBe(false)
  })

  it('escapes untrusted text before embedding it in notification HTML', () => {
    expect(escapeHtml('<img src=x onerror=alert(1)>')).toContain('&lt;img')
  })

  it('removes executable markup from rich text', () => {
    const cleaned = sanitizeRichHtml('<p>Safe</p><img src=x onerror=alert(1)><script>alert(1)</script>')
    expect(cleaned).toContain('<p>Safe</p>')
    expect(cleaned).not.toContain('onerror')
    expect(cleaned).not.toContain('<script')
  })
})
