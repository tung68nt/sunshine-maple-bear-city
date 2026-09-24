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
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = triggerRef.current
    if (!el) return

    // Immediately show hero / top section without waiting for scroll
    if (y < 400) {
      setIsVisible(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          // Check if element is truly out of viewport before fading out
          const rect = entry.boundingClientRect
          const windowHeight = window.innerHeight || (document.documentElement ? document.documentElement.clientHeight : 800)
          if (rect.bottom < 0 || rect.top > windowHeight) {
            // Keep top section visible once loaded
            if (y >= 400) {
              setIsVisible(false)
            }
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [y])

  return (
    <>
      {/* Invisible Trigger Waypoint positioned exactly at [y, y + h] */}
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
            visibility: 'hidden',
          } as React.CSSProperties
        }
      />

      {/* Animated Section Content Layer with Rugby School cubic-bezier timing */}
      <div
        className={`cv-fade-layer delay delay--${animation} ${isVisible ? 'delay--enter' : ''} ${className}`}
        style={
          {
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            transitionDelay: isVisible && delay > 0 ? `${delay}s` : '0s',
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </>
  )
}
