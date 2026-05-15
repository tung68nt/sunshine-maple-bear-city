'use client'

import { useEffect, useRef } from 'react'

import Image from 'next/image'

const teachers = [
  {
    name: 'Sarah Johnson',
    role: 'Lead English Teacher',
    country: '🇨🇦',
    years: 8,
    image: '/teacher_sarah_1778697942314.png',
    bio: 'Early childhood education specialist from Canada with 8 years of experience at Maple Bear Global Schools.',
  },
  {
    name: 'Nguyễn Thanh Hà',
    role: 'Homeroom Teacher',
    country: '🇻🇳',
    years: 10,
    image: '/teacher_ha_1778697972076.png',
    bio: 'Graduate of Hanoi National University of Education, Maple Bear Canada–certified educator.',
  },
  {
    name: 'Michael Chen',
    role: 'STEAM Coordinator',
    country: '🇬🇧',
    years: 6,
    image: '/teacher_michael_1778698188655.png',
    bio: 'STEAM specialist from the UK, passionate about nurturing creative thinking in young learners.',
  },
  {
    name: 'Trần Minh Anh',
    role: 'Child Psychologist',
    country: '🇻🇳',
    years: 7,
    image: '/teacher_minh_anh_1778698207046.png',
    bio: 'M.A. in Educational Psychology, partnering with families on the journey of nurturing confident children.',
  },
]

export function TeacherTeam() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.teacher-card')
            cards.forEach((card, idx) => {
              setTimeout(() => card.classList.add('is-visible'), idx * 120)
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
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block text-sm font-display font-bold text-[var(--color-primary)] uppercase tracking-[0.2em]">
            Our Educators
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[var(--color-dark)]">
            Dedicated & Professional
          </h2>
          <p className="text-[var(--color-gray)] max-w-xl mx-auto">
            100% of educators are Maple Bear Canada–certified
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((t, idx) => (
            <div key={idx} className="teacher-card scroll-animate fade-up flip-card h-[380px]">
              <div className="flip-card-inner relative w-full h-full">
                {/* Front */}
                <div className="flip-card-front absolute inset-0 rounded-2xl bg-[var(--color-cream)] border border-[var(--color-gray-light)] flex flex-col items-center p-6 text-center pt-8">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                    <Image 
                      src={t.image} 
                      alt={t.name} 
                      fill 
                      className="object-cover" 
                      sizes="128px"
                      quality={80}
                    />
                  </div>
                  <div className="text-xl mb-1">{t.country}</div>
                  <h3 className="font-display font-bold text-lg text-[var(--color-dark)]">{t.name}</h3>
                  <p className="text-sm text-[var(--color-primary)] font-medium">{t.role}</p>
                  <p className="text-xs text-[var(--color-gray)] mt-2">{t.years} years of experience</p>
                </div>
                {/* Back */}
                <div className="flip-card-back absolute inset-0 rounded-2xl bg-[var(--color-dark)] flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-3xl mb-4">{t.country}</div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{t.name}</h3>
                  <p className="text-sm text-[var(--color-gold)] font-medium mb-4">{t.role}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{t.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
