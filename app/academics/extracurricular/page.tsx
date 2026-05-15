'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { Music, Palette, Trophy, Code, Globe, Heart, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ExtracurricularPage() {
  const clubs = [
    {
      icon: <Music className="w-6 h-6" />,
      title: 'Music & Movement',
      desc: 'Developing rhythm, auditory skills, and self-confidence through piano, choir, and creative dance.',
      image: SCHOOL_IMAGES.render.phongChucNang1
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Visual Arts & Crafts',
      desc: 'Exploring diverse media from watercolor to clay, fostering fine motor skills and unlimited creativity.',
      image: SCHOOL_IMAGES.render.lopHoc3
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Little Olympians',
      desc: 'Developing physical fitness, coordination, and team spirit through soccer, swimming, and mini-athletics.',
      image: SCHOOL_IMAGES.render.hanhLang2
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Early Coding & Robotics',
      desc: 'Introducing logical thinking and problem-solving through age-appropriate digital tools and building sets.',
      image: SCHOOL_IMAGES.render.lopHoc5
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-40">
            <Image
              src={SCHOOL_IMAGES.render.phongChucNang1}
              alt="Extracurricular Activities"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-maple-black via-maple-black/60 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maple-gold/20 border border-maple-gold/30 backdrop-blur-md mb-4">
                <Trophy size={18} className="text-maple-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Beyond the Classroom</span>
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight">
                Discover Your <span className="text-maple-gold">Passions</span>
              </h1>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                Our enrichment programs are designed to spark curiosity and develop talents in a fun, supportive international environment.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black leading-tight">
                Holistic Growth Through <span className="text-maple-red">Exploration</span>
              </h2>
              <p className="text-lg text-neutral-600 font-light leading-relaxed">
                At Sunshine Maple Bear, we believe that education extends far beyond traditional lessons. Our after-school and weekend enrichment clubs provide students with the opportunity to explore new interests, build deep friendships, and develop leadership skills in a 100% English setting.
              </p>
            </div>
          </div>
        </section>

        {/* Activity Grid */}
        <section className="py-24 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {clubs.map((club, idx) => (
                <div key={idx} className="group bg-white rounded-[48px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-100 flex flex-col md:flex-row">
                  <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                    <Image src={club.image} alt={club.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-maple-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-10 flex-1 space-y-4">
                    <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-maple-red group-hover:bg-maple-red group-hover:text-white transition-all">
                      {club.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-maple-black">{club.title}</h4>
                    <p className="text-neutral-500 leading-relaxed font-light">{club.desc}</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-maple-red hover:gap-3 transition-all">
                      Join this Club <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-maple-red rounded-[64px] p-12 md:p-24 text-white relative overflow-hidden text-center">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent)]" />
              </div>
              <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                <h3 className="text-4xl md:text-6xl font-display font-bold">Why Join Our Clubs?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {[
                    { label: 'English Mastery', desc: 'Practical language use.' },
                    { label: 'Social Skills', desc: 'New friendships.' },
                    { label: 'Talent Discovery', desc: 'Find your spark.' },
                  ].map((benefit, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="text-xl font-bold text-maple-gold">{benefit.label}</h4>
                      <p className="text-white/70 text-sm">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-6">
                  <Link href="/contact" className="px-12 py-5 bg-white text-maple-red font-bold rounded-2xl hover:bg-neutral-100 transition-all shadow-xl shadow-black/10 inline-block">
                    Inquire for Schedule
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
