'use client'

import React, { useRef, useEffect, useState, type ReactNode } from 'react'

interface CanvaFadeSectionProps {
  y: number
  h: number
  children: ReactNode
  /** kept for API compatibility – entrance style is now decided per element (heading = line reveal, rest = fade) */
  animation?: 'slide-up' | 'fade-in' | 'zoom-in'
  delay?: number
  className?: string
}

/**
 * Rugby School Hanoi section entrance (reverse-engineered from app.522d6630.js / app.c3837e12.css):
 *  - IntersectionObserver, threshold 0, adds `delay--enter` once and unobserves.
 *  - Headings: `.line-wrap__line` translateY(100%) → 0 inside an overflow mask,
 *    1s cubic-bezier(.19,1,.22,1), each line staggered by 0.1s.
 *  - Copy / media: `delay--fade-in` opacity 0 → 1 over .8s ease.
 * The wrapping layer itself is NEVER transformed (the old version translated the
 * whole full-page layer by 10%, i.e. hundreds of px, which looked broken).
 */
export function CanvaFadeSection({ y, h, children, delay = 0, className = '' }: CanvaFadeSectionProps) {
  const triggerRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Assign a stagger index to every direct child (headings and copy counted separately)
  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    let head = 0
    let rest = 0
    Array.from(layer.children).forEach((el) => {
      const node = el as HTMLElement
      const isHeading = /^H[1-3]$/.test(node.tagName)
      node.style.setProperty('--i', String(isHeading ? head++ : rest++))
    })
  }, [])

  useEffect(() => {
    if (y === 0) {
      const t = setTimeout(() => setIsVisible(true), 80)
      return () => clearTimeout(t)
    }
    const el = triggerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [y])

  return (
    <>
      <div
        ref={triggerRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: `calc(${y} * var(--u))`,
          width: '100%',
          height: `calc(${h} * var(--u))`,
          pointerEvents: 'none',
          opacity: 0,
          zIndex: -1,
        }}
      />
      <div
        ref={layerRef}
        className={`cv-fade-layer ${isVisible ? 'is-visible delay--enter' : ''} ${className}`}
        style={{ '--d': `${delay}s` } as React.CSSProperties}
      >
        {children}
      </div>
    </>
  )
}
