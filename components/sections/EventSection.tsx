'use client'

import Image from 'next/image'
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'

export function EventSection() {
  return (
    <section id="event" className="py-14 lg:py-18 bg-[#FDFBF7] relative border-b border-neutral-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Event Card matching Picture1.png: Warm cream container rounded-3xl */}
        <div className="bg-[#FAF4EB] rounded-3xl p-6 sm:p-10 lg:p-12 border border-neutral-200/60 shadow-xs relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Overline, Title Open Day, Description, Register Button (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-display font-extrabold uppercase tracking-[0.25em] text-[#9E1B1E] block">
                JOIN US FOR
              </span>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#332C2B] leading-tight">
                Open Day
              </h2>

              <p className="text-xs sm:text-sm text-[#554D4B] font-light leading-relaxed">
                Experience the Maple Bear difference. Meet our teachers, explore our campus and discover our learning environment.
              </p>

              <div className="pt-2">
                <a
                  href="#contact-us"
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#9E1B1E] hover:bg-[#801316] text-white font-sans font-semibold text-xs rounded-full shadow-md transition-all"
                >
                  <span>Register Now</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Center Column: Child Photo with painted hands (Picture1.png matching) (3 cols) */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden bg-white shadow-md border-2 border-white">
                <Image
                  src="/teacher_ha_1778697972076.png"
                  alt="Child with painted hands"
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
            </div>

            {/* Right Column: White Info Card (Date, Time, Location) (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-50 text-[#9E1B1E] flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} />
                </div>
                <div className="text-xs font-sans text-[#332C2B] font-semibold">
                  Saturday, 22 August 2026
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-50 text-[#C5A059] flex items-center justify-center flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div className="text-xs font-sans text-[#332C2B] font-semibold">
                  9:00 AM – 12:00 PM
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-red-50 text-[#9E1B1E] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div className="text-xs font-sans text-[#332C2B] font-semibold leading-snug">
                  S4 Building, Sunshine City, Nam Thang Long Urban Area, Phu Thuong Ward, Hanoi
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
