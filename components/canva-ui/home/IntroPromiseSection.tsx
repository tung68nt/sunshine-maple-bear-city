'use client'

import React from 'react'
import Image from 'next/image'

export function CanvaIntroPromiseSection() {
  return (
    <section className="bg-[#FAF6EF] py-0 text-[#2B2321] overflow-hidden">
      {/* Introduction Block: Full-width background photo with floating ivory card on the left */}
      <div className="relative w-full min-h-[500px] lg:min-h-[560px] flex items-center overflow-hidden">
        {/* Background Image: Canva classroom_reception spanning full width */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/canva/classroom_reception.png"
            alt="Sunshine Maple Bear Reception and Learning Space"
            fill
            priority
            className="object-cover object-center filter brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        {/* Floating Ivory Card on the Left */}
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 py-12 lg:py-16">
          <div className="max-w-md lg:max-w-lg bg-[#FAF6EF]/95 backdrop-blur-sm p-8 sm:p-12 shadow-2xl relative border-b-4 border-[#8B1B1E]">
            <h2 className="font-canva-heading text-2xl sm:text-3xl lg:text-4xl tracking-[0.14em] text-[#8B1B1E] uppercase font-normal mb-5">
              Introduction
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#332C2B] leading-relaxed font-light">
              Sunshine Maple Bear Hanoi offers an authentic 100% Canadian English immersion environment designed to cultivate creativity, compassion, and global confidence inside Sunshine City.
            </p>
          </div>
        </div>

        {/* Delicate Gold Accent Bar on Right Edge */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-48 h-[2px] bg-[#C5A059]" />
      </div>

      {/* Our Promise Block */}
      <div className="bg-[#FAF6EF] py-20 sm:py-28 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        {/* Framing Gold Horizontal Bars */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="h-[1.5px] w-16 sm:w-24 bg-[#C5A059]" />
          <span className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#554D4B] uppercase font-medium">
            Our Promise
          </span>
          <div className="h-[1.5px] w-16 sm:w-24 bg-[#C5A059]" />
        </div>

        {/* Promise Headline: SAFE. NURTURING. INSPIRING */}
        <h3 className="font-canva-heading text-3xl sm:text-5xl md:text-6xl tracking-[0.06em] uppercase font-normal">
          <span className="text-[#2B2321]">Safe. Nurturing. </span>
          <span className="text-[#8B1B1E]">Inspiring</span>
        </h3>

        {/* Quote */}
        <blockquote className="mt-6 text-base sm:text-xl md:text-2xl font-serif italic text-[#554D4B] max-w-2xl mx-auto leading-relaxed font-light">
          “A place where children are protected, supported <br className="hidden sm:inline" />
          and empowered to grow.”
        </blockquote>
      </div>
    </section>
  )
}
