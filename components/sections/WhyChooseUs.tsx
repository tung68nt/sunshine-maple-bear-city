'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

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
    <section id="why-choose" className="py-24 lg:py-32 bg-[#FDFBF7] relative border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs font-display font-black text-maple-red uppercase tracking-[0.2em]">01 / EXCELLENCE</span>
          <div className="h-[1px] bg-neutral-300 flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Text & List (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1D1D1B] leading-tight">
                Why Families Choose <span className="font-serif italic font-normal text-maple-red">Maple Bear</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
                At Sunshine Maple Bear International Kindergarten, every day is designed to inspire curiosity, build confidence and nurture a lifelong love of learning. Through the Maple Bear Canadian Curriculum, caring educators and a safe, engaging environment, children are supported to grow academically, socially and emotionally.
              </p>
            </div>

            {/* Editorial Line List */}
            <div className="border-t border-neutral-200 divide-y divide-neutral-200 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="py-4 flex items-start gap-4 group">
                  <span className="text-xs font-display font-extrabold text-maple-red tracking-wider pt-0.5">{item.num}</span>
                  <div className="flex-1">
                    <h3 className="text-base font-display font-bold text-[#1D1D1B] group-hover:text-maple-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sharp Action Button */}
            <div className="pt-4">
              <a
                href="#contact-us"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1D1D1B] text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-maple-red transition-colors border border-[#1D1D1B]"
              >
                <span>Book a School Tour</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Sharp Editorial Image Frame (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[480px] sm:h-[560px] border border-neutral-300 bg-white p-3 shadow-lg group">
              <div className="relative w-full h-full overflow-hidden bg-neutral-900">
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
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Caption Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                      <span className="text-[10px] font-display font-extrabold uppercase tracking-widest text-maple-gold">
                        CAMPUS GALLERY
                      </span>
                      <h3 className="text-lg font-display font-bold">
                        {img.title}
                      </h3>
                      <p className="text-xs text-neutral-300 font-light">
                        {img.subtitle}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Sharp Slider Controls */}
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous"
                    className="w-9 h-9 bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next"
                    className="w-9 h-9 bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
