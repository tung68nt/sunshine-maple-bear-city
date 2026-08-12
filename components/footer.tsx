'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, ArrowUpRight, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react'
import { SCHOOL_INFO } from '@/lib/constants'

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2026)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const footerNav = [
    {
      title: 'About Us',
      links: [
        { label: 'Our Story', href: '/about/story' },
        { label: 'Why Maple Bear?', href: '/about/why-maple-bear' },
        { label: 'Leadership', href: '/about/leadership' },
        { label: 'Meet Our Teachers', href: '/about/teachers' },
      ],
    },
    {
      title: 'Learning',
      links: [
        { label: 'Age Groups', href: '/academics/age-groups' },
        { label: 'A Day at Maple Bear', href: '/academics/daily-schedule' },
        { label: 'Nutrition & Wellbeing', href: '/academics/nutrition' },
        { label: 'Academic Calendar', href: '/academics/calendar' },
      ],
    },
    {
      title: 'Admissions',
      links: [
        { label: 'Admissions Process', href: '/admissions/process' },
        { label: 'Tuition Fees', href: '/admissions/tuition' },
        { label: 'Founding Families', href: '/admissions/founding-families' },
        { label: 'Open Day', href: '/admissions/open-day' },
        { label: 'Book a Tour', href: '#contact-us' },
      ],
    },
  ]

  return (
    <footer className="bg-white text-[#332C2B] border-t border-neutral-200/80 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Footer Columns preserving 100% of original navigation links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-neutral-200/80">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image src="/logo.png" alt="Maple Bear Logo" fill className="object-contain" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-serif font-bold text-[#9E1B1E] uppercase tracking-tight">
                  SUNSHINE MAPLE BEAR
                </h3>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#C5A059] block">
                  INTERNATIONAL KINDERGARTEN
                </span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#554D4B] font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#9E1B1E] flex-shrink-0 mt-0.5" />
                <span>S4 Building, Sunshine City, Nam Thang Long Urban Area, Phu Thuong Ward, Hanoi, Vietnam</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#9E1B1E] flex-shrink-0" />
                <a href={`tel:${SCHOOL_INFO.PHONE}`} className="hover:text-[#9E1B1E] font-semibold transition-colors">
                  {SCHOOL_INFO.PHONE}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#9E1B1E] flex-shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.EMAIL}`} className="hover:text-[#9E1B1E] transition-colors font-medium">
                  {SCHOOL_INFO.EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerNav.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-xs font-sans font-extrabold uppercase tracking-widest text-[#9E1B1E]">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-[#554D4B] hover:text-[#9E1B1E] transition-colors flex items-center gap-1 group font-light"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9E1B1E]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Footer Bar matching Picture1.png layout: Logo & Copyright left, Follow Us & Social Icons right */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#554D4B]">
          <div className="flex flex-wrap items-center gap-4">
            <p>© {currentYear} SUNSHINE MAPLE BEAR INTERNATIONAL SCHOOL. ALL RIGHTS RESERVED.</p>
            <span className="text-neutral-300 hidden md:inline">|</span>
            <Link href="/privacy" className="hover:text-[#9E1B1E] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#9E1B1E] transition-colors">Terms of Service</Link>
          </div>

          {/* Social Links matching Picture1.png */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[#332C2B]">Follow Us</span>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-neutral-300 hover:border-[#9E1B1E] text-[#332C2B] hover:text-[#9E1B1E] flex items-center justify-center transition-colors"
              >
                <Facebook size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-neutral-300 hover:border-[#9E1B1E] text-[#332C2B] hover:text-[#9E1B1E] flex items-center justify-center transition-colors"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-neutral-300 hover:border-[#9E1B1E] text-[#332C2B] hover:text-[#9E1B1E] flex items-center justify-center transition-colors"
              >
                <Youtube size={14} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-neutral-300 hover:border-[#9E1B1E] text-[#332C2B] hover:text-[#9E1B1E] flex items-center justify-center transition-colors"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
