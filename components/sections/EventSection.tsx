'use client'

import { Calendar, MapPin, ArrowRight } from 'lucide-react'

export function EventSection() {
  return (
    <section id="event" className="py-24 lg:py-32 bg-[#FDFBF7] relative border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs font-display font-black text-maple-red uppercase tracking-[0.2em]">05 / INVITATION</span>
          <div className="h-[1px] bg-neutral-300 flex-1" />
        </div>

        <div className="bg-[#1D1D1B] text-white p-8 sm:p-12 lg:p-16 border border-[#1D1D1B] shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left: Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-display font-extrabold uppercase tracking-[0.25em] text-maple-gold block">
                SPECIAL INVITATION FOR FAMILIES
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
                Join Us For <span className="font-serif italic font-normal text-amber-200">Open Day</span>
              </h2>

              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
                Experience the Maple Bear difference. Meet our teachers, explore our campus and discover our learning enviroment.
              </p>

              {/* Line Details */}
              <div className="space-y-4 pt-4 border-t border-white/15">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-maple-gold text-maple-gold flex items-center justify-center flex-shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">Date & Time</span>
                    <span className="text-base font-display font-bold text-white">Saturday, 22 August 2026</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-maple-red text-maple-red flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">Venue Location</span>
                    <span className="text-sm font-display font-medium text-white leading-snug block">
                      S4 Building, Sunshine City, Nam Thang Long Urban Area, Phu Thuong Ward, Hanoi
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Registration Box (5 cols) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/15 p-8 space-y-6 text-center">
              <span className="text-[10px] font-display font-extrabold uppercase tracking-widest text-maple-gold block">
                ADMISSIONS 2026
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                Reserve Your Spot
              </h3>
              <p className="text-xs text-neutral-300 font-light">
                Register in advance to receive personalized guidance and tour scheduling.
              </p>
              <a
                href="#contact-us"
                className="inline-flex items-center justify-center gap-3 w-full py-4 bg-maple-red text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-colors border border-maple-red"
              >
                <span>Register Now</span>
                <ArrowRight size={16} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
