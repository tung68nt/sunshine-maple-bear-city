'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function CanvaFacilitiesSection() {
  const allFacilities = [
    {
      title: 'Classroom',
      image: '/images/canva/classroom_tables.png',
    },
    {
      title: 'Library',
      image: '/images/canva/library_wide.png',
    },
    {
      title: 'Dance Studio',
      image: '/images/canva/dance_studio.png',
    },
    {
      title: 'Play Area',
      image: '/images/canva/play_hall.png',
    },
  ]

  const [startIndex, setStartIndex] = useState(0)

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? allFacilities.length - 4 : prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev >= allFacilities.length - 4 ? 0 : prev + 1))
  }

  const visibleItems = allFacilities.slice(startIndex, startIndex + 4)

  return (
    <section className="bg-[#FAF6EF] py-20 sm:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Title with Cursive 'Overview' Overlapping */}
        <div className="text-center mb-14 relative inline-block w-full">
          <h2 className="font-canva-heading text-4xl sm:text-6xl lg:text-7xl tracking-[0.06em] text-[#8B1B1E] uppercase font-normal inline-block relative">
            Campus & Facilities
            <span className="font-canva-script lowercase text-5xl sm:text-7xl lg:text-8xl text-[#C5A059] absolute -bottom-5 -right-8 sm:-right-16 pointer-events-none transform -rotate-6">
              Overview
            </span>
          </h2>
        </div>

        {/* 4 Photo Carousel Container with Left/Right Arrows */}
        <div className="relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {visibleItems.map((item, idx) => (
              <div
                key={idx}
                className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden shadow-md group"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                {/* Red Gradient Shadow at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B1B1E]/90 via-[#8B1B1E]/20 to-transparent" />

                {/* Gold Serif Label Centered at Bottom */}
                <div className="absolute bottom-5 inset-x-0 text-center">
                  <span className="font-canva-heading text-xl sm:text-2xl lg:text-3xl text-[#D4AF37] font-normal tracking-wide drop-shadow-sm">
                    {item.title}
                  </span>
                </div>

                {/* Left Arrow on First Visible Item */}
                {idx === 0 && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-[#C5A059] transition-colors z-20 drop-shadow-md"
                    aria-label="Previous facilities"
                  >
                    <ChevronLeft className="w-8 sm:w-12 h-8 sm:h-12 stroke-[2.5]" />
                  </button>
                )}

                {/* Right Arrow on Last Visible Item */}
                {idx === visibleItems.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-[#C5A059] transition-colors z-20 drop-shadow-md"
                    aria-label="Next facilities"
                  >
                    <ChevronRight className="w-8 sm:w-12 h-8 sm:h-12 stroke-[2.5]" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
