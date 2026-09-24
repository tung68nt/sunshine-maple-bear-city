'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, ChevronDown, ChevronRight, Menu } from 'lucide-react'

interface CanvaDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CanvaDrawer({ isOpen, onClose }: CanvaDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (name: string) => {
    setExpandedSection(expandedSection === name ? null : name)
  }

  const menuItems = [
    {
      title: 'About us',
      href: '/about',
      subItems: [
        { label: 'Our Story & Canadian Heritage', href: '/about/story' },
        { label: 'Why Choose Maple Bear?', href: '/about/why-maple-bear' },
        { label: 'Academic Leadership', href: '/about/leadership' },
        { label: 'Educators & Staff', href: '/about/teachers' },
      ],
    },
    {
      title: 'Admission',
      href: '/admissions',
      subItems: [
        { label: 'Admissions Process', href: '/admissions/process' },
        { label: 'Tuition Fee Structure', href: '/admissions/tuition' },
        { label: 'Founding Families 30%', href: '/admissions/founding-families' },
        { label: 'Book a Campus Visit', href: '/tour-booking' },
      ],
    },
    {
      title: 'Academic',
      href: '/academics',
      subItems: [
        { label: 'Early Childhood Programs', href: '/academics/age-groups' },
        { label: 'Daily Timetable & Schedule', href: '/academics/daily-schedule' },
        { label: 'Nutrition & Meal Program', href: '/academics/nutrition' },
        { label: 'Academic Calendar', href: '/academics/calendar' },
      ],
    },
    {
      title: 'Curriculum',
      href: '/academics/age-groups',
      subItems: [
        { label: 'Canadian Early Childhood System', href: '/academics/age-groups' },
        { label: 'English Immersion Method', href: '/about/why-maple-bear' },
        { label: 'STEAM & Holistic Learning', href: '/academics' },
      ],
    },
    {
      title: 'New',
      href: '/blog',
      subItems: [
        { label: 'School Announcements', href: '/blog' },
        { label: 'Upcoming Events', href: '/events' },
        { label: 'Parent Guides & Articles', href: '/blog' },
      ],
    },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto border-l border-[#C5A059]/30 transition-transform">
        {/* Header inside drawer */}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between pb-6 border-b border-[#E8E4DF]">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <Image 
                src="/images/logo-canva.png" 
                alt="Sunshine Maple Bear" 
                width={140} 
                height={50} 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-[#332C2B] hover:text-[#8B1B1E] transition-colors rounded-full hover:bg-black/5"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar - Underline style as in Canva */}
          <div className="mt-6 relative">
            <div className="flex items-center border-b border-[#8B1B1E]/40 pb-2 focus-within:border-[#8B1B1E] transition-colors">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[#332C2B] placeholder-[#665E5C]/60 text-base outline-none pr-8 font-sans"
              />
              <Search className="w-5 h-5 text-[#8B1B1E] cursor-pointer" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-4">
            {menuItems.map((item) => (
              <div key={item.title} className="border-b border-[#E8E4DF]/60 pb-3">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-canva-heading text-2xl text-[#2B2321] hover:text-[#8B1B1E] tracking-wide transition-colors"
                  >
                    {item.title}
                  </Link>
                  <button
                    onClick={() => toggleSection(item.title)}
                    className="p-1 text-[#665E5C] hover:text-[#8B1B1E]"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        expandedSection === item.title ? 'rotate-180 text-[#8B1B1E]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Sub items dropdown */}
                {expandedSection === item.title && (
                  <ul className="mt-3 pl-4 space-y-2 border-l-2 border-[#C5A059]/40 py-1">
                    {item.subItems.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          onClick={onClose}
                          className="text-sm font-sans text-[#665E5C] hover:text-[#8B1B1E] flex items-center gap-1.5 transition-colors"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          {/* Quick Action in Drawer */}
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/tour-booking"
              onClick={onClose}
              className="text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider border border-[#8B1B1E] text-[#8B1B1E] hover:bg-[#8B1B1E] hover:text-white transition-all rounded-xs"
            >
              Book a visit
            </Link>
            <Link
              href="/admissions/founding-families"
              onClick={onClose}
              className="text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-[#8B1B1E] text-white hover:bg-[#6C1417] transition-all rounded-xs shadow-xs"
            >
              Register interest (30% Off)
            </Link>
          </div>
        </div>

        {/* Watermark Bear at Bottom Right (from Canva design page 2) */}
        <div className="p-6 relative overflow-hidden pointer-events-none opacity-20 flex justify-end">
          <Image
            src="/images/logo-canva.png"
            alt="Maple Bear Watermark"
            width={200}
            height={150}
            className="w-40 h-auto grayscale contrast-200"
          />
        </div>
      </div>
    </div>
  )
}
