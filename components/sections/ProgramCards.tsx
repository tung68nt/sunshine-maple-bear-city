'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BEAR_CLASSES } from '@/lib/constants'

export function ProgramCards() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.program-card')
            cards.forEach((card, idx) => {
              setTimeout(() => card.classList.add('is-visible'), idx * 150)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block text-sm font-display font-bold text-maple-red uppercase tracking-[0.2em]">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-maple-black">
            Your Child&apos;s Learning Journey
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto font-light text-lg">
            Each class is named after a bear species — every stage is a carefully designed developmental milestone for your child.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {BEAR_CLASSES.map((cls, idx) => (
            <div
              key={idx}
              className="program-card scroll-animate fade-up group relative rounded-[32px] overflow-hidden bg-white border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={cls.image}
                  alt={cls.nameEn}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Bear emoji badge */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-2xl shadow-xl transform group-hover:rotate-12 transition-transform">
                  {cls.emoji}
                </div>
                {/* Age badge */}
                <div className="absolute bottom-4 left-4">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-white text-[10px] font-display font-bold uppercase tracking-widest shadow-lg"
                    style={{ backgroundColor: cls.color }}
                  >
                    {cls.ageEn}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-maple-black group-hover:text-maple-red transition-colors">
                    {cls.nameEn}
                  </h3>
                  <p className="text-[10px] font-display font-bold text-neutral-600 uppercase tracking-[0.15em] pt-1">
                    {cls.level}
                  </p>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed font-light line-clamp-3">
                  {cls.descEn}
                </p>
                <Link
                  href="/curriculum"
                  aria-label={`Learn more about ${cls.nameEn}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-maple-red pt-2 group/link"
                >
                  Learn More
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
