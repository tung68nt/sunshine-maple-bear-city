import { NextRequest, NextResponse } from 'next/server'

export function getRequestIp(request: NextRequest) {
  return request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? 'unknown'
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character]!)
}

export async function verifyTurnstile(token: unknown, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return process.env.NODE_ENV !== 'production'
  if (typeof token !== 'string' || !token) return false

  // `remoteip` is optional in Turnstile. Forwarded IP headers can be malformed
  // or unavailable behind a hosting proxy, which would reject an otherwise valid
  // token. Only forward a plausibly valid address.
  const body = new URLSearchParams({ secret, response: token })
  if (/^[0-9a-f:.]+$/i.test(ip)) body.set('remoteip', ip)
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST', body, cache: 'no-store',
  })
  const result = await response.json() as {
    success?: boolean
    hostname?: string
    action?: string
    'error-codes'?: string[]
  }
  if (result.success !== true) {
    // Keep the token and any visitor data out of logs. Cloudflare's error code is
    // enough to diagnose a key/domain mismatch in the deployment dashboard.
    console.warn('Turnstile verification failed', {
      errors: result['error-codes'] ?? [],
      hostname: result.hostname,
      action: result.action,
    })
  }
  return result.success === true
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}
