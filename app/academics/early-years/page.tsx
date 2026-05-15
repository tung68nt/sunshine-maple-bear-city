'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { Brain, Heart, Sparkles, Languages, Users, Baby, Music, Palmtree, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function EarlyYearsPage() {
  const pillars = [
    {
      icon: <Baby className="w-6 h-6" />,
      title: 'Sensorimotor Development',
      desc: 'Focusing on fine and gross motor skills through purposeful play, kids yoga, and sensory exploration activities.'
    },
    {
      icon: <Languages className="w-6 h-6" />,
      title: 'Early Language Acquisition',
      desc: '100% English immersion from day one. Children learn through songs, storytelling, and natural daily interactions.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Social-Emotional Learning',
      desc: 'Building trust, independence, and the ability to express emotions in a respectful, nurturing environment.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Creative Expression',
      desc: 'Encouraging curiosity through open-ended art, music, and dramatic play designed for the youngest learners.'
    }
  ]

  const schedule = [
    { time: '08:00 - 08:30', activity: 'Welcome & Sensory Play', desc: 'Transitioning into the school day with calming sensory activities.' },
    { time: '08:30 - 09:15', activity: 'Circle Time & Music', desc: 'English songs, finger plays, and simple storytelling.' },
    { time: '09:15 - 10:00', activity: 'Outdoor Exploration', desc: 'Guided play in our safe, impact-absorbing playground.' },
    { time: '10:00 - 10:30', activity: 'Healthy Snack & Hygiene', desc: 'Learning hand-washing and independent eating habits.' },
    { time: '10:30 - 11:15', activity: 'Thematic Activities', desc: 'Hands-on learning based on our Canadian curriculum units.' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-40">
            <Image
              src={SCHOOL_IMAGES.render.lopHoc2}
              alt="Early Years Classroom"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-maple-black via-maple-black/60 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maple-gold/20 border border-maple-gold/30 backdrop-blur-md mb-4">
                <Baby size={18} className="text-maple-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Ages 12 Months - 3 Years</span>
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight">
                Laying the <span className="text-maple-gold">Foundation</span> <br /> of Early Discovery
              </h1>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                In our Early Years program, we create a "home away from home" where toddlers feel safe to explore, communicate, and grow in a 100% English environment.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Intro */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black leading-tight">
                    Where Every <span className="text-maple-red">Step</span> is a Milestone
                  </h2>
                  <p className="text-lg text-neutral-600 font-light leading-relaxed">
                    The Maple Bear Early Years curriculum is specifically designed for the critical window of brain development between 12 months and 3 years. We focus on the "whole child," ensuring that physical care and emotional security are the bedrock for cognitive and language learning.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {pillars.map((pillar, idx) => (
                    <div key={idx} className="p-6 bg-neutral-50 rounded-[32px] border border-neutral-100 transition-all hover:bg-white hover:shadow-xl hover:border-maple-gold/20">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-maple-red shadow-sm mb-4">
                        {pillar.icon}
                      </div>
                      <h4 className="font-bold text-maple-black mb-2">{pillar.title}</h4>
                      <p className="text-sm text-neutral-500 leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-[56px] overflow-hidden aspect-square shadow-2xl group">
                <Image
                  src={SCHOOL_IMAGES.render.lopHoc5}
                  alt="Creative Play"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maple-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Daily Schedule Section */}
        <section className="py-24 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black">A Day in the Life</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-lg">Predictable routines create a sense of security and help young children thrive.</p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white rounded-[48px] shadow-sm border border-neutral-100 overflow-hidden">
              {schedule.map((item, idx) => (
                <div key={idx} className={`flex flex-col sm:flex-row items-center gap-6 p-8 transition-colors hover:bg-neutral-50 ${idx !== schedule.length - 1 ? 'border-b border-neutral-100' : ''}`}>
                  <div className="w-32 flex-shrink-0 text-maple-red font-display font-bold text-lg">
                    {item.time}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-xl font-bold text-maple-black">{item.activity}</h4>
                    <p className="text-neutral-500 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Program: English Immersion */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-maple-black rounded-[64px] overflow-hidden relative p-12 md:p-24 text-white">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]" />
              </div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <span className="text-maple-gold font-bold uppercase tracking-widest text-sm">Language Leadership</span>
                  <h3 className="text-4xl md:text-6xl font-display font-bold leading-tight">True English <br /><span className="text-maple-gold">Immersion</span></h3>
                  <p className="text-xl text-white/60 font-light leading-relaxed">
                    At Sunshine Maple Bear, English isn't a subject—it's the language of our world. Toddlers acquire English naturally through immersion, the same way they learn their first language.
                  </p>
                  <ul className="space-y-4">
                    {['Natural language acquisition', 'Native-speaking environments', 'Focus on listening & comprehension', 'Visual & musical learning cues'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80 font-medium">
                        <CheckCircle2 className="text-maple-gold" size={20} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video rounded-[32px] overflow-hidden border-8 border-white/5">
                  <Image src={SCHOOL_IMAGES.render.thuVien5} alt="English immersion" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ/CTA */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black">Ready to start the journey?</h2>
              <p className="text-xl text-neutral-500 font-light">Join our next open day to see our Early Years classroom in action.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/admissions" className="px-12 py-5 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 transform hover:scale-105">Enroll Now</Link>
                <Link href="/contact" className="px-12 py-5 bg-white text-maple-black font-bold rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
