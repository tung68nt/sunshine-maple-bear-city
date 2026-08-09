'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function VisitorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined' || pathname.startsWith('/admin')) return

    const startTime = Date.now()
    const searchParams = new URLSearchParams(window.location.search)
    const utmSource = searchParams.get('utm_source') || 'direct'
    const utmMedium = searchParams.get('utm_medium') || 'organic'

    // Save pageview log
    const log = {
      path: pathname,
      title: document.title || pathname,
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      date: new Date().toISOString().split('T')[0],
      utmSource: `${utmSource} / ${utmMedium}`
    }

    try {
      const existingStr = localStorage.getItem('smb_visitor_history') || '[]'
      const existing = JSON.parse(existingStr)
      existing.unshift(log)
      // Keep last 20 pageviews
      localStorage.setItem('smb_visitor_history', JSON.stringify(existing.slice(0, 20)))
    } catch (e) {
      console.error('Error saving tracking log:', e)
    }

    return () => {
      const durationSeconds = Math.round((Date.now() - startTime) / 1000)
      console.log(`[SMB Tracking] Left page ${pathname} after ${durationSeconds}s`)
    }
  }, [pathname])

  return null
}
