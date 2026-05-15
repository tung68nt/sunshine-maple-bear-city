'use client'

import { useEffect, useRef } from 'react'
import { ShieldCheck, HeartPulse, Sparkles, Globe, Users } from 'lucide-react'

/**
 * 5 Official Brand Pillars — from MBIK_SSCity brand positioning document
 * Each card maps to one of the 5 core value propositions for parents
 */
const features = [
  {
    icon: ShieldCheck,
    title: 'Absolute Safety',
    desc: 'Physical, emotional and procedural safety at the highest standards. We provide secure controlled access, child-safe modern classroom design, and clear health protocols. More importantly, we ensure emotional safety through respectful, positive discipline without shaming, allowing children to confidently explore.',
  },
  {
    icon: HeartPulse,
    title: 'Health & Nutrition',
    desc: 'Age-appropriate scientific nutrition plans with balanced meals, less sugar, and transparent menus. Health is built into our curriculum, teaching children lifelong habits through daily hygiene routines, handwashing, and engaging activities about the human body and wellness.',
  },
  {
    icon: Sparkles,
    title: 'Character & Values',
    desc: 'Developing empathy, independence, and social skills through daily interactions. Utilizing a Social-Emotional Learning (SEL) framework, children learn respect, kindness, and emotional regulation. We guide them to resolve conflicts with words and build positive, cooperative relationships.',
  },
  {
    icon: Globe,
    title: '100% English Immersion',
    desc: 'A premium Canadian Immersion methodology where English is not just a subject, but the medium of all daily activities. Children acquire English naturally through meaningful interactions, phonics, stories, and play, with clear learning outcomes and academic progress tracked in personalized portfolios.',
  },
  {
    icon: Users,
    title: 'Parent Partnership',
    desc: 'Transparent, professional communication is our promise. We build trust through weekly newsletters, monthly curriculum overviews, parent-teacher conferences, and clear incident reporting. Parents are active partners in their child\'s educational journey.',
  },
]

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card')
            cards.forEach((card, idx) => {
              setTimeout(() => card.classList.add('is-visible'), idx * 100)
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
    <section ref={sectionRef} className="relative py-24 bg-[var(--color-cream)] overflow-hidden">
      <div className="blob w-72 h-72 bg-[var(--color-gold-light)] top-10 -right-20" />
      <div className="blob w-56 h-56 bg-[var(--color-primary)] bottom-10 -left-20 opacity-[0.08]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block text-sm font-display font-bold text-[var(--color-primary)] uppercase tracking-[0.2em]">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[var(--color-dark)]">
            5 Pillars of <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-lg text-[var(--color-gray)] max-w-2xl mx-auto">
            What modern parents truly look for — and how Sunshine Maple Bear at Sunshine City delivers at the highest international standard.
          </p>
        </div>

        {/* 5 pillars: first row 3, second row 2 centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.slice(0, 3).map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="feature-card scroll-animate fade-up group bg-white p-8 rounded-2xl border border-[var(--color-gray-light)] card-hover"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-6 text-[var(--color-gold)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-500">
                  <Icon size={28} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-display font-bold text-[var(--color-dark)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-gray)] text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8 max-w-4xl mx-auto">
          {features.slice(3).map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx + 3}
                className="feature-card scroll-animate fade-up group bg-white p-8 rounded-2xl border border-[var(--color-gray-light)] card-hover"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-6 text-[var(--color-gold)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-500">
                  <Icon size={28} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-display font-bold text-[var(--color-dark)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-gray)] text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
