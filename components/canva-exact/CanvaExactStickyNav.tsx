'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { CanvaExactRugbyHeader } from './CanvaExactRugbyHeader'

interface CanvaExactStickyNavProps {
  onOpenMenu: () => void
}

/**
 * Luxury Frosted Glass Sticky Navigation Bar (Kính mờ trong suốt)
 * Automatically pins to the top of the viewport when scrolling down,
 * with exact Rugby School Hanoi buttons and interactions.
 */
export function CanvaExactStickyNav({ onOpenMenu }: CanvaExactStickyNavProps) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 120)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`cv-sticky-nav ${isSticky ? 'is-sticky' : ''}`}
      aria-label="Sticky navigation"
    >
      <div className="cv-sticky-container">
        {/* Brand identity on left */}
        <Link href="/" className="cv-sticky-brand" aria-label="Sunshine Maple Bear Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-canva.png"
            alt="Sunshine Maple Bear Logo"
            className="cv-sticky-logo notranslate"
            width={48}
            height={32}
          />
          <div className="cv-sticky-brand-text notranslate">
            <span className="cv-sticky-title">Sunshine Maple Bear</span>
            <span className="cv-sticky-subtitle">International Kindergarten</span>
          </div>
        </Link>

        {/* Action pills & menu on right with exact Rugby School styling */}
        <div className="cv-sticky-actions">
          <CanvaExactRugbyHeader onOpenMenu={onOpenMenu} />
        </div>
      </div>
    </nav>
  )
}
