// Simple in-memory rate limiter for public submission API routes

interface RateLimitStore {
  [ip: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

/**
 * Checks if an IP has exceeded rate limit (default: 5 requests per 10 minutes)
 */
export function checkRateLimit(ip: string, limit = 5, windowMs = 10 * 60 * 1000): { isRateLimited: boolean; remaining: number } {
  const now = Date.now()
  const clientData = store[ip]

  // Clean up expired entries periodically
  if (Math.random() < 0.05) {
    for (const key in store) {
      if (store[key].resetTime < now) {
        delete store[key]
      }
    }
  }

  if (!clientData || clientData.resetTime < now) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return { isRateLimited: false, remaining: limit - 1 }
  }

  if (clientData.count >= limit) {
    return { isRateLimited: true, remaining: 0 }
  }

  clientData.count += 1
  return { isRateLimited: false, remaining: limit - clientData.count }
}

/**
 * Validates email format strictly
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.trim())
}
