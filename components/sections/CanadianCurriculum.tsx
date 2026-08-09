'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

const curriculumPillars = [
  { num: '01', title: 'Top Global Ranking', desc: 'Canada’s education system consistently ranks among the best in PISA world assessments.' },
  { num: '02', title: 'Official Canadian Curriculum', desc: 'Designed to develop children academic, social, emotional and physical well-being.' },
  { num: '03', title: 'Bilingual Immersion', desc: '100% English environment nurturing natural fluency from early childhood.' },
  { num: '04', title: 'Global Academic Pathway', desc: 'Seamless progression into top international primary and secondary schools.' }
]

export function CanadianCurriculum() {
  return (
    <section id="curriculum" className="py-24 lg:py-32 bg-[#FDFBF7] relative border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs font-display font-black text-maple-red uppercase tracking-[0.2em]">03 / ACADEMICS</span>
          <div className="h-[1px] bg-neutral-300 flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Sharp Image Frame (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="border border-neutral-300 bg-white p-3 shadow-lg">
              <div className="relative h-[440px] sm:h-[500px] overflow-hidden bg-neutral-900">
                <Image
                  src={SCHOOL_IMAGES.render.lopHoc1}
                  alt="The Maple Bear Canadian Curriculum"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Official Stamp Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 border border-neutral-200 text-[#1D1D1B] space-y-1">
                  <span className="text-[10px] font-display font-black uppercase tracking-widest text-maple-red block">
                    CANADIAN EMBASSY STANDARD
                  </span>
                  <h4 className="text-sm font-display font-bold">
                    Official Canadian Curriculum Implementation
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Features (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1D1D1B] leading-tight">
                The Maple Bear <span className="font-serif italic font-normal text-maple-red">Canadian Curriculum</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
                Canada’s education system consistently ranks among the best in the world. Our Program is based on the Official Canadian Curriculum, designed to develop children's academic, social, emotional and physical well-being in the early year.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-neutral-200 pt-6">
              {curriculumPillars.map((item, idx) => (
                <div key={idx} className="space-y-1 border-l-2 border-maple-red pl-4">
                  <span className="text-[10px] font-display font-extrabold text-maple-gold uppercase tracking-widest block">
                    {item.num} / FEATURE
                  </span>
                  <h3 className="text-base font-display font-bold text-[#1D1D1B]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Sharp Action Button */}
            <div className="pt-2">
              <Link
                href="/academics/age-groups"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1D1D1B] text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-maple-red transition-colors border border-[#1D1D1B]"
              >
                <span>Learn More</span>
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
