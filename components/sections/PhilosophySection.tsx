'use client'

import { Heart, Lightbulb, Sprout, Users, Globe } from 'lucide-react'

const philosophyValues = [
  {
    title: 'We Care',
    desc: 'We foster a safe, nurturing environment where every child feels valued and respected.',
    icon: Heart,
  },
  {
    title: 'We Explore',
    desc: 'Curiosity drives learning as children discover the world through meaningful experiences.',
    icon: Lightbulb,
  },
  {
    title: 'We Grow',
    desc: 'We build confidence, resilience and independence for lifelong success.',
    icon: Sprout,
  },
  {
    title: 'We Belong',
    desc: 'We celebrate diversity and create a strong partnership between school and families.',
    icon: Users,
  },
  {
    title: 'We Thrive',
    desc: 'We prepare children to become compassionate, confident and globally minded citizens.',
    icon: Globe,
  }
]

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-14 lg:py-18 bg-[#FDFBF7] relative border-b border-neutral-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Title Centered matching Picture1.png */}
        <div className="text-center space-y-2">
          <h2 className="text-xs font-display font-extrabold uppercase tracking-[0.25em] text-[#9E1B1E]">
            OUR SCHOOL PHILOSOPHY
          </h2>
          <p className="text-sm text-neutral-600 font-light max-w-xl mx-auto">
            At Sunshine Maple Bear, our values shape every learning experience, every interaction and every step of each child&apos;s journey.
          </p>
        </div>

        {/* 5 Column Line-Art Icon Grid matching Picture1.png & Excel Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {philosophyValues.map((val, idx) => {
            const IconComponent = val.icon
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-3 p-5 rounded-3xl bg-white border border-neutral-200/70 shadow-xs hover:shadow-md transition-all group"
              >
                {/* Red Line-Art Icon Container */}
                <div className="w-14 h-14 rounded-full bg-red-50 text-[#9E1B1E] flex items-center justify-center transition-transform group-hover:scale-110 flex-shrink-0">
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-base font-serif font-bold text-[#332C2B]">
                  {val.title}
                </h3>

                {/* Description Paragraph */}
                <p className="text-xs text-[#554D4B] font-light leading-relaxed">
                  {val.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
