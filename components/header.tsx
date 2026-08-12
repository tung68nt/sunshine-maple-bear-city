'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Calendar, Edit3, Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState<'vi' | 'en'>('en')
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  useEffect(() => {
    const saved = (localStorage.getItem('smb_site_lang') as 'vi' | 'en') || 'en'
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
    { labelVi: 'Trang chủ', labelEn: 'Home', href: '/' },
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
    { labelVi: 'Tin tức & Blog', labelEn: 'News & Blog', href: '/blog' },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-neutral-200/50 py-3 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="flex items-center justify-between gap-3 xl:gap-6">
          
          {/* Brand Logo (Picture1.png spec: Logo Bear + Maple Bear International Kindergarten) */}
          <Link href="/" className="flex items-center gap-3 group relative z-10 flex-shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Maple Bear Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg tracking-tight leading-none text-[#9E1B1E] whitespace-nowrap">
                Maple Bear
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans font-medium tracking-wider text-[#332C2B] whitespace-nowrap mt-0.5">
                International Kindergarten
              </span>
            </div>
          </Link>

          {/* Desktop Inline Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-shrink-0" aria-label="Desktop Main Navigation">
            {navItems.map((item, idx) => {
              const label = getItemLabel(item)
              const hasChildren = item.children && item.children.length > 0

              return (
                <div
                  key={idx}
                  className="relative group/nav flex-shrink-0"
                  onMouseEnter={() => setActiveDropdown(idx)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-xs xl:text-sm font-sans font-semibold text-[#332C2B] hover:text-[#9E1B1E] py-2 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <span className="whitespace-nowrap">{label}</span>
                    {hasChildren && <ChevronDown size={14} className="text-neutral-400 group-hover/nav:text-[#9E1B1E] transition-transform group-hover/nav:rotate-180 flex-shrink-0" />}
                  </Link>

                  {/* Dropdown Menu for Desktop */}
                  {hasChildren && activeDropdown === idx && (
                    <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200/80 p-3 space-y-1 z-50 animate-fade-in">
                      {item.children.map((child: any, cIdx: number) => (
                        <Link
                          key={cIdx}
                          href={child.href}
                          className="block px-3 py-2 text-xs font-sans text-[#332C2B] hover:text-[#9E1B1E] hover:bg-red-50/50 rounded-xl transition-colors font-medium"
                        >
                          {getItemLabel(child)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Desktop Action Pill Buttons + Language Switcher at the VERY END */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            {/* 1. Book a Tour (Red Pill) */}
            <a
              href="#contact-us"
              className="px-4 py-2 bg-[#9E1B1E] hover:bg-[#801316] text-white text-xs font-sans font-semibold rounded-full shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calendar size={13} />
              <span>{currentLang === 'vi' ? 'ĐẶT LỊCH THAM QUAN' : 'Book a Tour'}</span>
            </a>

            {/* 2. Apply Now (Gold Pill) */}
            <a
              href="#contact-us"
              className="px-4 py-2 bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-sans font-semibold rounded-full shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Edit3 size={13} />
              <span>{currentLang === 'vi' ? 'ĐĂNG KÝ HỌC' : 'Apply Now'}</span>
            </a>

            {/* 3. Compact Language Switcher at the END of the row */}
            <LanguageSwitcher isLight={true} />
          </div>

          {/* Mobile & Tablet Header Controls */}
          <div className="flex items-center gap-2 lg:hidden flex-shrink-0">
            <LanguageSwitcher isLight={true} />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 bg-[#9E1B1E] text-white rounded-full flex items-center justify-center shadow-xs"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Dynamic CMS Navigation Drawer Modal for Mobile / Tablet */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[68px] bg-[#FDFBF7] z-50 overflow-y-auto flex flex-col justify-between p-6 sm:p-10 border-t border-neutral-200 animate-fade-in lg:hidden">
          <div className="max-w-4xl mx-auto w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {navItems.map((item, idx) => {
                const label = getItemLabel(item)
                return (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs space-y-3">
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-serif font-bold text-[#9E1B1E] hover:underline flex items-center justify-between"
                    >
                      <span>{label}</span>
                      <ChevronRight size={18} />
                    </Link>

                    {item.children && (
                      <div className="space-y-2 pt-2 border-t border-neutral-100">
                        {item.children.map((child: any, cIdx: number) => (
                          <Link
                            key={cIdx}
                            href={child.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-xs font-sans text-neutral-600 hover:text-[#9E1B1E] transition-colors"
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
          </div>

          <div className="max-w-4xl mx-auto w-full pt-8 flex flex-wrap gap-4 justify-center border-t border-neutral-200">
            <a
              href="#contact-us"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-3 bg-[#9E1B1E] text-white font-sans text-xs font-semibold rounded-full flex items-center gap-2 shadow-md"
            >
              <Calendar size={16} />
              <span>{currentLang === 'vi' ? 'ĐẶT LỊCH THAM QUAN' : 'Book a Tour'}</span>
            </a>
            <a
              href="#contact-us"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-3 bg-[#C5A059] text-white font-sans text-xs font-semibold rounded-full flex items-center gap-2 shadow-md"
            >
              <Edit3 size={16} />
              <span>{currentLang === 'vi' ? 'ĐĂNG KÝ HỌC' : 'Apply Now'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
