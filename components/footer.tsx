'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'

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
    <footer className="bg-[var(--color-dark)] text-white relative overflow-hidden pt-20 pb-10 border-t border-white/10">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-maple-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-2xl p-1.5 flex-shrink-0 shadow-md">
                <Image src="/logo.png" alt="Sunshine Maple Bear Logo" fill className="object-contain" />
              </div>
              <div className="space-y-0.5 notranslate">
                <h3 className="text-base font-display font-extrabold text-white leading-tight uppercase">
                  SUNSHINE MAPLE BEAR
                </h3>
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-maple-gold block mt-0.5">
                  INTERNATIONAL KINDERGARTEN
                </span>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-neutral-300 pt-2">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-maple-gold flex-shrink-0 mt-0.5" />
                <span>S4 Building, Sunshine City, Nam Thang Long Urban Area, Phu Thuong Ward, Hanoi, Vietnam</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-maple-gold flex-shrink-0" />
                <a href="tel:+84911040022" className="hover:text-maple-gold font-bold transition-colors">
                  +84 91 104 0022
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-maple-gold flex-shrink-0" />
                <span className="text-neutral-400 font-medium">EMAIL: (pending)</span>
              </li>
            </ul>
          </div>

          {/* Nav Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerNav.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-xs font-display font-extrabold uppercase tracking-widest text-maple-gold">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-medium">
          <p>© {currentYear} SUNSHINE MAPLE BEAR INTERNATIONAL SCHOOL. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <a
              href="https://tulie.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-maple-gold transition-colors font-semibold flex items-center gap-1"
            >
              <span>Thiết kế & Phát triển bởi</span>
              <span className="text-maple-gold underline decoration-maple-gold/40 underline-offset-2">Tulie Agency</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
