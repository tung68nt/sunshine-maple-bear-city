'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CanvaDrawer } from './CanvaDrawer'

export function CanvaHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [lang, setLang] = useState<'EN' | 'VI'>('EN')
  const [showLangMenu, setShowLangMenu] = useState(false)

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-40 bg-transparent py-5 px-6 sm:px-12">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo: Cute Bear Mascot reading book with Canadian flag */}
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <Image
              src="/images/canva/bear_mascot.png"
              alt="Maple Bear Canadian School"
              width={75}
              height={85}
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-md"
              priority
            />
          </Link>

          {/* Action Buttons & Navigation Tools */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Button 1: Book a visit */}
            <Link
              href="/tour-booking"
              className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-serif tracking-[0.1em] text-white border border-white/90 hover:bg-white hover:text-[#8B1B1E] transition-all rounded-none uppercase"
            >
              Book a visit
            </Link>

            {/* Button 2: General enquiries */}
            <a
              href="#contact-section"
              className="hidden md:inline-block px-4 sm:px-6 py-2 text-xs sm:text-sm font-serif tracking-[0.1em] text-white border border-white/90 hover:bg-white hover:text-[#8B1B1E] transition-all rounded-none uppercase"
            >
              Genaral enquiries
            </a>

            {/* Button 3: Register interest */}
            <Link
              href="/admissions/founding-families"
              className="hidden sm:inline-block px-4 sm:px-6 py-2 text-xs sm:text-sm font-serif tracking-[0.1em] text-white border border-white/90 hover:bg-white hover:text-[#8B1B1E] transition-all rounded-none uppercase"
            >
              Register interest
            </Link>

            {/* Language Selector: EN ↓ */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-serif tracking-[0.1em] uppercase py-1 px-2 hover:text-[#C5A059] transition-colors"
              >
                <span>{lang}</span>
                <span className="text-sm leading-none">↓</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-28 bg-[#2A0808]/95 border border-[#C5A059]/40 shadow-xl py-1 z-50 text-white">
                  <button
                    onClick={() => {
                      setLang('EN')
                      setShowLangMenu(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-serif ${lang === 'EN' ? 'text-[#C5A059] font-bold' : ''}`}
                  >
                    EN (English)
                  </button>
                  <button
                    onClick={() => {
                      setLang('VI')
                      setShowLangMenu(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-serif ${lang === 'VI' ? 'text-[#C5A059] font-bold' : ''}`}
                  >
                    VI (Tiếng Việt)
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger Icon (Three horizontal bars as in Canva) */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-1 text-white hover:text-[#C5A059] transition-colors focus:outline-none ml-1 flex flex-col justify-center gap-1.5"
              aria-label="Open menu"
            >
              <span className="w-7 h-[2.5px] bg-white block" />
              <span className="w-7 h-[2.5px] bg-white block" />
              <span className="w-7 h-[2.5px] bg-white block" />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <CanvaDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}
