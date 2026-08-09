'use client'

import { useEffect, useRef } from 'react'
import { Sun, Music, BookOpen, FlaskConical, TreePine, UtensilsCrossed, Moon, Palette, Home, Dumbbell } from 'lucide-react'

const schedule = [
  {
    time: '7:30 – 8:00',
    activity: 'Arrival & Free Play',
    icon: Sun,
    desc: 'Parents drop off their children, greeted warmly by teachers. Children choose their favorite learning centers for free exploration.',
    color: 'var(--color-gold)',
  },
  {
    time: '8:00 – 8:30',
    activity: 'Circle Time & Morning Exercise',
    icon: Music,
    desc: 'Morning assembly, physical movement, and energizing activities. Building healthy habits and a sense of community.',
    color: 'var(--color-primary)',
  },
  {
    time: '8:30 – 9:30',
    activity: 'English Immersion Class',
    icon: BookOpen,
    desc: 'Language immersion methodology with native Canadian teachers. Includes Phonics, Literacy, and Communication skills development.',
    color: 'var(--color-gold)',
  },
  {
    time: '9:30 – 10:30',
    activity: 'STEAM & Discovery',
    icon: FlaskConical,
    desc: 'Science experiments, creative design, basic coding, and nature exploration through hands-on learning centers.',
    color: 'var(--color-primary)',
  },
  {
    time: '10:30 – 11:30',
    activity: 'Outdoor Activities',
    icon: TreePine,
    desc: 'Active play at the outdoor playground, team games, and social-physical development activities.',
    color: 'var(--color-gold)',
  },
  {
    time: '11:30 – 12:00',
    activity: 'Nutritious Lunch',
    icon: UtensilsCrossed,
    desc: 'Balanced menus designed by certified nutritionists, ensuring fresh, wholesome meals with complete micronutrients daily.',
    color: 'var(--color-primary)',
  },
  {
    time: '12:00 – 14:00',
    activity: 'Nap Time & Rest',
    icon: Moon,
    desc: 'Cool, comfortable nap rooms. Teachers monitor each child\'s sleep quality and overall well-being.',
    color: 'var(--color-gold)',
  },
  {
    time: '14:00 – 15:00',
    activity: 'Arts & Music',
    icon: Palette,
    desc: 'Creative painting, Orff instruments, ballet, modern dance. Developing emotional intelligence and expressive abilities.',
    color: 'var(--color-primary)',
  },
  {
    time: '15:00 – 16:00',
    activity: 'Physical & Skill Clubs',
    icon: Dumbbell,
    desc: 'Swimming, kids yoga, martial arts, or life skills clubs. Building endurance, confidence, and self-discipline.',
    color: 'var(--color-gold)',
  },
  {
    time: '16:00 – 16:30',
    activity: 'Dismissal & Parent Update',
    icon: Home,
    desc: 'Parents pick up their children. Teachers share a brief daily report on activities, progress and milestones via the school app.',
    color: 'var(--color-primary)',
  },
]

export function DailySchedule() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.schedule-item')
            items.forEach((item, idx) => {
              setTimeout(() => item.classList.add('is-visible'), idx * 80)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block text-sm font-display font-bold text-[var(--color-primary)] uppercase tracking-[0.2em]">
            A Day at Sunshine Maple Bear
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[var(--color-dark)]">
            Daily Schedule
          </h2>
          <p className="text-[var(--color-gray)] max-w-2xl mx-auto">
            Every day at Sunshine Maple Bear is thoughtfully designed to balance learning, play, rest and skill development.
          </p>
        </div>

        {/* Dense table-style layout */}
        <div className="space-y-3">
          {schedule.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className={`schedule-item scroll-animate fade-up group flex items-stretch rounded-2xl border border-[var(--color-gray-light)] overflow-hidden bg-white hover:shadow-lg hover:border-transparent transition-all duration-400 ${
                  idx % 2 === 0 ? '' : 'bg-[var(--color-cream)]/50'
                }`}
              >
                {/* Time column */}
                <div className="w-28 md:w-36 flex-shrink-0 flex flex-col items-center justify-center py-4 px-3 border-r border-[var(--color-gray-light)]" style={{ background: `color-mix(in srgb, ${item.color} 8%, white)` }}>
                  <span className="text-sm md:text-base font-display font-black whitespace-nowrap" style={{ color: item.color }}>
                    {item.time.split('–')[0].trim()}
                  </span>
                  <span className="text-xs text-[var(--color-gray)] font-medium">
                    – {item.time.split('–')[1]?.trim()}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-16 flex-shrink-0 flex items-center justify-center">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 py-4 pr-6 pl-2 min-w-0">
                  <h3 className="font-display font-bold text-[var(--color-dark)] text-sm md:text-base">
                    {item.activity}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--color-gray)] mt-1 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--color-cream)] border border-[var(--color-gray-light)]">
            <span className="text-lg">📋</span>
            <p className="text-sm text-[var(--color-gray)]">
              Schedule may vary by class level and campus.
              <span className="text-[var(--color-primary)] font-display font-bold ml-1">
                Contact us for detailed information.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
