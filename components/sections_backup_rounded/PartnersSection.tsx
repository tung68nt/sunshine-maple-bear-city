'use client'

import { useEffect, useRef } from 'react'

const partners = [
  'Maple Bear Global Schools',
  'Canadian Education Board',
  'STEM.org',
  'Cambridge Assessment',
  'Vietnam Education Awards',
  'Sunshine Group',
]

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.partner-item')
            items.forEach((item, idx) => {
              setTimeout(() => item.classList.add('is-visible'), idx * 80)
            })
          }
        })
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-[var(--color-gray-light)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="inline-block text-sm font-display font-bold text-[var(--color-primary)] uppercase tracking-[0.2em]">
            Partners & Accreditations
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-dark)]">
            A Globally Trusted Education Network
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((name, idx) => (
            <div
              key={idx}
              className="partner-item scroll-animate fade-up group flex items-center justify-center p-6 rounded-xl bg-white border border-neutral-100 grayscale hover:grayscale-0 transition-all duration-500 card-hover"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-neutral-400 group-hover:text-maple-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="text-[10px] font-display font-bold text-neutral-600 group-hover:text-maple-black transition-colors text-center uppercase tracking-wider">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
