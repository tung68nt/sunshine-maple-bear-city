'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Force light theme for pages without hero banners
  const forceLight = pathname.startsWith('/blog/') || pathname === '/contact' || pathname === '/admission' || pathname.startsWith('/events/') || pathname === '/faq'
  const isLight = isScrolled || forceLight

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const navItems = [
    { label: 'About Us', href: '/about', children: [
      { label: 'Welcome to Sunshine', href: '/about' },
      { label: 'Our Philosophy & Core Values', href: '/about#philosophy' },
      { label: 'Leadership & Faculty', href: '/about#team' },
      { label: 'Facilities & Campus', href: '/gallery' },
      { label: 'Careers', href: '/contact' },
    ]},
    { label: 'Academics', href: '/academics', children: [
      { label: 'Canadian Immersion Methodology', href: '/academics' },
      { label: 'Early Years (12mo - 3yo)', href: '/academics/early-years' },
      { label: 'Kindergarten (3yo - 5yo)', href: '/academics/kindergarten' },
      { label: 'Extracurricular Activities', href: '/academics/extracurricular' },
    ]},
    { label: 'Community', href: '/blog', children: [
      { label: 'News & Insights', href: '/blog' },
      { label: 'School Events', href: '/events' },
      { label: 'Parent Portal', href: '/community/parent-portal' },
      { label: 'Safeguarding & Child Protection', href: '/community/safeguarding' },
      { label: 'Health & Nutrition', href: '/community/health' },
    ]},
    { label: 'Admissions', href: '/admissions', children: [
      { label: 'Admissions Process', href: '/admissions' },
      { label: 'Tuition Fees & Scholarships', href: '/admissions/tuition-fees' },
      { label: 'Book a School Tour', href: '/tour-booking' },
      { label: 'Frequently Asked Questions', href: '/faq' },
    ]},
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLight
            ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-neutral-100'
            : 'bg-white/0'
        }`}
        style={{ height: isLight ? '64px' : '84px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0" aria-label="Sunshine Maple Bear Homepage">
              <div className="relative h-12 w-12 md:h-16 md:w-16 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Sunshine Maple Bear Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col notranslate">
                <span className={`text-sm md:text-base font-display font-bold tracking-tight leading-none transition-colors ${isLight ? 'text-maple-black' : 'text-white'}`}>
                  SUNSHINE MAPLE BEAR
                </span>
                <span className={`text-[6px] md:text-[7px] font-display font-bold uppercase tracking-[0.15em] leading-tight transition-colors ${isLight ? 'text-maple-red' : 'text-maple-gold'}`}>
                  International Kindergarten
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
              <ul className="flex items-center gap-1 xl:gap-2">
                {navItems.map((item) => (
                  <li key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className={`relative px-3 py-2 text-sm font-bold transition-colors flex items-center gap-1.5 ${
                        isLight
                          ? 'text-maple-black hover:text-maple-red'
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {item.label}
                      {item.children && <ChevronDown size={14} className="opacity-40 group-hover:rotate-180 transition-transform" aria-hidden="true" />}
                    </Link>
                    
                    {item.children && (
                      <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                        <ul className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-neutral-100 overflow-hidden w-72 p-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                aria-current={pathname === child.href ? 'page' : undefined}
                                className="flex items-center justify-between px-4 py-3 text-sm font-bold text-neutral-600 hover:bg-neutral-50 hover:text-maple-red rounded-xl transition-colors"
                              >
                                {child.label}
                                {pathname === child.href && <div className="w-1.5 h-1.5 bg-maple-red rounded-full" aria-hidden="true" />}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Action Bar */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Link
                  href="/admissions"
                  className={`px-6 py-2.5 text-sm font-bold border-2 rounded-full transition-all ${
                    isLight
                      ? 'border-maple-black text-maple-black hover:bg-maple-black hover:text-white'
                      : 'border-white text-white hover:bg-white hover:text-maple-black'
                  }`}
                >
                  Admissions
                </Link>
                <Link
                  href="/tour-booking"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-maple-red rounded-full hover:bg-red-700 transition-all shadow-lg shadow-maple-red/20 active:scale-95"
                >
                  Book a Tour
                </Link>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              className={`lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                isLight ? 'text-[var(--color-dark)]' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[9px] bg-[var(--color-dark)]' : isLight ? 'bg-[var(--color-dark)]' : 'bg-white'}`} />
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0 bg-[var(--color-dark)]' : isLight ? 'bg-[var(--color-dark)]' : 'bg-white'}`} />
                <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[9px] bg-[var(--color-dark)]' : isLight ? 'bg-[var(--color-dark)]' : 'bg-white'}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 lg:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full px-8 pt-20">
          <nav className="w-full max-w-sm" aria-label="Mobile navigation">
            <ul className="flex flex-col items-center gap-1">
              {navItems.map((item, idx) => (
                <li key={item.href} className="w-full">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className="block w-full text-center px-6 py-3 text-lg font-display font-bold text-[var(--color-dark)] hover:text-[var(--color-primary)] hover:bg-[var(--color-cream)] rounded-2xl transition-all"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4 w-full max-w-sm mt-8 pt-8 border-t border-[var(--color-gray-light)]">
            <Link
              href="/tour-booking"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--color-primary)] text-white font-display font-bold rounded-2xl text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Tour
            </Link>
            <Link
              href="/admissions"
              className="flex items-center justify-center gap-2 w-full py-4 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-display font-bold rounded-2xl text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Admissions 2026
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
