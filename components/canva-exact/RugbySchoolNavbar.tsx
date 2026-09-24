'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { CanvaExactLanguageSwitcher } from './CanvaExactLanguageSwitcher'

interface RugbyNavbarProps {
  onOpenMenu: () => void
  heroVideoRef?: React.RefObject<HTMLVideoElement | null>
}

/**
 * 1:1 Replica of Rugby School Hanoi Navigation System
 * Source: https://www.rugbyschoolhanoi.com/vi
 *
 * Architecture (from source HTML):
 * 1. Top utility bar (bg-blue-950) — visible only when `atTop`
 * 2. Main floating nav — buttons over hero video
 *    - When atTop: transparent bg, `translate-y-8` (pushed down by top bar)
 *    - When scrolledPastHero: slides to top, bg becomes stone-100
 *    - Buttons: `button--menu` (frosted white) at hero → `button--blue-200` (solid accent) after scroll
 *    - navHidden: hides when scrolling down, shows when scrolling up
 */
export function RugbySchoolNavbar({ onOpenMenu, heroVideoRef }: RugbyNavbarProps) {
  const [atTop, setAtTop] = useState(true)
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const menuOrSearchOpen = menuOpen || searchOpen
  const menuAndSearchClosed = !menuOpen && !searchOpen

  // Scroll tracking: atTop, scrolledPastHero, navHidden (hide on scroll down, show on scroll up)
  useEffect(() => {
    let lastScrollY = 0
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const sy = window.scrollY
        const heroH = window.innerHeight * 0.85

        setAtTop(sy < 40)
        setScrolledPastHero(sy > heroH)

        // Hide/show logic: hide when scrolling down past hero, show on scroll up
        if (sy > heroH) {
          if (sy > lastScrollY + 5) {
            setNavHidden(true)
          } else if (sy < lastScrollY - 5) {
            setNavHidden(false)
          }
        } else {
          setNavHidden(false)
        }

        lastScrollY = sy
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Video play/pause state
  useEffect(() => {
    const video =
      heroVideoRef?.current ||
      (document.querySelector('.cv-hero-video-wrap video') as HTMLVideoElement | null)
    if (!video) return
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [heroVideoRef])

  const toggleVideo = useCallback(() => {
    const video =
      heroVideoRef?.current ||
      (document.querySelector('.cv-hero-video-wrap video') as HTMLVideoElement | null)
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [heroVideoRef])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(searchQuery.trim())}`
      setSearchOpen(false)
    }
  }

  // Button class: frosted white (button--menu) at hero, solid accent (button--scrolled) after scroll
  const btnClass = scrolledPastHero ? 'rn-btn rn-btn--scrolled' : 'rn-btn rn-btn--hero'
  const btnGoldClass = scrolledPastHero ? 'rn-btn rn-btn--scrolled-gold' : 'rn-btn rn-btn--hero'

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          NAV 1: Top Utility Bar — visible only when atTop
          Rugby: bg-blue-950, py-[10px], fixed, z-50
          Adapted: dark maroon to match SMB brand
          ═══════════════════════════════════════════════════════════════════ */}
      <nav
        aria-label="Top utility bar"
        className={`rn-topbar ${atTop ? 'rn-topbar--visible' : 'rn-topbar--hidden'}`}
      >
        <div className="rn-topbar-inner">
          <div className="rn-topbar-links">
            <a href="tel:0942546655" className="rn-topbar-link notranslate">094 254 6655</a>
            <a href="mailto:admissions@sunshinemaplebear.edu.vn" className="rn-topbar-link">Liên hệ</a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          NAV 2: Main Floating Navigation
          Rugby: z-30 fixed, translate-y-8 when atTop (pushed below topbar)
          Transparent background, buttons float over hero video
          ═══════════════════════════════════════════════════════════════════ */}
      <nav
        aria-label="Main navigation"
        className={[
          'rn-main-nav',
          atTop ? 'rn-main-nav--at-top' : '',
          navHidden && !menuOrSearchOpen ? 'rn-main-nav--hidden' : '',
          menuOrSearchOpen ? 'rn-main-nav--overlay' : '',
        ].filter(Boolean).join(' ')}
      >
        <div className={`rn-nav-panel ${menuOrSearchOpen ? 'rn-nav-panel--open' : ''}`}>
          <div className="rn-nav-row">
            {/* Logo — visible when at top OR when menu/search open */}
            <Link
              href="/"
              className="rn-nav-logo"
              aria-label="Sunshine Maple Bear Home"
              style={{ display: (atTop || menuOrSearchOpen) ? 'flex' : 'none' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-canva.png"
                alt="Sunshine Maple Bear"
                className="rn-logo-img notranslate"
              />
              <div className="rn-brand notranslate">
                <span className="rn-brand-name">SUNSHINE MAPLE BEAR</span>
                <span className="rn-brand-sub">INTERNATIONAL KINDERGARTEN</span>
              </div>
            </Link>

            {/* Action Buttons — right side */}
            <div className="rn-nav-actions">
              {/* Video Play/Pause — desktop only, visible when menu closed */}
              {menuAndSearchClosed && (
                <button
                  type="button"
                  onClick={toggleVideo}
                  className={`${btnClass} rn-hide-mobile`}
                  aria-label={isPlaying ? 'Tạm dừng video' : 'Phát video'}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {isPlaying ? (
                      <path d="M4 14L4 2M11 14L11 8L11 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      <path d="M4.66667 2.66666L13.3333 8L4.66667 13.3333V2.66666Z" stroke="currentColor" strokeLinejoin="round" />
                    )}
                  </svg>
                  <span className="rn-btn-label">{isPlaying ? 'Tạm dừng' : 'Phát'}</span>
                </button>
              )}

              {/* Visit us — desktop only */}
              {menuAndSearchClosed && (
                <a
                  href="#facilities"
                  className={`${btnClass} rn-hide-mobile`}
                >
                  Tham quan
                </a>
              )}

              {/* Apply Now / Tuyển sinh — desktop only */}
              {menuAndSearchClosed && (
                <a
                  href="#contact"
                  className={`${btnGoldClass} rn-hide-mobile`}
                >
                  Tuyển sinh
                </a>
              )}

              {/* Search */}
              <button
                type="button"
                onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false) }}
                className={`${scrolledPastHero || menuOrSearchOpen ? 'rn-btn rn-btn--scrolled' : 'rn-btn rn-btn--hero'}`}
                aria-label={searchOpen ? 'Đóng tìm kiếm' : 'Mở tìm kiếm'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {searchOpen ? (
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeLinejoin="round" />
                  ) : (
                    <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
                <span className="rn-btn-label">{searchOpen ? 'Đóng' : 'Tìm kiếm'}</span>
              </button>

              {/* Language Selector */}
              <CanvaExactLanguageSwitcher />

              {/* Menu */}
              <button
                type="button"
                onClick={() => { onOpenMenu(); setSearchOpen(false) }}
                className={`${scrolledPastHero || menuOrSearchOpen ? 'rn-btn rn-btn--scrolled' : 'rn-btn rn-btn--hero'}`}
                aria-label="Mở menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8H14M2 4H14M2 12H8H14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="rn-btn-label">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="rn-search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="rn-search-box" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearchSubmit} className="rn-search-form">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm chương trình, học phí, hoạt động..."
                className="rn-search-input"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="rn-search-close">✕</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
