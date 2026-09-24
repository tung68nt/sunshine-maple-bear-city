'use client'

import React from 'react'
import Image from 'next/image'

export function CanvaHeadMessageSection() {
  return (
    <section className="bg-[#8B1B1E] text-white py-20 sm:py-24 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-sm font-sans tracking-[0.25em] text-[#C5A059] uppercase font-semibold block">
              Ms Jennifer
            </span>
            <h2 className="font-canva-heading text-3xl sm:text-5xl lg:text-[3.25rem] tracking-[0.06em] uppercase font-normal leading-[1.15]">
              Message from Head of School
            </h2>
            <blockquote className="pt-6 text-base sm:text-xl font-serif italic text-white/95 leading-relaxed font-light">
              “Children thrive when high expectations are matched by warmth, consistency and genuine care. My responsibility as a school leader is to build an environment where every child is known, every educator is empowered and every family is a trusted partner.”
            </blockquote>
          </div>

          {/* Right Portrait Image: Ms. Jennifer exact Canva photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 sm:w-80 aspect-[3/4] shadow-2xl overflow-hidden">
              <Image
                src="/images/canva/ms_jennifer.png"
                alt="Ms. Jennifer - Head of School"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
