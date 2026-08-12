'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { ArrowRight, BookOpen, Palette, Calculator, Compass } from 'lucide-react'

const curriculumPillars = [
  { icon: BookOpen, title: 'Language & Literacy', desc: 'Bilingual immersion & storytelling' },
  { icon: Palette, title: 'Creative Arts', desc: 'Music, drama & visual expression' },
  { icon: Calculator, title: 'Math & Logic', desc: 'Hands-on problem solving' },
  { icon: Compass, title: 'Science & Discovery', desc: 'Curiosity-driven exploration' },
]

export function CanadianCurriculum() {
  return (
    <section id="curriculum" className="py-14 lg:py-18 bg-[#FDFBF7] relative border-b border-neutral-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Text Content & Pillars Badges (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-display font-extrabold uppercase tracking-[0.25em] text-[#9E1B1E] block">
              A CANADIAN CURRICULUM
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#332C2B] leading-tight">
              The Maple Bear <span className="text-[#9E1B1E]">Canadian Curriculum</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#554D4B] font-light leading-relaxed">
              Canada’s education system consistently ranks among the best in the world. Our Program is based on the Official Canadian Curriculum, designed to develop children&apos;s academic, social, emotional and physical well-being in the early years.
            </p>

            {/* 4 Curriculum Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {curriculumPillars.map((p, idx) => {
                const IconComponent = p.icon
                return (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-full bg-red-50 text-[#9E1B1E] flex items-center justify-center flex-shrink-0">
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h3 className="text-xs font-serif font-bold text-neutral-900">{p.title}</h3>
                      <p className="text-[10px] text-neutral-500 font-light">{p.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/academics/age-groups"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#9E1B1E] hover:bg-[#801316] text-white text-xs font-sans font-semibold rounded-full shadow-md transition-all group"
              >
                <span>Learn More</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Large Rounded Photo (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[400px] sm:h-[460px] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group">
              <Image
                src={SCHOOL_IMAGES.render.lopHoc1}
                alt="Teacher and children learning with Canadian curriculum"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
