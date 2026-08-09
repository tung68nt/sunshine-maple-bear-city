'use client'

import { useEffect, useRef } from 'react'
import { BookHeart, Sprout, Puzzle, Lightbulb } from 'lucide-react'

const philosophies = [
  {
    icon: BookHeart,
    title: 'Child-Centered Learning',
    desc: 'Every child is unique. Our Canadian methodology places children at the heart of their learning journey — encouraging curiosity, independence and self-expression through play-based exploration.',
    color: 'var(--color-primary)',
  },
  {
    icon: Sprout,
    title: 'Nurturing the Whole Child',
    desc: 'We develop the whole child — cognitive, social, emotional, and physical — through an integrated curriculum that values kindness, resilience, and creativity as much as academic readiness.',
    color: 'var(--color-gold)',
  },
  {
    icon: Puzzle,
    title: 'Learning Through Play',
    desc: 'Research-backed play-based pedagogy drives deeper understanding. Through purposeful play, children develop problem-solving skills, language fluency, and social competence naturally.',
    color: 'var(--color-primary)',
  },
  {
    icon: Lightbulb,
    title: 'Inquiry & Discovery',
    desc: 'Children are natural scientists. Our inquiry-based approach transforms everyday moments into powerful learning opportunities, building critical thinking and a lifelong love of learning.',
    color: 'var(--color-gold)',
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.philosophy-card')
            cards.forEach((card, idx) => {
              setTimeout(() => card.classList.add('is-visible'), idx * 150)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--color-cream)] relative overflow-hidden">
      {/* Decorative blob */}
      <div className="blob w-96 h-96 bg-[var(--color-gold-light)] -top-20 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block text-sm font-display font-bold text-[var(--color-primary)] uppercase tracking-[0.2em]">
            Our Learning Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[var(--color-dark)]">
            The Maple Bear <span className="text-gradient">Approach</span>
          </h2>
          <p className="text-lg text-[var(--color-gray)] max-w-2xl mx-auto">
            Rooted in Canadian educational excellence — a proven methodology trusted by families in 39 countries worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {philosophies.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="philosophy-card scroll-animate fade-up group bg-white p-8 md:p-10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div 
                    className="w-16 h-16 rounded-3xl flex items-center justify-center flex-shrink-0 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-current/20"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-display font-bold text-[var(--color-dark)] group-hover:text-[var(--color-primary)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-gray)] text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
