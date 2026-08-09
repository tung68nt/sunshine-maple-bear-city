'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'

const heroSlides = [
  SCHOOL_IMAGES.render.thuVien1,
  SCHOOL_IMAGES.render.lopHoc4,
  SCHOOL_IMAGES.render.hanhLang1,
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-8 overflow-hidden bg-[#151513] text-white" aria-label="Welcome to Sunshine Maple Bear">
      
      {/* Background Slideshow */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: currentSlide === idx ? 1 : 0 }}
          aria-hidden={currentSlide !== idx}
        >
          <Image
            src={slide}
            alt={`Sunshine Maple Bear Campus — Image ${idx + 1}`}
            fill
            className="object-cover scale-105 filter brightness-[0.7] contrast-[1.05]"
            style={{ animation: currentSlide === idx ? 'subtle-zoom 20s ease-in-out infinite alternate' : 'none' }}
            priority={idx === 0}
            sizes="100vw"
            quality={85}
          />
        </div>
      ))}

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#151513] via-black/50 to-black/30 z-[1]" />

      {/* Main Center Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto py-8">
        <div className="max-w-4xl space-y-6">
          
          {/* Friendly Luxury Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="w-2 h-2 rounded-full bg-maple-red animate-pulse" />
            <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-maple-gold">
              Sunshine Maple Bear International Kindergarten
            </span>
          </div>

          {/* Editorial Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.1] tracking-tight">
              Where Your Child Thrives, <br />
              <span className="font-serif italic font-normal text-amber-200">Every Single Day.</span>
            </h1>
            <p className="text-base sm:text-xl font-display font-semibold text-maple-gold/90 tracking-wide">
              A Canadian Education for Life-Long Success
            </p>
          </div>

          {/* Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed max-w-2xl font-light">
            At Sunshine Maple Bear International Kindergarten, children learn through exploration, play and meaningful experiences inspired by the internationally recognised Canadian curriculum. Every day is thoughtfully designed to help children thrive academically, socially and emotionally.
          </p>

          {/* Action Buttons: Friendly Rounded Pills */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#contact-us"
              className="inline-flex items-center gap-3 px-8 py-4 bg-maple-red text-white font-display font-bold text-sm sm:text-base rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg active:scale-95"
            >
              <span>Book a School Tour</span>
              <span className="text-lg">→</span>
            </a>
            <a
              href="#contact-us"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/15 backdrop-blur-md border border-white/30 text-white font-display font-bold text-sm sm:text-base rounded-full hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
            >
              <span>Apply Now</span>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Features Row: Soft Rounded Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-white/20 text-white/90">
          
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <span className="text-maple-gold text-xl">🍁</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">Official Standard</span>
              <span className="text-xs text-neutral-300">Canadian Curriculum</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <span className="text-maple-gold text-xl">🏫</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">Sunshine City</span>
              <span className="text-xs text-neutral-300">5-Star Campus Facility</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <span className="text-maple-gold text-xl">💬</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">100% English</span>
              <span className="text-xs text-neutral-300">Immersion Program</span>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 px-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Scroll</span>
              <div className="w-4 h-7 border border-white/40 rounded-full p-1 flex justify-center">
                <div className="w-1 h-1 bg-white rounded-full animate-bounce-scroll" />
              </div>
            </div>
            <div className="flex gap-1.5">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${currentSlide === idx ? 'w-6 bg-maple-gold' : 'w-2 bg-white/40'}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
