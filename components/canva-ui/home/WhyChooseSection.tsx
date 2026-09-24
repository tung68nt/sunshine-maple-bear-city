'use client'

import React from 'react'
import Image from 'next/image'

export function CanvaWhyChooseSection() {
  const pillars = [
    { number: '01', title: 'Official Canadian Curriculum', isRed: false },
    { number: '02', title: 'Caring International Educators', isRed: false },
    { number: '03', title: 'Safe & Engaging Campus', isRed: false },
    { number: '04', title: 'Holistic Growth', isRed: true },
  ]

  return (
    <section className="bg-[#FAF6EF] py-0 text-[#2B2321] overflow-hidden">
      {/* Top Part: Asymmetrical 3-Column Header Grid */}
      <div className="max-w-[1400px] mx-auto pt-20 sm:pt-28 px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Column 1: Teacher & child photo */}
          <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] shadow-md overflow-hidden">
            <Image
              src="/images/canva/teacher_child_1.png"
              alt="Teacher and child in circle time"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Column 2: Stack of 2 framed photos */}
          <div className="lg:col-span-3 border-4 border-[#8B1B1E] bg-[#8B1B1E] p-1.5 space-y-1.5 shadow-md">
            <div className="relative h-44 sm:h-52 w-full overflow-hidden">
              <Image
                src="/images/canva/child_net.png"
                alt="Child playing in net"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="relative h-44 sm:h-52 w-full overflow-hidden">
              <Image
                src="/images/canva/teacher_child_2.png"
                alt="Teacher showing weather wheel"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Column 3: Title & Narrative */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h2 className="font-canva-heading text-3xl sm:text-4xl lg:text-[2.75rem] tracking-[0.06em] uppercase font-normal leading-[1.15]">
                <span className="text-[#2B2321] block">Why Families Choose</span>
                <span className="text-[#8B1B1E] block">Maple Bear</span>
              </h2>
              {/* Red Line Divider */}
              <div className="h-1 bg-[#8B1B1E] w-3/4 mt-4" />
            </div>

            <p className="text-sm sm:text-base font-sans text-[#554D4B] leading-relaxed font-light">
              At Sunshine Maple Bear International Kindergarten, every day is designed to inspire curiosity, build confidence and nurture a lifelong love of learning.
            </p>
            <p className="text-sm sm:text-base font-sans text-[#554D4B] leading-relaxed font-light">
              Through the Maple Bear Canadian Curriculum, caring educators and a safe, engaging environment, children are supported to grow academically, socially and emotionally.
            </p>
          </div>
        </div>
      </div>

      {/* Gold/Bronze Solid Horizontal Band */}
      <div className="w-full h-12 sm:h-16 bg-[#C5A059] mt-12" />

      {/* Bottom Part: 4 Numbered Pillars & Dance Studio Photo */}
      <div className="max-w-[1400px] mx-auto py-16 sm:py-24 px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 4 Numbered Pillars with Black Hairline Divider */}
          <div className="lg:col-span-6 pl-6 sm:pl-8 border-l-2 border-[#2B2321] space-y-8 sm:space-y-10">
            {pillars.map((pillar) => (
              <div key={pillar.number} className="flex items-center gap-6 group">
                <span
                  className={`font-canva-heading text-5xl sm:text-6xl font-light tracking-tight leading-none ${
                    pillar.isRed ? 'text-[#8B1B1E]' : 'text-[#C5A059]'
                  }`}
                  style={!pillar.isRed ? { WebkitTextStroke: '1px #C5A059', color: 'transparent' } : undefined}
                >
                  {pillar.number}
                </span>
                <span className="font-canva-heading text-2xl sm:text-3xl text-[#2B2321] font-normal tracking-wide">
                  {pillar.title}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Tall Dance Studio Photo */}
          <div className="lg:col-span-6 relative h-[480px] sm:h-[560px] shadow-lg overflow-hidden">
            <Image
              src="/images/canva/dance_studio.png"
              alt="Dance and movement studio at Sunshine Maple Bear"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
