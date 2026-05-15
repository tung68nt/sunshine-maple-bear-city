'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SCHOOL_IMAGES } from '@/lib/constants'

const facilities = [
  { src: SCHOOL_IMAGES.render.thuVien3, label: 'Library', span: 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' },
  { src: SCHOOL_IMAGES.render.lopHoc4, label: 'Sunshine Classroom', span: 'col-span-1 row-span-1' },
  { src: SCHOOL_IMAGES.render.phongChucNang1, label: 'STEAM Lab', span: 'col-span-1 row-span-1' },
  { src: SCHOOL_IMAGES.render.hanhLang1, label: 'Outdoor Playground', span: 'col-span-2 row-span-1 md:col-span-1' },
  { src: SCHOOL_IMAGES.render.phongChucNang2, label: 'Activity Room', span: 'col-span-1 row-span-1' },
  { src: SCHOOL_IMAGES.render.lopHoc2, label: 'Polar Bear Classroom', span: 'col-span-1 row-span-1' },
  { src: SCHOOL_IMAGES.render.thuVien7, label: 'Open Library', span: 'col-span-2 row-span-1' },
]

export function FacilityGallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.gallery-item')
            items.forEach((item, idx) => {
              setTimeout(() => item.classList.add('is-visible'), idx * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--color-gray-light)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block text-sm font-display font-bold text-[var(--color-primary)] uppercase tracking-[0.2em]">
            Our Facilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--color-dark)]">
            Modern Learning Spaces
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {facilities.map((f, idx) => (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              aria-label={`View image: ${f.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setLightboxIdx(idx)
                }
              }}
              className={`gallery-item scroll-animate fade-up relative rounded-2xl overflow-hidden cursor-pointer group ${f.span}`}
              style={{ aspectRatio: f.span ? undefined : '1/1', minHeight: f.span ? '300px' : undefined }}
              onClick={() => setLightboxIdx(idx)}
            >
              <Image
                src={f.src}
                alt={f.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={75}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-end">
                <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-display font-bold text-sm">{f.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tour-booking"
            aria-label="Schedule an in-person campus tour"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white font-display font-bold rounded-full hover:bg-[var(--color-primary-dark)] transition-all btn-hover shadow-lg"
          >
            Schedule a Campus Tour
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white z-10"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close image"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full">
            <Image
              src={facilities[lightboxIdx].src}
              alt={facilities[lightboxIdx].label}
              fill
              className="object-contain"
            />
          </div>
          {/* Navigation */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + facilities.length) % facilities.length) }}
            aria-label="Previous image"
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % facilities.length) }}
            aria-label="Next image"
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
