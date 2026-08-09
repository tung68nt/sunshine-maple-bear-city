'use client'

import { useState, useEffect } from 'react'
import { CalendarCheck } from 'lucide-react'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-4 sm:left-8 z-40 animate-fade-in">
      <a
        href="#contact-us"
        aria-label="Book a Tour or Contact Us"
        className="flex items-center gap-2.5 px-6 py-3.5 bg-[#1D1D1B] text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-maple-red transition-all duration-300 border border-white/20 shadow-xl active:scale-95 group"
      >
        <CalendarCheck size={16} className="text-maple-gold group-hover:scale-110 transition-transform" />
        <span>Book a Tour / Contact Us</span>
      </a>
    </div>
  )
}
