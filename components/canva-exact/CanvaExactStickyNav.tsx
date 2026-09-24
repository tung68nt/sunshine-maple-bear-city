'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface CanvaExactStickyNavProps {
  onOpenMenu: () => void
}

/**
 * Luxury Frosted Glass Sticky Navigation Bar (Kính mờ trong suốt)
 * Automatically pins to the top of the viewport when scrolling down,
 * with glassmorphism frosted translucent background and responsive CTA buttons.
 */
export function CanvaExactStickyNav({ onOpenMenu }: CanvaExactStickyNavProps) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky navbar after scrolling past the initial hero banner area
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
            className="cv-sticky-logo"
            width={48}
            height={32}
          />
          <div className="cv-sticky-brand-text">
            <span className="cv-sticky-title">Sunshine Maple Bear</span>
            <span className="cv-sticky-subtitle">International Kindergarten</span>
          </div>
        </Link>

        {/* Action pills & menu on right with frosted glass styling */}
        <div className="cv-sticky-actions">
          <a href="#contact" className="cv-sticky-btn cv-sticky-hide-sm">
            Book a visit
          </a>
          <a href="#contact" className="cv-sticky-btn cv-sticky-hide-md">
            General enquiries
          </a>
          <Link
            href="/admissions/founding-families"
            className="cv-sticky-btn cv-sticky-btn--gold"
          >
            Register interest
          </Link>

          {/* Language indicator */}
          <div className="cv-sticky-btn cv-sticky-lang" title="Language: English">
            <span>EN</span>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Hamburger menu trigger */}
          <button
            type="button"
            onClick={onOpenMenu}
            className="cv-sticky-menu-btn"
            aria-label="Open navigation menu"
          >
            <div className="cv-sticky-menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}
