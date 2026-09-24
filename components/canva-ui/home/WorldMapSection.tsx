'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function CanvaWorldMapSection() {
  const stats = [
    { number: '15+', label: 'YEARS OF EXCELLENCE' },
    { number: '500+', label: 'SCHOOLS IN OPERATION' },
    { number: '70,000+', label: 'STUDENTS ENROLLED' },
    { number: '37+', label: 'COUNTRIES' },
  ]

  return (
    <section className="bg-[#FAF6EF] py-16 sm:py-24 text-[#2B2321] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* World Map & Right Numbers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Canva World Map Image */}
          <div className="lg:col-span-8 relative flex items-center justify-center">
            <div className="relative w-full aspect-[2/1] overflow-hidden">
              <Image
                src="/images/canva/world_map.png"
                alt="Maple Bear Global Map with Country Locations"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Right Column: 4 Big Numbers */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6 sm:space-y-8 pl-0 lg:pl-8 text-center lg:text-left">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="font-canva-heading text-5xl sm:text-6xl lg:text-7xl text-[#8B1B1E] font-light tracking-tight leading-none">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-serif tracking-[0.16em] uppercase text-[#332C2B] font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Centered Title & Narrative */}
        <div className="mt-16 sm:mt-24 text-center max-w-3xl mx-auto space-y-5">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1.5px] w-14 sm:w-24 bg-[#8B1B1E]" />
            <h2 className="font-canva-heading text-2xl sm:text-3xl lg:text-4xl tracking-[0.1em] text-[#8B1B1E] uppercase font-normal">
              Maple Bear Around The World
            </h2>
            <div className="h-[1.5px] w-14 sm:w-24 bg-[#8B1B1E]" />
          </div>

          <p className="text-sm sm:text-base font-sans text-[#554D4B] leading-relaxed font-light">
            Maple Bear is part of a global network of schools in over 37 countries, sharing a commitment to educational excellence.
          </p>

          <div className="pt-2">
            <Link
              href="/about/why-maple-bear"
              className="inline-block px-8 py-2 text-xs font-serif uppercase tracking-[0.2em] border border-neutral-700 text-neutral-800 hover:bg-[#8B1B1E] hover:text-white hover:border-[#8B1B1E] transition-all rounded-none"
            >
              Find out more
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
