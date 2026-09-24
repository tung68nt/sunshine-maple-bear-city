'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CanvaExactLanguageSwitcher } from './CanvaExactLanguageSwitcher'

interface CanvaExactRugbyHeaderProps {
  onOpenMenu: () => void
  heroVideoRef?: React.RefObject<HTMLVideoElement | null>
  className?: string
  style?: React.CSSProperties
}

/**
 * Exact replica of Rugby School Hanoi Header & Navigation button bar.
 * Features:
 *  1. [ || Tạm dừng / ▶ Phát ] - Live video toggle with pause/play icons
 *  2. [ Tham quan ] - Smooth scroll to Campus / Tour
 *  3. [ Tuyển sinh ] - Smooth scroll to Admissions Contact Form
 *  4. [ 🔍 Tìm kiếm ] - Quick search modal
 *  5. [ 🌐 Ngôn ngữ ] - Hidden Google Translate 3-language switcher (VI / EN / KO)
 *  6. [ ≡ Menu ] - Hamburger icon + "Menu" text opening drawer
 */
export function CanvaExactRugbyHeader({
  onOpenMenu,
  heroVideoRef,
  className = '',
  style,
}: CanvaExactRugbyHeaderProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Listen to video state changes
  useEffect(() => {
    const video = heroVideoRef?.current || document.querySelector('.cv-hero-video-wrap video') as HTMLVideoElement | null
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [heroVideoRef])

  const toggleVideoPlayback = () => {
    const video = heroVideoRef?.current || document.querySelector('.cv-hero-video-wrap video') as HTMLVideoElement | null
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
      setIsSearchOpen(false)
    }
  }

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  return (
    <>
      <header
        className={`cv-rugby-header-bar ${className}`}
        style={style}
        role="navigation"
        aria-label="Rugby School Hanoi Navigation"
      >
        {/* Button 1: Video Play / Pause Toggle */}
        <button
          type="button"
          onClick={toggleVideoPlayback}
          className="button--menu"
          aria-label={isPlaying ? 'Tạm dừng video' : 'Phát video'}
        >
          {isPlaying ? (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 14L4 2M12 14L12 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4.67 2.67L13.33 8L4.67 13.33V2.67Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          )}
          <span>{isPlaying ? 'Tạm dừng' : 'Phát'}</span>
        </button>

        {/* Button 2: Tham quan (Visit Us) */}
        <a
          href="#facilities"
          className="button--menu cv-hide-mobile"
          aria-label="Tham quan cơ sở vật chất"
        >
          <span>Tham quan</span>
        </a>

        {/* Button 3: Tuyển sinh (Admissions) */}
        <a
          href="#contact"
          className="button--menu"
          aria-label="Đăng ký tuyển sinh"
        >
          <span>Tuyển sinh</span>
        </a>

        {/* Button 4: Tìm kiếm (Search) */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="button--menu cv-hide-mobile"
          aria-label="Tìm kiếm trên website"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M10 10L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Tìm kiếm</span>
        </button>

        {/* Button 5: 3-Language Switcher (VI / EN / KO) - Google Translate hidden */}
        <CanvaExactLanguageSwitcher />

        {/* Button 6: Menu (Hamburger + Text "Menu") */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="button--menu button--menu-main"
          aria-label="Mở menu điều hướng"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2.5 4.5H13.5M2.5 8H13.5M2.5 11.5H13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span>Menu</span>
        </button>
      </header>

      {/* Quick Search Modal */}
      {isSearchOpen && (
        <div className="cv-search-overlay" onClick={() => setIsSearchOpen(false)}>
          <div
            className="cv-search-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <form onSubmit={handleSearchSubmit} className="cv-search-form">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="cv-search-icon">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M10 10L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm chương trình, học phí, hoạt động, cơ sở vật chất..."
                className="cv-search-input"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="cv-search-close-btn"
                aria-label="Đóng tìm kiếm"
              >
                ✕
              </button>
            </form>
            <div className="cv-search-suggestions">
              <span className="cv-suggest-label">Gợi ý tìm kiếm phổ biến:</span>
              <div className="cv-suggest-chips">
                {['Học phí 2026', 'Lớp Mầm', 'Lớp Nhà Trẻ', 'Chương trình Canada', 'Cơ sở Sunshine City', 'Thực đơn dinh dưỡng'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setSearchQuery(chip)
                      window.location.href = `/blog?search=${encodeURIComponent(chip)}`
                      setIsSearchOpen(false)
                    }}
                    className="cv-suggest-chip"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
