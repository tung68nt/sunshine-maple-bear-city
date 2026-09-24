'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function CanvaHeroSection() {
  const stats = [
    { number: '15+', label: 'YEARS OF EXCELLENCE' },
    { number: '580+', label: 'YEARS OF EXCELLENCE' },
    { number: '18m', label: 'AUTHENTIC CANADIAN CURRICULUM' },
    { number: '100%', label: 'AUTHENTIC CANADIAN CURRICULUM' },
  ]

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-32 pb-0 overflow-hidden">
      {/* Background Image: Canva hero_bg with warm blurred kindergarten feel */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/canva/hero_bg.png"
          alt="Sunshine Maple Bear International Kindergarten"
          fill
          priority
          className="object-cover object-center filter brightness-[0.72] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#7B181B]/80" />
      </div>

      {/* Main Hero Typography */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto my-auto py-12">
        <h1 className="font-canva-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[0.06em] text-white uppercase font-normal leading-[1.08] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
          Sunshine Maple Bear
        </h1>
        <p className="font-canva-heading text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-[0.16em] text-white uppercase font-light mt-3 sm:mt-5 drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]">
          International Kindergarten
        </p>

        {/* Ghost CTA Button with Gold/Bronze Border */}
        <div className="mt-8 sm:mt-12">
          <Link
            href="/about"
            className="inline-block px-10 sm:px-14 py-2.5 text-xs sm:text-sm font-serif tracking-[0.2em] uppercase text-white border border-[#C5A059] hover:bg-[#C5A059] hover:text-[#2A0808] transition-all duration-300 rounded-none shadow-sm"
          >
            About Us
          </Link>
        </div>
      </div>

      {/* Bottom Metric Stat Badges Bar */}
      <div className="w-full bg-[#7B181B] border-t border-[#C5A059]/70 py-6 sm:py-8 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <span className="font-canva-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#D4AF37] tracking-tight leading-none">
                {stat.number}
              </span>
              <span className="text-[10px] sm:text-xs font-serif tracking-[0.18em] uppercase text-[#E5D5BC] font-normal mt-2 leading-relaxed">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
