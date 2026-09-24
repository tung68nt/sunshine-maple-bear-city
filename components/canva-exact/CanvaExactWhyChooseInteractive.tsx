'use client'

import React, { useState, useEffect, useRef } from 'react'

interface PillarItem {
  id: string
  number: string
  title: string
  subtitle: string
  desc: string
  tags: string[]
  image: string
  alt: string
}

const PILLARS: PillarItem[] = [
  {
    id: '01',
    number: '01',
    title: 'Official Canadian Curriculum',
    subtitle: 'Chương trình bản quyền Bộ GD Canada',
    desc: 'Canada’s education system consistently ranks among the top in the world. Our early childhood curriculum fosters critical inquiry, natural bilingual immersion, and joyful problem-solving from the foundation years.',
    tags: ['100% Authentic Canadian', 'Inquiry-Based Learning', 'Bilingual Immersion'],
    image: '/images/canadian_curriculum_kids.jpg',
    alt: 'Children engaged in official Canadian curriculum activities at Sunshine Maple Bear',
  },
  {
    id: '02',
    number: '02',
    title: 'Caring International Educators',
    subtitle: 'Đội ngũ giáo viên quốc tế tận tâm',
    desc: 'Certified native English educators and dedicated Vietnamese co-teachers nurture each child with genuine warmth, patience, and individualized attention to build strong emotional and intellectual security.',
    tags: ['Certified Native Teachers', '1:1 Individualized Care', 'Warm & Empathetic'],
    image: '/images/teacher_child_learning.jpg',
    alt: 'Caring international teacher guiding young learners',
  },
  {
    id: '03',
    number: '03',
    title: 'Safe & Engaging Campus',
    subtitle: 'Khuôn viên chuẩn quốc tế, an toàn & sáng tạo',
    desc: 'Purpose-built international standard facilities at Sunshine City, featuring child-safe sensory play zones, professional dance studio, reading library, and classrooms filled with natural sunlight.',
    tags: ['Sunshine City Campus', 'Movement & Dance Studio', 'Child-Safe Design'],
    image: '/images/canva/dance_studio.png',
    alt: 'Safe and engaging modern dance studio and campus facilities at Sunshine Maple Bear',
  },
  {
    id: '04',
    number: '04',
    title: 'Holistic Growth',
    subtitle: 'Phát triển toàn diện thân - tâm - tuệ',
    desc: 'Empowering children across four core dimensions: physical wellness, cognitive intellect, social-emotional maturity, and creative self-expression to thrive in an ever-evolving global world.',
    tags: ['Mind & Body Wellness', 'Creative Expression', 'Global Confidence'],
    image: '/images/smiling_founding_child.jpg',
    alt: 'Happy confident child growing at Sunshine Maple Bear',
  },
]

