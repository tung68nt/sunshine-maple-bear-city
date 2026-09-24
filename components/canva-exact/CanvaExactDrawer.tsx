'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CanvaExactDrawer({ isOpen, onClose }: DrawerProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.documentElement.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchTerm.trim())}`)
      onClose()
    }
  }

  return (
    <div className="cv-menu" id="cv-menu">
      <div
        className="cv-menu-backdrop"
        onClick={onClose}
        style={{ background: 'rgba(155,29,34,.73)' }}
      />
      <nav className="cv-menu-panel" aria-label="Main menu">
        <div className="cv-page" style={{ '--h': 576, '--W': 315.5 } as React.CSSProperties}>
          <img
            className="cv-bg"
            src="/canva-exact/bg/menu-0.webp"
            alt=""
            style={{ '--y': 0, '--h': 576 } as React.CSSProperties}
            loading="lazy"
            decoding="async"
          />
          <h3 className="cv-t f6" style={{ '--x': 160.57, '--y': 111.87, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>
            About us
          </h3>
          <h3 className="cv-t f6" style={{ '--x': 152.04, '--y': 198.88, '--s': 21.795, '--c': '#2e2e2e', '--ls': -0.006 } as React.CSSProperties}>
            Academic
          </h3>
          <h3 className="cv-t f6" style={{ '--x': 148.63, '--y': 155.38, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>
            Admission
          </h3>
          <h3 className="cv-t f6" style={{ '--x': 136.74, '--y': 242.39, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>
            Curriculum
          </h3>
          <h3 className="cv-t f6" style={{ '--x': 209.02, '--y': 285.99, '--s': 21.795, '--c': '#2e2e2e', '--ls': -0.006 } as React.CSSProperties}>
            New
          </h3>

          <Link href="/about" onClick={onClose} className="cv-a" aria-label="About us" style={{ '--x': 156.6, '--y': 111.1, '--w': 99, '--h': 28.6 } as React.CSSProperties} />
          <Link href="/academics" onClick={onClose} className="cv-a" aria-label="Academic" style={{ '--x': 148, '--y': 198.1, '--w': 105.8, '--h': 28.6 } as React.CSSProperties} />
          <Link href="/admissions" onClick={onClose} className="cv-a" aria-label="Admission" style={{ '--x': 144.6, '--y': 154.6, '--w': 109.6, '--h': 28.6 } as React.CSSProperties} />
          <Link href="/academics" onClick={onClose} className="cv-a" aria-label="Curriculum" style={{ '--x': 132.7, '--y': 241.6, '--w': 121, '--h': 28.6 } as React.CSSProperties} />
          <Link href="/blog" onClick={onClose} className="cv-a" aria-label="New" style={{ '--x': 205, '--y': 285.2, '--w': 49.7, '--h': 28.6 } as React.CSSProperties} />

          <form onSubmit={handleSearch}>
            <input
              className="cv-search"
              type="search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              style={{ '--x': 46, '--y': 28, '--w': 218, '--h': 26 } as React.CSSProperties}
            />
          </form>
          <button
            type="button"
            className="cv-menu-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
      </nav>
    </div>
  )
}
