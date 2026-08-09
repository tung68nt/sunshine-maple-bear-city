'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { ChevronDown, ChevronRight, Menu, X, ArrowRight } from 'lucide-react'
import { LanguageSwitcher } from './language-switcher'

const DEFAULT_VI_MAP: Record<string, string> = {
  'Home': 'Trang chủ',
  'About Us': 'Về chúng tôi',
  'Academics': 'Chương trình học',
  'Admissions': 'Tuyển sinh',
  'Community': 'Cộng đồng',
  'News & Blog': 'Tin tức & Blog',
  'Our Story & Canadian Heritage': 'Câu chuyện thương hiệu & Di sản Canada',
  'Why Choose Maple Bear?': 'Tại sao chọn Sunshine Maple Bear?',
  'Academic Leadership & Board': 'Hội đồng Cố vấn & Ban Giám hiệu',
  'International Educators': 'Đội ngũ Giáo viên Quốc tế',
  'Early Childhood Programs (12M - 5Y)': 'Chương trình Mầm non (12M - 5Y)',
  'Daily Activity Flow & Routine': 'Thời khóa biểu & Lịch sinh hoạt 1 ngày',
  'Nutrition & Meal Program': 'Dinh dưỡng Hữu cơ 5 sao',
  'Academic Calendar 2026-2027': 'Lịch học tập Năm học 2026-2027',
  'Admissions Process Guide': 'Quy trình Tuyển sinh & Đăng ký',
  'Tuition Fee Structure 2026': 'Biểu phí Học phí 2026-2027',
  'Founding Families Program': 'Chương trình Founding Families (Ưu đãi 30%)',
  'Open Day Registration': 'Đăng ký Tham dự Open Day',
  'Book a Campus Visit': 'Đặt lịch Tham quan Trường',
  'Parent Portal & App': 'Cổng thông tin Phụ huynh (Parent Portal)',
  'Health & Safeguarding': 'Bảo vệ an toàn & Y tế học đường',
  'Safeguarding Policy': 'Chính sách An toàn Trẻ em'
}

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null)
  const [currentLang, setCurrentLang] = useState<'vi' | 'en'>('vi')

  // Header style mode
  const isLight = pathname !== '/' || isScrolled || isMenuOpen

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
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

  useEffect(() => {
    const saved = (localStorage.getItem('smb_site_lang') as 'vi' | 'en') || 'vi'
    setCurrentLang(saved)

    const handleLangChange = (e: CustomEvent) => {
      if (e.detail === 'vi' || e.detail === 'en') {
        setCurrentLang(e.detail)
      }
    }

    window.addEventListener('smbLanguageChange', handleLangChange as EventListener)
    return () => window.removeEventListener('smbLanguageChange', handleLangChange as EventListener)
  }, [])

  const initialNavItems = [
    {
      labelVi: 'Trang chủ',
      labelEn: 'Home',
      href: '/'
    },
    {
      labelVi: 'Về chúng tôi',
      labelEn: 'About Us',
      href: '/about/story',
      children: [
        { labelVi: 'Câu chuyện thương hiệu & Di sản Canada', labelEn: 'Our Story & Canadian Heritage', href: '/about/story' },
        { labelVi: 'Tại sao chọn Sunshine Maple Bear?', labelEn: 'Why Choose Maple Bear?', href: '/about/why-maple-bear' },
        { labelVi: 'Hội đồng Cố vấn & Ban Giám hiệu', labelEn: 'Academic Leadership & Board', href: '/about/leadership' },
        { labelVi: 'Đội ngũ Giáo viên Quốc tế', labelEn: 'International Educators', href: '/about/teachers' },
      ]
    },
    {
      labelVi: 'Chương trình học',
      labelEn: 'Academics',
      href: '/academics/age-groups',
      children: [
        { labelVi: 'Chương trình Mầm non (12 tháng - 5 tuổi)', labelEn: 'Early Childhood Programs (12M - 5Y)', href: '/academics/age-groups' },
        { labelVi: 'Thời khóa biểu & Lịch sinh hoạt 1 ngày', labelEn: 'Daily Activity Flow & Routine', href: '/academics/daily-schedule' },
        { labelVi: 'Dinh dưỡng Hữu cơ 5 sao', labelEn: 'Nutrition & Meal Program', href: '/academics/nutrition' },
        { labelVi: 'Lịch học tập Năm học 2026-2027', labelEn: 'Academic Calendar 2026-2027', href: '/academics/calendar' },
      ]
    },
    {
      labelVi: 'Tuyển sinh',
      labelEn: 'Admissions',
      href: '/admissions/process',
      children: [
        { labelVi: 'Quy trình Tuyển sinh & Đăng ký', labelEn: 'Admissions Process Guide', href: '/admissions/process' },
        { labelVi: 'Biểu phí Học phí 2026-2027', labelEn: 'Tuition Fee Structure 2026', href: '/admissions/tuition' },
        { labelVi: 'Chương trình Founding Families (Ưu đãi 30%)', labelEn: 'Founding Families Program', href: '/admissions/founding-families' },
        { labelVi: 'Đăng ký Tham dự Open Day', labelEn: 'Open Day Registration', href: '/admissions/open-day' },
        { labelVi: 'Đặt lịch Tham quan Trường', labelEn: 'Book a Campus Visit', href: '/tour-booking' },
      ]
    },
    {
      labelVi: 'Cộng đồng',
      labelEn: 'Community',
      href: '/community/parent-portal',
      children: [
        { labelVi: 'Cổng thông tin Phụ huynh (Parent Portal)', labelEn: 'Parent Portal & App', href: '/community/parent-portal' },
        { labelVi: 'Bảo vệ an toàn & Y tế học đường', labelEn: 'Health & Safeguarding', href: '/community/health' },
        { labelVi: 'Chính sách An toàn Trẻ em', labelEn: 'Safeguarding Policy', href: '/community/safeguarding' },
      ]
    },
    {
      labelVi: 'Tin tức & Blog',
      labelEn: 'News & Blog',
      href: '/blog'
    },
  ]

  const [navItems, setNavItems] = useState(initialNavItems)

  useEffect(() => {
    async function loadDynamicNavbar() {
      try {
        const res = await fetch('/api/admin/navigation')
        const json = await res.json()
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((item: any) => ({
            labelVi: item.labelVi || item.label_vi || DEFAULT_VI_MAP[item.label || item.title] || item.label || item.title,
            labelEn: item.labelEn || item.label_en || item.label || item.title,
            href: item.href || item.path,
            children: item.children ? item.children.map((c: any) => ({
              labelVi: c.labelVi || c.label_vi || DEFAULT_VI_MAP[c.label || c.title] || c.label || c.title,
              labelEn: c.labelEn || c.label_en || c.label || c.title,
              href: c.href || c.path,
              children: c.children ? c.children.map((sub: any) => ({
                labelVi: sub.labelVi || sub.label_vi || DEFAULT_VI_MAP[sub.label || sub.title] || sub.label || sub.title,
                labelEn: sub.labelEn || sub.label_en || sub.label || sub.title,
                href: sub.href || sub.path
              })) : undefined
            })) : undefined
          }))
          setNavItems(mapped)
        }
      } catch (err) {
        // Fallback to initial static navItems
      }
    }
    loadDynamicNavbar()
  }, [])

  const getItemLabel = (item: any) => {
    if (currentLang === 'vi') {
      if (item.labelVi && item.labelVi !== item.labelEn) return item.labelVi
      if (item.label_vi && item.label_vi !== item.label_en) return item.label_vi
      const key = item.label || item.title || item.labelEn || ''
      return DEFAULT_VI_MAP[key] || item.labelVi || key
    }
    return item.labelEn || item.label_en || item.label || item.title || item.labelVi || ''
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLight
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-neutral-200/80'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3.5'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="flex items-center justify-between gap-2 xl:gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-10 flex-shrink-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Sunshine Maple Bear Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-extrabold text-xs sm:text-sm tracking-tight leading-none uppercase transition-colors whitespace-nowrap ${
                isLight ? 'text-[#1D1D1B]' : 'text-white'
              }`}>
                SUNSHINE MAPLE BEAR
              </span>
              <span className={`text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase transition-colors whitespace-nowrap mt-0.5 ${
                isLight ? 'text-maple-red' : 'text-maple-gold'
              }`}>
                INTERNATIONAL KINDERGARTEN
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 flex-1 justify-center min-w-0">
            {navItems.map((item, idx) => {
              const label = getItemLabel(item)
              const hasChildren = item.children && item.children.length > 0
              const isActive = pathname === item.href || (hasChildren && item.children.some((c: any) => pathname === c.href))

              if (!hasChildren) {
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className={`px-2 py-1 text-[12px] 2xl:text-xs font-semibold transition-all rounded-2xs whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? 'text-maple-red font-bold'
                        : isLight
                        ? 'text-[#1D1D1B] hover:text-maple-red hover:bg-neutral-100/60'
                        : 'text-white hover:text-maple-gold hover:bg-white/10'
                    }`}
                  >
                    {label}
                  </Link>
                )
              }

              return (
                <div key={idx} className="relative group/dropdown flex-shrink-0">
                  <Link
                    href={item.href}
                    className={`px-2 py-1 text-[12px] 2xl:text-xs font-semibold transition-all rounded-2xs whitespace-nowrap flex items-center gap-0.5 ${
                      isActive
                        ? 'text-maple-red font-bold'
                        : isLight
                        ? 'text-[#1D1D1B] hover:text-maple-red hover:bg-neutral-100/60'
                        : 'text-white hover:text-maple-gold hover:bg-white/10'
                    }`}
                  >
                    <span>{label}</span>
                    <ChevronDown size={12} className="transition-transform duration-200 group-hover/dropdown:rotate-180 opacity-70 flex-shrink-0" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-neutral-200 shadow-xl rounded-2xs p-2 opacity-0 translate-y-2 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:pointer-events-auto transition-all duration-200 z-50">
                    {item.children.map((child: any, cIdx: number) => {
                      const childLabel = getItemLabel(child)
                      const isChildActive = pathname === child.href

                      return (
                        <Link
                          key={cIdx}
                          href={child.href}
                          className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-2xs transition-colors ${
                            isChildActive
                              ? 'bg-neutral-100 text-maple-red font-bold'
                              : 'text-neutral-700 hover:bg-[#FDFBF7] hover:text-maple-red'
                          }`}
                        >
                          <span>{childLabel}</span>
                          <ChevronRight size={13} className="opacity-0 group-hover/dropdown:opacity-100 transition-opacity text-neutral-400 flex-shrink-0" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Desktop Right Actions: Language Switcher, Contact & Book Tour Buttons */}
          <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
            <LanguageSwitcher isLight={isLight} />

            <Link
              href="/contact"
              className={`px-2.5 py-1 text-[11px] 2xl:text-xs font-bold uppercase tracking-wider rounded-2xs transition-all border whitespace-nowrap flex-shrink-0 ${
                isLight
                  ? 'border-neutral-300 text-[#1D1D1B] hover:border-maple-red hover:text-maple-red'
                  : 'border-white/30 text-white hover:border-white hover:bg-white/10'
              }`}
            >
              {currentLang === 'vi' ? 'LIÊN HỆ' : 'CONTACT US'}
            </Link>

            <Link
              href="/tour-booking"
              className="px-3 py-1 bg-maple-red hover:bg-red-700 text-white text-[11px] 2xl:text-xs font-bold uppercase tracking-wider rounded-2xs shadow-2xs transition-all transform hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
            >
              {currentLang === 'vi' ? 'ĐẶT LỊCH THAM QUAN' : 'BOOK A TOUR'}
            </Link>
          </div>

          {/* Mobile & Tablet Menu Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden flex-shrink-0">
            <LanguageSwitcher isLight={isLight} />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-2xs transition-colors ${
                isLight ? 'text-[#1D1D1B] hover:bg-neutral-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[62px] bg-white z-40 xl:hidden overflow-y-auto flex flex-col justify-between p-6 animate-fade-in border-t border-neutral-200">
          <div className="space-y-4">
            {navItems.map((item, idx) => {
              const label = getItemLabel(item)
              const hasChildren = item.children && item.children.length > 0
              const isOpen = openMobileMenu === item.href

              if (!hasChildren) {
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2.5 text-base font-bold text-[#1D1D1B] border-b border-neutral-100"
                  >
                    {label}
                  </Link>
                )
              }

              return (
                <div key={idx} className="border-b border-neutral-100 pb-2">
                  <button
                    onClick={() => setOpenMobileMenu(isOpen ? null : item.href)}
                    className="w-full flex items-center justify-between py-2.5 text-base font-bold text-[#1D1D1B]"
                  >
                    <span>{label}</span>
                    <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180 text-maple-red' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="pl-4 space-y-2 pt-1 pb-2">
                      {item.children.map((child: any, cIdx: number) => (
                        <Link
                          key={cIdx}
                          href={child.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 text-sm font-semibold text-neutral-600 hover:text-maple-red"
                        >
                          {getItemLabel(child)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="pt-6 space-y-3 border-t border-neutral-200">
            <Link
              href="/tour-booking"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3 bg-maple-red text-white text-xs font-bold uppercase tracking-wider rounded-2xs flex items-center justify-center gap-2 shadow-2xs"
            >
              <span>{currentLang === 'vi' ? 'ĐẶT LỊCH THAM QUAN' : 'BOOK A TOUR'}</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3 bg-[#1D1D1B] text-white text-xs font-bold uppercase tracking-wider rounded-2xs flex items-center justify-center gap-2"
            >
              <span>{currentLang === 'vi' ? 'LIÊN HỆ' : 'CONTACT US'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
