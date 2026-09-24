'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Language {
  code: string
  name: string
  short: string
  flag: string
}

const LANGUAGES: Language[] = [
  { code: 'vi', name: 'Tiếng Việt', short: 'VI', flag: '🇻🇳' },
  { code: 'en', name: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'ko', name: '한국어', short: 'KO', flag: '🇰🇷' },
]

declare global {
  interface Window {
    google: any
    googleTranslateElementInit: any
  }
}

export function CanvaExactLanguageSwitcher({
  className = '',
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Initialize Google Translate Script
  useEffect(() => {
    // Check existing cookie
    const getCookie = (name: string) => {
      const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
      return v ? v[2] : null
    }

    const saved = getCookie('googtrans')
    if (saved) {
      const match = saved.split('/').pop()
      const found = LANGUAGES.find((l) => l.code === match)
      if (found) setCurrentLang(found)
    }

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)

      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'vi',
              includedLanguages: 'en,vi,ko',
              autoDisplay: false,
              multilanguagePage: true,
            },
            'google_translate_element'
          )
        }
      }
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang)
    setIsOpen(false)

    // Set cookie for Google Translate
    const domain = window.location.hostname
    const cookieVal = `/auto/${lang.code}`
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${domain};`
    document.cookie = `googtrans=${cookieVal}; path=/;`

    // Try programmatic combo change
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
    if (combo) {
      combo.value = lang.code
      combo.dispatchEvent(new Event('change'))
    } else {
      // Reload smoothly if translate element isn't ready
      window.location.reload()
    }
  }

  return (
    <div
      ref={dropdownRef}
      className={`cv-lang-switcher-wrap ${className}`}
      style={{ position: 'relative', display: 'inline-block', zIndex: 50, ...style }}
    >
      {/* Hidden mount point for Google Translate widget */}
      <div id="google_translate_element" style={{ display: 'none' }} />

      {/* Luxury Language Trigger Button matching exact Rugby School style */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chọn ngôn ngữ"
        className="rn-btn rn-btn--hero cv-lang-btn"
      >
        <span>{currentLang.short}</span>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Frosted Dropdown Menu */}
      {isOpen && (
        <div
          className="cv-lang-dropdown"
          style={{
            position: 'absolute',
            top: 'calc(100% + calc(6 * var(--u, 1px)))',
            right: 0,
            background: 'rgba(18, 8, 10, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(202, 156, 87, 0.5)',
            borderRadius: '6px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            padding: '4px',
            minWidth: '120px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            animation: 'cvModalFadeIn 0.2s ease-out',
            zIndex: 100,
          }}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => changeLanguage(lang)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                border: 0,
                background: currentLang.code === lang.code ? 'rgba(202, 156, 87, 0.25)' : 'transparent',
                color: currentLang.code === lang.code ? '#f6dfb2' : '#ffffff',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: currentLang.code === lang.code ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (currentLang.code !== lang.code) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (currentLang.code !== lang.code) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
