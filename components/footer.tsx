'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SCHOOL_INFO } from '@/lib/constants'

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Curriculum', href: '/curriculum' },
    { label: 'Facilities', href: '/gallery' },
    { label: 'Admissions', href: '/admission' },
    { label: 'Events', href: '/events' },
    { label: 'FAQ', href: '/faq' },
  ]

  return (
    <footer className="bg-maple-black text-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-maple-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 pb-16 border-b border-white/10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 group">
              <Link href="/" className="relative w-14 h-14 bg-white rounded-2xl p-2 flex-shrink-0 shadow-xl shadow-black/20 group-hover:scale-105 transition-transform duration-500" aria-label="Sunshine Maple Bear Homepage">
                <Image src="/logo.png" alt="Sunshine Maple Bear Logo" fill className="object-contain" />
              </Link>
              <div className="space-y-0.5 notranslate">
                <span className="text-2xl font-display font-bold tracking-tight text-white block leading-none">
                  SUNSHINE
                </span>
                <span className="text-[10px] font-display font-bold uppercase tracking-[0.25em] text-maple-gold leading-tight">
                  Maple Bear
                </span>
              </div>
            </div>
            <p className="text-white/80 text-base leading-relaxed max-w-sm font-light">
              A world-class Canadian international kindergarten with 100% English instruction — where every young learner is nurtured to become a confident, compassionate global citizen.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              {[
                { label: 'Facebook', href: 'https://facebook.com', svg: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { label: 'Instagram', href: 'https://instagram.com', svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { label: 'YouTube', href: 'https://youtube.com', svg: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center text-white/50 hover:bg-maple-red hover:border-maple-red hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.svg} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-sm font-display font-bold uppercase tracking-[0.2em] text-maple-gold">
              Explore
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm font-bold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-sm font-display font-bold uppercase tracking-[0.2em] text-maple-gold">
              Contact Us
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-maple-red/20 transition-all">
                  <svg className="w-5 h-5 text-maple-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-white/80 text-sm leading-relaxed font-light">{SCHOOL_INFO.ADDRESS}</p>
              </li>
              <li className="flex gap-4 items-center group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-maple-red/20 transition-all">
                  <svg className="w-5 h-5 text-maple-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href={`tel:${SCHOOL_INFO.PHONE}`} className="text-white/80 hover:text-white text-sm font-bold transition-colors">
                  {SCHOOL_INFO.PHONE}
                </a>
              </li>
              <li className="flex gap-4 items-center group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-maple-red/20 transition-all">
                  <svg className="w-5 h-5 text-maple-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <a href={`mailto:${SCHOOL_INFO.EMAIL}`} className="text-white/80 hover:text-white text-sm font-bold transition-colors break-all block">
                    {SCHOOL_INFO.EMAIL}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter + Map */}
          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-sm font-display font-bold uppercase tracking-[0.2em] text-maple-gold">
              Newsletter
            </h3>
            <div className="space-y-4">
              <p className="text-white/80 text-sm font-light">
                Subscribe to receive the latest updates, events and exclusive offers.
              </p>
              <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="footer-newsletter" className="sr-only">Email for newsletter subscription</label>
                <input
                  id="footer-newsletter"
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-maple-gold focus:ring-4 focus:ring-maple-gold/5 transition-all"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter subscription"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-maple-gold rounded-xl text-maple-black text-xs font-bold hover:bg-white transition-colors shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
            
            {/* Mini Map Link */}
            <a
              href="https://maps.google.com/?q=Sunshine+City+Ciputra+Hanoi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View school location on Google Maps"
              className="block rounded-3xl overflow-hidden border border-white/10 hover:border-maple-gold/30 transition-all group relative h-24"
            >
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors flex items-center px-6 gap-4">
                <div className="w-12 h-12 rounded-2xl bg-maple-red/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-maple-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/80 text-sm font-bold group-hover:text-maple-gold transition-colors">View on Map</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">Ciputra, Hanoi</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/20">
          <p className="text-white/50">&copy; {currentYear} Sunshine Maple Bear International Kindergarten. All rights reserved.</p>
          <nav className="flex gap-8" aria-label="Legal links">
            <Link href="/privacy" className="text-white/40 hover:text-white/80 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/40 hover:text-white/80 transition-colors">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
