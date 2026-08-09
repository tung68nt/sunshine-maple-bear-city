'use client'

import Image from 'next/image'
import { Globe2 } from 'lucide-react'

const teachers = [
  {
    name: 'Sarah Johnson',
    role: 'Lead English Teacher',
    country: 'Canada',
    years: 8,
    image: '/teacher_sarah_1778697942314.png',
    bio: 'Early childhood education specialist from Canada with 8 years of experience at Maple Bear Global Schools.',
  },
  {
    name: 'Nguyễn Thanh Hà',
    role: 'Homeroom Teacher',
    country: 'Vietnam',
    years: 10,
    image: '/teacher_ha_1778697972076.png',
    bio: 'Graduate of Hanoi National University of Education, Maple Bear Canada–certified educator.',
  },
  {
    name: 'Michael Chen',
    role: 'STEAM Coordinator',
    country: 'United Kingdom',
    years: 6,
    image: '/teacher_michael_1778698188655.png',
    bio: 'STEAM specialist from the UK, passionate about nurturing creative thinking in young learners.',
  },
  {
    name: 'Trần Minh Anh',
    role: 'Child Psychologist',
    country: 'Vietnam',
    years: 7,
    image: '/teacher_ha_1778697972076.png',
    bio: 'Specialist in early childhood developmental psychology & positive education methods.',
  },
]

export function TeacherTeam() {
  return (
    <section className="py-24 lg:py-32 bg-[#FDFBF7] relative border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block text-xs font-display font-extrabold text-maple-red uppercase tracking-[0.2em]">
            Our Educators
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#1D1D1B]">
            Dedicated & Professional Team
          </h2>
          <p className="text-neutral-600 max-w-xl mx-auto font-light text-base">
            100% of educators are Maple Bear Canada–certified
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((t, idx) => (
            <div key={idx} className="bg-white border border-neutral-200 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all group">
              <div className="relative w-32 h-32 overflow-hidden border border-neutral-200 mb-4 bg-neutral-100">
                <Image 
                  src={t.image} 
                  alt={t.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  sizes="128px"
                  quality={80}
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDFBF7] border border-neutral-200 text-[10px] font-display font-bold uppercase tracking-widest text-neutral-600 mb-3">
                <Globe2 size={12} className="text-maple-red" />
                <span>{t.country}</span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#1D1D1B]">{t.name}</h3>
              <p className="text-xs text-maple-red font-bold uppercase tracking-wider mt-1">{t.role}</p>
              <p className="text-xs text-neutral-500 mt-2 font-light">{t.years} years of experience</p>
              <p className="text-xs text-neutral-600 mt-3 border-t border-neutral-200 pt-3 font-light leading-relaxed">{t.bio}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
