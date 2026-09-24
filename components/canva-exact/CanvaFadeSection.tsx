'use client'

import React, { useRef, useEffect, useState, type ReactNode } from 'react'

interface CanvaFadeSectionProps {
  y: number
  h: number
  children: ReactNode
  animation?: 'slide-up' | 'fade-in' | 'zoom-in'
  delay?: number
  className?: string
}

/**
 * Rugby School Hanoi-inspired section scroll transition wrapper.
 * Uses an IntersectionObserver attached to an exact vertical waypoint trigger
 * to trigger luxurious, smooth fade-in / slide-up animations on entry,
 * and gentle fade-out when scrolled away so sections re-animate gracefully on re-entry.
 */
export function CanvaFadeSection({
  y,
  h,
  children,
  animation = 'slide-up',
  delay = 0,
  className = '',
}: CanvaFadeSectionProps) {
  const triggerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
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
      {
        root: null,
        rootMargin: '120px 0px 120px 0px',
        threshold: 0.01,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Waypoint trigger */}
      <div
        ref={triggerRef}
        aria-hidden="true"
        style={
          {
            position: 'absolute',
            left: 0,
            top: `calc(${y} * var(--u))`,
            width: '100%',
            height: `calc(${h} * var(--u))`,
            pointerEvents: 'none',
            opacity: 0,
            zIndex: -1,
          } as React.CSSProperties
        }
      />

      {/* Animated Section Content Layer: zIndex 3 so it is ALWAYS above cv-bg (z-index: 1) */}
      <div
        className={`cv-fade-layer delay delay--${animation} ${isVisible ? 'delay--enter' : ''} ${className}`}
        style={
          {
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            pointerEvents: 'none',
            transitionDelay: delay > 0 ? `${delay}s` : '0s',
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </>
  )
}