export function CanvaExactWhyChooseInteractive() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isUserInteractingRef = useRef<boolean>(false)
  const userTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 1. Scroll-driven progression: as the user scrolls through this section,
  // the active pillar seamlessly advances based on scroll depth.
  useEffect(() => {
    const handleScroll = () => {
      // If user recently hovered or clicked, don't immediately override
      if (isUserInteractingRef.current) return
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Section is considered active when its top is between 80% and 20% of the viewport
      const enterPoint = windowHeight * 0.75
      const exitPoint = windowHeight * 0.15
      const totalRange = (windowHeight - enterPoint) + rect.height + exitPoint

      if (rect.top <= enterPoint && rect.bottom >= exitPoint) {
        const scrolledIntoSection = enterPoint - rect.top
        const sectionScrollable = rect.height + (enterPoint - exitPoint)
        const progress = Math.max(0, Math.min(1, scrolledIntoSection / sectionScrollable))

        const targetIndex = Math.min(
          PILLARS.length - 1,
          Math.floor(progress * PILLARS.length)
        )
        setActiveIndex(targetIndex)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 2. Idle gentle auto-cycle when in viewport (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isUserInteractingRef.current) return
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      if (isInView) {
        setActiveIndex((prev) => (prev + 1) % PILLARS.length)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSelect = (idx: number) => {
    setActiveIndex(idx)
    isUserInteractingRef.current = true
    if (userTimerRef.current) clearTimeout(userTimerRef.current)
    userTimerRef.current = setTimeout(() => {
      isUserInteractingRef.current = false
    }, 6000)
  }

  const activePillar = PILLARS[activeIndex]

  return (
    <div
      ref={containerRef}
      className="cv-why-choose-interactive"
      style={
        {
          position: 'absolute',
          left: 'calc(60 * var(--u))',
          top: 'calc(2410 * var(--u))',
          width: 'calc(915 * var(--u))',
          height: 'calc(455 * var(--u))',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          backgroundColor: '#fff8ee',
          boxSizing: 'border-box',
          padding: 'calc(10 * var(--u)) 0',
        } as React.CSSProperties
      }
    >
      {/* LEFT: 4 Interactive Pillars List */}
      <div
        style={{
          width: 'calc(545 * var(--u))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          paddingLeft: 'calc(35 * var(--u))',
        }}
      >
        {/* Continuous background vertical baseline */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(6.5 * var(--u))',
            top: 'calc(10 * var(--u))',
            bottom: 'calc(10 * var(--u))',
            width: 'calc(2 * var(--u))',
            backgroundColor: '#2e2e2e',
            borderRadius: 'calc(1 * var(--u))',
          }}
        />

        {/* Dynamic active crimson indicator sliding vertically along the baseline */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(5.5 * var(--u))',
            top: `calc(${10 + activeIndex * 24}% + calc(4 * var(--u)))`,
            height: 'calc(70 * var(--u))',
            width: 'calc(4 * var(--u))',
            backgroundColor: '#9b1d22',
            borderRadius: 'calc(2 * var(--u))',
            transition: 'top 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.3s ease',
            boxShadow: '0 0 calc(8 * var(--u)) rgba(155, 29, 34, 0.4)',
          }}
        />

        {PILLARS.map((pillar, idx) => {
          const isActive = idx === activeIndex

          return (
            <div
              key={pillar.id}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => handleSelect(idx)}
              style={{
                cursor: 'pointer',
                padding: 'calc(6 * var(--u)) calc(12 * var(--u))',
                borderRadius: 'calc(8 * var(--u))',
                transition: 'background-color 0.25s ease, transform 0.25s ease',
                backgroundColor: isActive ? 'rgba(202, 156, 87, 0.08)' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: 'calc(4 * var(--u))',
                transform: isActive ? 'translateX(calc(4 * var(--u)))' : 'none',
              }}
            >
              {/* Header row: Number + Title */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'calc(18 * var(--u))',
                }}
              >
                {/* Number styling: Solid Red when active, Elegant Gold Outline when inactive */}
                <span
                  className="f0"
                  style={{
                    fontSize: 'calc(42 * var(--u))',
                    lineHeight: 1,
                    letterSpacing: '-0.006em',
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? '#9b1d22' : 'transparent',
                    WebkitTextStroke: isActive ? '0px' : 'calc(1.4 * var(--u)) #ca9c57',
                    transition: 'all 0.35s ease',
                    display: 'inline-block',
                    width: 'calc(55 * var(--u))',
                    textAlign: 'left',
                    flexShrink: 0,
                  }}
                >
                  {pillar.number}
                </span>

                {/* Title */}
                <h3
                  className="f6"
                  style={{
                    fontSize: 'calc(21.5 * var(--u) * var(--font-scale, 0.84))',
                    lineHeight: 1.25,
                    margin: 0,
                    padding: 0,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#8b1b1e' : '#2e2e2e',
                    transition: 'color 0.3s ease',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {pillar.title}
                </h3>
              </div>

              {/* Collapsible Info description & tags for the active item */}
              {isActive && (
                <div
                  style={{
                    paddingLeft: 'calc(73 * var(--u))',
                    animation: 'cvFadeInUp 0.35s ease forwards',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'calc(6 * var(--u))',
                  }}
                >
                  <p
                    className="f3"
                    style={{
                      fontSize: 'calc(12.5 * var(--u) * var(--font-scale, 0.84))',
                      lineHeight: 1.5,
                      color: '#4a4240',
                      margin: 0,
                      maxWidth: 'calc(450 * var(--u))',
                    }}
                  >
                    {pillar.desc}
                  </p>

                  {/* Feature tags */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'calc(6 * var(--u))',
                      marginTop: 'calc(2 * var(--u))',
                    }}
                  >
                    {pillar.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="f3"
                        style={{
                          fontSize: 'calc(10 * var(--u))',
                          fontWeight: 500,
                          padding: 'calc(2 * var(--u)) calc(8 * var(--u))',
                          backgroundColor: '#fbf5eb',
                          color: '#8b1b1e',
                          borderRadius: 'calc(4 * var(--u))',
                          border: 'calc(1 * var(--u)) solid rgba(202, 156, 87, 0.35)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* RIGHT: Dynamic Photo Container with smooth cross-fade */}
      <div
        style={{
          width: 'calc(335 * var(--u))',
          height: '100%',
          position: 'relative',
          borderRadius: 'calc(10 * var(--u))',
          overflow: 'hidden',
          boxShadow: '0 calc(8 * var(--u)) calc(28 * var(--u)) rgba(48, 66, 84, 0.16)',
          backgroundColor: '#304254',
        }}
      >
        {PILLARS.map((pillar, idx) => {
          const isCurrent = idx === activeIndex
          return (
            <div
              key={pillar.id}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isCurrent ? 1 : 0,
                transform: isCurrent ? 'scale(1)' : 'scale(1.04)',
                transition: 'opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isCurrent ? 'auto' : 'none',
              }}
            >
              <img
                src={pillar.image}
                alt={pillar.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />

              {/* Gradient overlay at bottom for title & counter badge */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(20, 16, 15, 0.85) 0%, rgba(20, 16, 15, 0.25) 45%, transparent 70%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'calc(18 * var(--u)) calc(16 * var(--u))',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    className="f0"
                    style={{
                      color: '#ca9c57',
                      fontSize: 'calc(13 * var(--u))',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Pillar {pillar.number} / 04
                  </span>

                  {/* Navigation dots */}
                  <div style={{ display: 'flex', gap: 'calc(6 * var(--u))' }}>
                    {PILLARS.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelect(dotIdx)
                        }}
                        style={{
                          width: dotIdx === activeIndex ? 'calc(16 * var(--u))' : 'calc(6 * var(--u))',
                          height: 'calc(6 * var(--u))',
                          borderRadius: 'calc(3 * var(--u))',
                          backgroundColor: dotIdx === activeIndex ? '#ca9c57' : 'rgba(255, 255, 255, 0.45)',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <h4
                  className="f6"
                  style={{
                    color: '#ffffff',
                    fontSize: 'calc(17 * var(--u))',
                    margin: 'calc(4 * var(--u)) 0 0 0',
                    lineHeight: 1.25,
                    fontWeight: 600,
                    textShadow: '0 calc(2 * var(--u)) calc(4 * var(--u)) rgba(0,0,0,0.5)',
                  }}
                >
                  {pillar.title}
                </h4>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
