'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { CanvaExactLanguageSwitcher } from './CanvaExactLanguageSwitcher'

interface RugbyNavbarProps {
  onOpenMenu: () => void
  heroVideoRef?: React.RefObject<HTMLVideoElement | null>
}

/**
 * 1:1 Exact replica of Rugby School Hanoi Navigation Bar
 * Source: https://www.rugbyschoolhanoi.com/vi
 * Fixed top bar featuring:
 *  - Logo crest on left
 *  - [ || Tạm dừng / ▶ Phát ]
 *  - [ Tham quan ]
 *  - [ Tuyển sinh ]
 *  - [ 🔍 Tìm kiếm ]
 *  - [ 🌐 VI / EN / KO ] (Google Translate hidden)
 *  - [ ≡ Menu ]
 */
export function RugbySchoolNavbar({ onOpenMenu, heroVideoRef }: RugbyNavbarProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const toggleVideo = () => {
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
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(searchQuery.trim())}`
      setSearchOpen(false)
    }
  }

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`rugby-main-nav ${scrolledPastHero ? 'is-scrolled' : 'at-top'}`}
      >
        <div className="rugby-nav-container">
          {/* Logo on Left */}
          <Link href="/" className="rugby-nav-logo" aria-label="Sunshine Maple Bear Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-canva.png"
              alt="Sunshine Maple Bear"
              className="rugby-logo-img notranslate"
            />
            <div className="rugby-brand-titles notranslate">
              <span className="rugby-brand-name">SUNSHINE MAPLE BEAR</span>
              <span className="rugby-brand-sub">INTERNATIONAL KINDERGARTEN</span>
            </div>
          </Link>

          {/* Buttons on Right (Exact 1:1 match with Rugby School Hanoi) */}
          <div className="rugby-nav-buttons">
            {/* Button 1: Video Play / Pause */}
            <button
              type="button"
              onClick={toggleVideo}
              className={`button--menu ${scrolledPastHero ? 'button--scrolled' : ''}`}
              aria-label={isPlaying ? 'Tạm dừng video' : 'Phát video'}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                {isPlaying ? (
                  <path d="M4 14L4 2M11 14L11 8L11 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4.66667 2.66666L13.3333 8L4.66667 13.3333V2.66666Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                )}
              </svg>
              <span className="sr-only md:not-sr-only">{isPlaying ? 'Tạm dừng' : 'Phát'}</span>
            </button>

            {/* Button 2: Tham quan */}
            <a
              href="#facilities"
              className={`button--menu ${scrolledPastHero ? 'button--scrolled' : ''} rugby-hide-mobile`}
            >
              <span>Tham quan</span>
            </a>

            {/* Button 3: Tuyển sinh */}
            <a
              href="#contact"
              className={`button--menu ${scrolledPastHero ? 'button--scrolled-gold' : ''}`}
            >
              <span>Tuyển sinh</span>
            </a>

            {/* Button 4: Tìm kiếm */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className={`button--menu ${scrolledPastHero ? 'button--scrolled' : ''} rugby-hide-mobile`}
              aria-label={searchOpen ? 'Đóng tìm kiếm' : 'Mở tìm kiếm'}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                {searchOpen ? (
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                ) : (
                  <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
              <span className="sr-only md:not-sr-only">{searchOpen ? 'Đóng' : 'Tìm kiếm'}</span>
            </button>

            {/* Button 5: 3-Language Selector */}
            <CanvaExactLanguageSwitcher />

            {/* Button 6: Menu */}
            <button
              type="button"
              onClick={onOpenMenu}
              className={`button--menu ${scrolledPastHero ? 'button--scrolled' : ''}`}
              aria-label="Mở menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8H14M2 4H14M2 12H8H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Quick Search Dialog when Search is open */}
      {searchOpen && (
        <div className="rugby-search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="rugby-search-box" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearchSubmit} className="rugby-search-bar">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm chương trình, học phí, hoạt động..."
                className="rugby-search-input"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="rugby-search-close">✕</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
