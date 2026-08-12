'use client'

import { useState, useEffect } from 'react'
import { CalendarCheck, ArrowRight } from 'lucide-react'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
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

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('smbLanguageChange', handleLangChange as EventListener)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!isVisible) return null

  const buttonText = activeLang === 'vi' ? 'ĐẶT LỊCH THAM QUAN' : 'BOOK A TOUR / CONTACT US'

  return (
    <div className="fixed bottom-6 left-4 sm:left-8 z-50 animate-fade-in">
      <a
        href="#contact-us"
        aria-label="Book a Tour or Contact Us"
        className="flex items-center gap-2.5 px-6 py-3.5 bg-[#9E1B1E] hover:bg-[#801316] text-white font-sans font-extrabold text-xs uppercase tracking-wider rounded-full border border-white/30 shadow-2xl transition-all duration-300 active:scale-95 group"
      >
        <CalendarCheck size={16} className="text-[#C5A059] group-hover:scale-110 transition-transform" />
        <span>{buttonText}</span>
        <ArrowRight size={14} className="text-white/80 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  )
}
