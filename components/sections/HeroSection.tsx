'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { Award, Building2, Languages, ArrowRight, ChevronDown } from 'lucide-react'

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

      {/* Editorial Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#151513] via-black/50 to-black/30 z-[1]" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto py-8">
        <div className="max-w-4xl space-y-6">
          
          {/* Editorial Tagline */}
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[2px] bg-maple-red" />
            <span className="text-xs sm:text-sm font-display font-extrabold uppercase tracking-[0.25em] text-maple-gold">
              Welcome to Sunshine Maple Bear International Kindergarten
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.1] tracking-tight">
              Where Your Child Thrives, <br />
              <span className="font-serif italic font-normal text-amber-200">Every Single Day.</span>
            </h1>
            <p className="text-base sm:text-xl font-display font-semibold text-maple-gold/90 tracking-wide">
              A Canadian Education for Life-Long Success
            </p>
          </div>

          {/* Description Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed max-w-2xl font-light">
            At Sunshine Maple Bear International Kindergarten, children learn through exploration, play and meaningful experiences inspired by the internationally recognised Canadian curriculum. Every day is thoughtfully designed to help children thrive academically, socially and emotionally.
          </p>

          {/* Modern Sharp Rectangular Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#contact-us"
              className="inline-flex items-center gap-3 px-8 py-4 bg-maple-red text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all border border-maple-red shadow-lg active:scale-95"
            >
              <span>Book a School Tour</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact-us"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all active:scale-95"
            >
              <span>Apply Now</span>
            </a>
          </div>

        </div>
      </div>

      {/* Editorial Bottom Bar with Professional Vector Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-white/20 text-white/90">
          
          <div className="flex items-center gap-3 md:border-r md:border-white/15 md:pr-4">
            <div className="w-9 h-9 border border-maple-gold/40 flex items-center justify-center text-maple-gold flex-shrink-0">
              <Award size={18} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-maple-gold block">Official Standard</span>
              <span className="text-xs text-neutral-300 font-medium">Canadian Curriculum</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:border-r md:border-white/15 md:pr-4">
            <div className="w-9 h-9 border border-maple-gold/40 flex items-center justify-center text-maple-gold flex-shrink-0">
              <Building2 size={18} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-maple-gold block">Sunshine City</span>
              <span className="text-xs text-neutral-300 font-medium">5-Star Campus Facility</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:border-r md:border-white/15 md:pr-4">
            <div className="w-9 h-9 border border-maple-gold/40 flex items-center justify-center text-maple-gold flex-shrink-0">
              <Languages size={18} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-maple-gold block">100% English</span>
              <span className="text-xs text-neutral-300 font-medium">Immersion Program</span>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-200">Scroll</span>
              <div className="w-4 h-7 border border-white/40 rounded-none p-1 flex justify-center">
                <div className="w-1 h-1 bg-white rounded-none animate-bounce-scroll" />
              </div>
            </div>
            <div className="flex gap-1.5">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-1 transition-all ${currentSlide === idx ? 'w-6 bg-maple-gold' : 'w-2 bg-white/40'}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
