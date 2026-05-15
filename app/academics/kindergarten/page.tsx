'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { BookOpen, Calculator, Atom, Palette, Music, Users, GraduationCap, Globe, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function KindergartenPage() {
  const learningAreas = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Literacy & Phonics',
      desc: 'Using the Canadian Jolly Phonics method to build strong foundations in reading, writing, and verbal expression in English.'
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'Early Mathematics',
      desc: 'Developing logical thinking and number sense through hands-on activities, sorting, and pattern recognition.'
    },
    {
      icon: <Atom className="w-6 h-6" />,
      title: 'Science & Discovery',
      desc: 'Nurturing curiosity through experimentation, observation, and exploration of the natural world.'
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Primary Readiness',
      desc: 'Preparing children for the transition to primary school with focus on independence, focus, and social skills.'
    }
  ]

  const highlights = [
    { title: 'STEAM Integration', desc: 'Science, Technology, Engineering, Arts, and Mathematics integrated into thematic units.' },
    { title: 'Global Citizenship', desc: 'Developing awareness of diverse cultures and environmental responsibility.' },
    { title: 'Project-Based Learning', desc: 'In-depth exploration of topics that matter to children, fostering deep engagement.' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-40">
            <Image
              src={SCHOOL_IMAGES.render.lopHoc1}
              alt="Kindergarten Classroom"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-maple-black via-maple-black/60 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maple-red/20 border border-maple-red/30 backdrop-blur-md mb-4">
                <GraduationCap size={18} className="text-maple-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Ages 3 Years - 5 Years</span>
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight">
                Empowering <span className="text-maple-gold">Confident</span> <br /> Global Learners
              </h1>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                Our Kindergarten program bridges the gap between play and structured learning, preparing children for international primary success.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Excellence */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative rounded-[56px] overflow-hidden aspect-square shadow-2xl group">
                <Image
                  src={SCHOOL_IMAGES.render.thuVien3}
                  alt="Academic Excellence"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black leading-tight">
                    A Curriculum that <br /><span className="text-maple-red">Inspires</span> Inquiry
                  </h2>
                  <p className="text-lg text-neutral-600 font-light leading-relaxed">
                    In the Kindergarten years, children transition to more complex cognitive tasks. The Maple Bear curriculum uses an inquiry-based approach where children are encouraged to ask "why" and "how," developing critical thinking skills that last a lifetime.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {learningAreas.map((area, idx) => (
                    <div key={idx} className="p-6 bg-neutral-50 rounded-[32px] border border-neutral-100 transition-all hover:bg-white hover:shadow-xl hover:border-maple-gold/20">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-maple-red shadow-sm mb-4">
                        {area.icon}
                      </div>
                      <h4 className="font-bold text-maple-black mb-2">{area.title}</h4>
                      <p className="text-sm text-neutral-500 leading-relaxed">{area.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features / Highlights */}
        <section className="py-24 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black">Program Highlights</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-lg">Unique advantages of the Maple Bear Kindergarten experience.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="p-10 bg-white rounded-[48px] shadow-sm hover:shadow-xl transition-all border border-neutral-100 flex flex-col items-center text-center space-y-4 group">
                  <div className="w-16 h-16 bg-maple-gold/10 rounded-2xl flex items-center justify-center text-maple-gold group-hover:bg-maple-gold group-hover:text-white transition-all">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-maple-black">{item.title}</h4>
                  <p className="text-neutral-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Graduation / Pathway */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="w-24 h-24 bg-maple-red/10 rounded-full flex items-center justify-center mx-auto text-maple-red">
                <Globe size={48} />
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-maple-black leading-tight">Ready for the <br />International Stage</h2>
              <p className="text-xl text-neutral-500 font-light max-w-2xl mx-auto">
                Our graduates are confidently bilingual, socially adept, and academically prepared for the most rigorous international primary schools in Vietnam and abroad.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/admissions" className="px-12 py-5 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 transform hover:scale-105">Request a Consultation</Link>
                <Link href="/tour-booking" className="px-12 py-5 bg-white text-maple-black font-bold rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all">Book a Tour</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
