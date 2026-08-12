'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: { render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void }) => void }
  }
}

type TurnstileProps = { onTokenChange: (token: string) => void }

export function Turnstile({ onTokenChange }: TurnstileProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const callbackRef = useRef(onTokenChange)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    callbackRef.current = onTokenChange
  }, [onTokenChange])

  useEffect(() => {
    if (!siteKey || !elementRef.current) return
    const render = () => {
      if (elementRef.current && window.turnstile) {
        window.turnstile.render(elementRef.current, {
          sitekey: siteKey,
          callback: (token) => callbackRef.current(token),
          'expired-callback': () => callbackRef.current(''),
        })
      }
    }
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = render
    document.head.appendChild(script)
    return () => script.remove()
  }, [siteKey])

  if (!siteKey) return null
  return <div ref={elementRef} aria-label="Xác minh chống spam" />
}
