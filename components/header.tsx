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
  const forceLight = pathname.startsWith('/blog/') || pathname === '/contact' || pathname.startsWith('/admissions') || pathname.startsWith('/events/') || pathname === '/faq' || pathname.startsWith('/community/') || pathname.startsWith('/academics/')
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
                <span className={`text-[8px] md:text-[9px] font-display font-bold uppercase tracking-[0.2em] leading-tight transition-colors ${isLight ? 'text-maple-red' : 'text-maple-gold'}`}>
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
                  className={`px-6 py-2.5 text-xs font-bold rounded-full transition-all shadow-lg active:scale-95 ${
                    isLight
                      ? 'bg-maple-black text-white hover:bg-neutral-800 shadow-neutral-200'
                      : 'bg-white text-maple-black hover:bg-neutral-100 shadow-white/10'
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
      <MobileMenu
        isOpen={isMenuOpen}
        navItems={navItems}
        pathname={pathname}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  )
}

function MobileMenu({
  isOpen,
  navItems,
  pathname,
  onClose,
}: {
  isOpen: boolean
  navItems: { label: string; href: string; children?: { label: string; href: string }[] }[]
  pathname: string
  onClose: () => void
}) {
  const [openItem, setOpenItem] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) setOpenItem(null)
  }, [isOpen])

  const toggle = (href: string) => {
    setOpenItem(prev => (prev === href ? null : href))
  }

  return (
    <div
      className={`fixed inset-0 z-40 bg-white lg:hidden flex flex-col transition-all duration-500 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      {/* Scrollable nav area */}
      <nav className="flex-1 overflow-y-auto pt-24 pb-6 px-6" aria-label="Mobile navigation">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const hasChildren = !!item.children
            const isExpanded = openItem === item.href

            return (
              <li key={item.href} className="w-full">
                {hasChildren ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-left font-display font-bold text-lg text-maple-black hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                      onClick={() => toggle(item.href)}
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={18}
                        className={`text-maple-red transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <ul className="ml-4 mt-1 mb-2 flex flex-col gap-0.5 border-l-2 border-maple-red/20 pl-4">
                        {item.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className={`block w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                                pathname === child.href
                                  ? 'text-maple-red bg-maple-red/5'
                                  : 'text-neutral-600 hover:text-maple-red hover:bg-neutral-50'
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block w-full px-5 py-3.5 rounded-2xl font-display font-bold text-lg transition-colors ${
                      pathname === item.href
                        ? 'text-maple-red bg-maple-red/5'
                        : 'text-maple-black hover:bg-neutral-50 hover:text-maple-red'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Sticky bottom CTAs */}
      <div className="px-6 pb-8 pt-4 border-t border-neutral-100 flex flex-col gap-3">
        <Link
          href="/tour-booking"
          className="flex items-center justify-center w-full py-4 bg-maple-red text-white font-display font-bold rounded-2xl text-base active:scale-95 transition-transform"
          onClick={onClose}
        >
          Book a School Tour
        </Link>
        <Link
          href="/admissions"
          className="flex items-center justify-center w-full py-4 border-2 border-maple-black text-maple-black font-display font-bold rounded-2xl text-base active:scale-95 transition-transform"
          onClick={onClose}
        >
          Admissions 2026
        </Link>
      </div>
    </div>
  )
}
