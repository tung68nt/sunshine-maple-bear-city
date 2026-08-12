'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Sparkles, ShieldCheck, Play } from 'lucide-react'
import { SCHOOL_IMAGES } from '@/lib/constants'

export function HeroSection() {
  const [activeLang, setActiveLang] = useState<'en' | 'vi'>('en')

  useEffect(() => {
    const saved = (localStorage.getItem('smb_site_lang') as 'en' | 'vi') || 'en'
    setActiveLang(saved)

    const handleLangChange = (e: CustomEvent) => {
      if (e.detail === 'en' || e.detail === 'vi') {
        setActiveLang(e.detail)
      }
    }

    window.addEventListener('smbLanguageChange', handleLangChange as EventListener)
    return () => window.removeEventListener('smbLanguageChange', handleLangChange as EventListener)
  }, [])

  return (
    <section className="relative bg-[#FDFBF7] pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-neutral-200/60 overflow-hidden">
      
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* 2-Column Grid: Left Content + Right Hero Image Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (7 cols): Hero Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#9E1B1E] text-xs font-sans font-extrabold uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-[#9E1B1E] animate-ping" />
              <span>{activeLang === 'vi' ? 'TRƯỜNG MẦM NON CHUẨN CANADA' : 'CANADIAN INTERNATIONAL KINDERGARTEN'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#332C2B] leading-[1.15]">
              {activeLang === 'vi' ? (
                <>
                  Giáo Dục Canada <br />
                  <span className="italic font-normal text-[#9E1B1E]">Khơi Nguồn Tương Lai</span>
                </>
              ) : (
                <>
                  A Canadian Education <br />
                  <span className="italic font-normal text-[#9E1B1E]">for Lifelong Success</span>
                </>
              )}
            </h1>

            {/* Intro Paragraph */}
            <p className="text-base sm:text-lg text-[#554D4B] font-light leading-relaxed max-w-2xl">
              {activeLang === 'vi'
                ? 'Sunshine Maple Bear mang tới môi trường đắm mình Tiếng Anh 100% chuẩn Canada, giúp trẻ phát triển tự nhiên tư duy sáng tạo, lòng nhân ái và sự tự tin toàn cầu tại Sunshine City, Hà Nội.'
                : 'Sunshine Maple Bear Hanoi offers an authentic 100% Canadian English immersion environment designed to cultivate creativity, compassion, and global confidence inside Sunshine City.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact-us"
                className="px-7 py-3.5 bg-[#9E1B1E] hover:bg-[#801316] text-white text-xs font-sans font-semibold rounded-full shadow-md transition-all inline-flex items-center gap-2.5 group"
              >
                <span>{activeLang === 'vi' ? 'Đăng ký Tham quan Trường' : 'Book a Campus Tour'}</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white border border-neutral-300 hover:border-[#9E1B1E] text-[#332C2B] hover:text-[#9E1B1E] text-xs font-sans font-semibold rounded-full shadow-xs transition-all inline-flex items-center gap-2 group"
              >
                <div className="w-5 h-5 rounded-full bg-red-100 text-[#9E1B1E] flex items-center justify-center">
                  <Play size={10} className="fill-current ml-0.5" />
                </div>
                <span>{activeLang === 'vi' ? 'Xem Video Giới thiệu' : 'Watch Campus Video'}</span>
              </a>
            </div>

          </div>

          {/* Right Column (5 cols): Campus Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-neutral-200/80 shadow-2xl group">
              <Image
                src={SCHOOL_IMAGES.render.thuVien1}
                alt="Sunshine Maple Bear Campus"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#332C2B]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-sans font-extrabold uppercase tracking-wider text-[#C5A059]">
                  SUNSHINE CITY HANOI
                </span>
                <h3 className="text-xl font-serif font-bold">
                  5-Star International Campus
                </h3>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pillar Cards below Hero (Standardized Font Size System) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-200/60">
          
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-[#9E1B1E] transition-colors">
            <div className="w-11 h-11 rounded-full bg-red-50 text-[#9E1B1E] flex items-center justify-center flex-shrink-0">
              <Award size={22} />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#332C2B]">Official Canadian Curriculum</h3>
              <p className="text-xs text-[#554D4B] font-light mt-0.5">Global top-ranked education standard</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-[#9E1B1E] transition-colors">
            <div className="w-11 h-11 rounded-full bg-amber-50 text-[#C5A059] flex items-center justify-center flex-shrink-0">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#332C2B]">Bilingual Immersion</h3>
              <p className="text-xs text-[#554D4B] font-light mt-0.5">Native English & Vietnamese educators</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-[#9E1B1E] transition-colors">
            <div className="w-11 h-11 rounded-full bg-red-50 text-[#9E1B1E] flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#332C2B]">5-Star Modern Campus</h3>
              <p className="text-xs text-[#554D4B] font-light mt-0.5">Located at Sunshine City, Hanoi</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
