'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { MapleLeafIcon } from '@/components/ui/MapleLeafIcon'

const carouselImages = [
  {
    src: SCHOOL_IMAGES.render.thuVien1,
    title: 'Inspiring Learning Spaces',
    subtitle: 'Designed for curiosity and joyful discovery'
  },
  {
    src: SCHOOL_IMAGES.render.lopHoc4,
    title: 'Warm & Caring Educators',
    subtitle: 'Nurturing confidence and lifelong success'
  },
  {
    src: SCHOOL_IMAGES.render.hanhLang1,
    title: 'Safe & Modern Environment',
    subtitle: 'International standards for early childhood development'
  }
]

const highlights = [
  { num: '01', title: 'Official Canadian Curriculum', desc: 'Designed to develop children academic, social, emotional and physical well-being.' },
  { num: '02', title: 'Caring International Educators', desc: 'Passionate teachers dedicated to nurturing every child\'s unique potential.' },
  { num: '03', title: 'Safe & Engaging Campus', desc: '5-star facilities situated in Sunshine City, Hanoi.' },
  { num: '04', title: 'Holistic Growth', desc: 'Supporting academic progress, social confidence and emotional resilience.' }
]

export function WhyChooseUs() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)

  return (
    <section id="why-choose" className="py-20 lg:py-28 bg-white relative border-b border-neutral-100 overflow-hidden">
      
      {/* Decorative Maple Leaf Accent */}
      <div className="absolute top-10 right-4 text-[#C5A059]/10 pointer-events-none rotate-45">
        <MapleLeafIcon size={160} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-1.5 rounded-full bg-red-50 text-[#9E1B1E]">
            <MapleLeafIcon size={14} />
          </div>
          <span className="text-xs font-display font-extrabold text-[#9E1B1E] uppercase tracking-[0.2em]">01 / EXCELLENCE</span>
          <div className="h-[1px] bg-neutral-200 flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & List (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#9E1B1E] leading-tight">
                Why Families Choose <span className="font-serif italic font-normal text-amber-800">Maple Bear</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
                At Sunshine Maple Bear International Kindergarten, every day is designed to inspire curiosity, build confidence and nurture a lifelong love of learning. Through the Maple Bear Canadian Curriculum, caring educators and a safe, engaging environment, children are supported to grow academically, socially and emotionally.
              </p>
            </div>

            {/* List with Rounded Pill Badges */}
            <div className="border-t border-neutral-200 divide-y divide-neutral-100 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="py-4 flex items-start gap-4 group">
                  <span className="w-8 h-8 rounded-full bg-red-50 text-[#9E1B1E] flex items-center justify-center text-xs font-display font-extrabold flex-shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-display font-bold text-neutral-900 group-hover:text-[#9E1B1E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Red Pill Button (NO black button) */}
            <div className="pt-2">
              <a
                href="#contact-us"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#9E1B1E] hover:bg-[#801316] text-white font-sans font-bold text-xs uppercase tracking-widest rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Book a School Tour</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Rounded Image Carousel (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[460px] sm:h-[520px] rounded-3xl overflow-hidden bg-white shadow-xl border-4 border-neutral-100 group">
              {carouselImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    currentSlide === idx ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Caption Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-[#332C2B] space-y-1 shadow-md">
                    <span className="text-[10px] font-display font-extrabold uppercase tracking-widest text-[#9E1B1E] block flex items-center gap-1">
                      <MapleLeafIcon size={12} /> CAMPUS GALLERY
                    </span>
                    <h3 className="text-base font-display font-bold text-neutral-900">
                      {img.title}
                    </h3>
                    <p className="text-xs text-neutral-600 font-light">
                      {img.subtitle}
                    </p>
                  </div>
                </div>
              ))}

              {/* Slider Controls */}
              <div className="absolute top-4 right-4 flex gap-2 z-20">
                <button
                  onClick={prevSlide}
                  aria-label="Previous image"
                  className="w-9 h-9 bg-white/80 hover:bg-white text-neutral-800 rounded-full flex items-center justify-center transition-colors shadow-md backdrop-blur-sm"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next image"
                  className="w-9 h-9 bg-white/80 hover:bg-white text-neutral-800 rounded-full flex items-center justify-center transition-colors shadow-md backdrop-blur-sm"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
