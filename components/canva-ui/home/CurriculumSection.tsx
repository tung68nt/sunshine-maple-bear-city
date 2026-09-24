'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, Lightbulb, Cpu, Atom } from 'lucide-react'

export function CanvaCurriculumSection() {
  const domains = [
    {
      title: 'Language & Literacy',
      subtitle: 'Bilingual immersion & storytelling',
      icon: Globe,
    },
    {
      title: 'Creative Arts',
      subtitle: 'Music, drama & visual expression',
      icon: Lightbulb,
    },
    {
      title: 'Math & Logic',
      subtitle: 'Hands-on problem solving',
      icon: Cpu,
    },
    {
      title: 'Science & Discovery',
      subtitle: 'Curiosity-driven exploration',
      icon: Atom,
    },
  ]

  return (
    <section className="bg-[#8B1B1E] text-white py-0 overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column (8 cols): Title, Button, Background Image & Overlapping Kid Photo */}
        <div className="lg:col-span-8 p-8 sm:p-14 lg:p-20 relative flex flex-col justify-between">
          {/* Header Block with Line */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-14 bg-white" />
              <h2 className="font-canva-heading text-3xl sm:text-5xl lg:text-6xl tracking-[0.06em] uppercase font-normal leading-tight">
                <span className="text-[#C5A059] block">A Canadian</span>
                <span className="text-white block">Curriculum</span>
              </h2>
            </div>

            <div>
              <Link
                href="/academics"
                className="inline-block px-6 py-2 text-xs font-serif uppercase tracking-[0.15em] border border-white text-white hover:bg-white hover:text-[#8B1B1E] transition-all rounded-none"
              >
                Find out more
              </Link>
            </div>
          </div>

          {/* Photos Container with Overlapping Children Image */}
          <div className="relative mt-12 sm:mt-16 w-full">
            {/* Background Classroom Image */}
            <div className="relative h-64 sm:h-80 lg:h-96 w-full shadow-lg overflow-hidden">
              <Image
                src="/images/canva/classroom_reception.png"
                alt="Canadian Early Childhood Center"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Overlapping Kids Image with White Frame */}
            <div className="absolute -top-16 right-4 sm:right-12 w-48 sm:w-64 lg:w-72 aspect-square shadow-2xl border-4 border-white z-10 overflow-hidden">
              <Image
                src="/images/canva/kids_expressions.png"
                alt="Children making playful expressions in class"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Golden-Tan Vertical Stack */}
        <div className="lg:col-span-4 bg-[#C89B4A] p-8 sm:p-12 lg:p-16 text-[#2B2321] flex flex-col justify-center space-y-10 sm:space-y-12">
          {domains.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="flex items-start gap-5">
                <div className="p-2 border border-[#8B1B1E]/40 text-[#8B1B1E] rounded-full shrink-0 mt-0.5">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-canva-heading text-xl sm:text-2xl text-[#2B2321] uppercase tracking-wide font-normal">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[#4A3E3B] mt-1 font-light leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
