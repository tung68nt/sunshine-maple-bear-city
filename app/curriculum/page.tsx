'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BookOpen, Sparkles, Brain, Heart, Music, Palmtree, Users, Globe, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SCHOOL_IMAGES, BEAR_CLASSES } from '@/lib/constants'

export function CurriculumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-40">
            <Image
              src={SCHOOL_IMAGES.render.lopHoc1}
              alt="Learning environment at Sunshine Maple Bear"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-maple-black via-maple-black/60 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maple-red/30 border border-maple-red/50 backdrop-blur-md mb-4">
                <Globe size={18} className="text-maple-gold" />
                <span className="text-sm font-bold uppercase tracking-widest text-white">100% English · Canadian Standard</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-tight">World-Class <br /><span className="text-maple-gold">International</span> Curriculum</h1>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                A fully English-medium early childhood program from Canada, building a strong foundation for every child&apos;s future success in a 100% English environment.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-maple-red font-bold uppercase tracking-widest text-sm">Educational Philosophy</span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black leading-tight">Child-Centered Learning <br /> <span className="text-maple-red">Canadian Standard</span></h2>
                </div>
                <p className="text-lg text-neutral-600 font-light leading-relaxed">
                  The Maple Bear curriculum is developed by Canada&apos;s leading education experts, grounded in the latest brain development research for young children. We don&apos;t just teach knowledge — we create a fully English environment where children confidently explore and express themselves.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex gap-4 p-8 bg-neutral-50 rounded-[32px] border border-neutral-100 transition-all hover:bg-white hover:shadow-xl hover:border-maple-gold/20">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-maple-red shadow-sm flex-shrink-0">
                      <Brain size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-maple-black mb-1">Independent Thinking</h4>
                      <p className="text-sm text-neutral-500 leading-snug">Stimulating observation and problem-solving abilities through inquiry.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-8 bg-neutral-50 rounded-[32px] border border-neutral-100 transition-all hover:bg-white hover:shadow-xl hover:border-maple-gold/20">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-maple-gold shadow-sm flex-shrink-0">
                      <Sparkles size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-maple-black mb-1">Unlimited Creativity</h4>
                      <p className="text-sm text-neutral-500 leading-snug">Respecting individuality and encouraging divergent ideas.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative rounded-[48px] overflow-hidden aspect-square shadow-2xl group">
                <Image
                  src={SCHOOL_IMAGES.render.lopHoc5}
                  alt="Creative classroom activities"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maple-black/40 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* 8 Key Areas of Development */}
        <section className="py-24 bg-neutral-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-maple-gold/5 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20 space-y-4">
              <span className="text-maple-red font-bold uppercase tracking-widest text-sm">8 DEVELOPMENTAL DOMAINS</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black">Holistic Multi-Dimensional Growth</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed">The Maple Bear education model focuses on harmonious development of intellect, physicality, and character for every child — all delivered in a 100% English environment.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Brain />, title: 'Cognitive', desc: 'Building foundations in logical thinking, math, and science through hands-on, experiential learning.' },
                { icon: <Users />, title: 'Social', desc: 'Developing teamwork skills, sharing, and a sense of community responsibility.' },
                { icon: <Heart />, title: 'Emotional', desc: 'Helping children build empathy, confidence, and positive emotional regulation.' },
                { icon: <Globe />, title: 'Language', desc: 'Full English immersion — children develop native-like fluency through a completely English-medium environment.' },
                { icon: <Palmtree />, title: 'Physical', desc: 'Developing gross and fine motor skills through specialized physical activities and kids yoga.' },
                { icon: <Music />, title: 'Music & Arts', desc: 'Stimulating artistic appreciation and rhythmic sense during the golden stage of brain development.' },
                { icon: <Sparkles />, title: 'Creativity', desc: 'Free expression through painting, crafts, and creative dramatic play.' },
                { icon: <BookOpen />, title: 'Life Skills', desc: 'Building habits of independence, personal hygiene, and essential safety skills.' },
              ].map((area, idx) => (
                <div key={idx} className="p-8 bg-white rounded-[40px] shadow-sm hover:shadow-xl transition-all group border border-neutral-100 hover:border-maple-gold/30">
                  <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-maple-red mb-8 group-hover:bg-maple-red group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
                    {area.icon}
                  </div>
                  <h4 className="text-xl font-bold text-maple-black mb-3">{area.title}</h4>
                  <p className="text-neutral-500 font-light leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Dive Section: Why Canada? */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative rounded-[56px] overflow-hidden aspect-[4/5] shadow-2xl order-2 lg:order-1">
                <Image
                  src={SCHOOL_IMAGES.render.thuVien5}
                  alt="Maple Bear teaching methodology"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maple-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                  <div className="space-y-4">
                    <p className="text-white text-3xl font-display font-bold italic leading-tight">&quot;Learning through play is the most scientifically proven approach for the golden years.&quot;</p>
                    <div className="w-20 h-1 bg-maple-gold rounded-full" />
                  </div>
                </div>
              </div>
              <div className="space-y-12 order-1 lg:order-2">
                <div className="space-y-6">
                  <span className="text-maple-red font-bold uppercase tracking-widest text-sm">Exceptional Advantages</span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black leading-tight">Why Choose the <br /><span className="text-maple-red">Maple Bear Canada</span> Program?</h2>
                  <p className="text-lg text-neutral-600 font-light leading-relaxed">
                    Canada&apos;s education system consistently ranks in the global TOP 3 for learning outcomes and student well-being. Maple Bear brings this philosophy to Hanoi in a fully English-medium setting.
                  </p>
                </div>

                <div className="space-y-10">
                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-maple-gold/10 flex items-center justify-center text-maple-gold flex-shrink-0 group-hover:bg-maple-gold group-hover:text-white transition-all shadow-sm">
                      <Sparkles size={28} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-maple-black">100% English Immersion</h4>
                      <p className="text-neutral-500 leading-relaxed">Children live and learn entirely in English across all activities — developing native-like language reflexes naturally in a fully international environment.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-maple-red/10 flex items-center justify-center text-maple-red flex-shrink-0 group-hover:bg-maple-red group-hover:text-white transition-all shadow-sm">
                      <BookOpen size={28} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-maple-black">Integrated STEAM Curriculum</h4>
                      <p className="text-neutral-500 leading-relaxed">Combining Science, Technology, Engineering, Arts, and Mathematics through real-world projects, helping children grasp concepts deeply rather than through rote learning.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <Users size={28} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-maple-black">Global Training & Assessment</h4>
                      <p className="text-neutral-500 leading-relaxed">Our teaching team is trained and quality-audited annually by the Maple Bear Global Schools Education Board from Canada.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grade Levels Section */}
        <section className="py-24 bg-neutral-light-gray overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 space-y-4">
              <span className="text-maple-red font-bold uppercase tracking-widest text-sm">CLASS LEVELS</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black">Age-Based Learning Pathways</h2>
              <p className="text-neutral-500 text-lg">Each developmental stage has its own specialized goals and curriculum — all in a 100% English environment.</p>
            </div>

            <div className="space-y-12">
              {BEAR_CLASSES.map((g, idx) => (
                <div key={idx} className="group relative bg-white rounded-[48px] overflow-hidden flex flex-col md:flex-row items-center border border-neutral-100 hover:border-maple-gold/30 transition-all duration-500 hover:shadow-2xl">
                  <div className="relative w-full md:w-2/5 h-80 md:h-[450px] overflow-hidden">
                    <Image src={g.image} alt={g.nameEn} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-8 left-8 w-16 h-16 rounded-3xl bg-white/90 backdrop-blur-md flex items-center justify-center text-3xl shadow-xl transform group-hover:rotate-12 transition-transform">
                      {g.emoji}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-maple-black/20 to-transparent pointer-events-none" />
                  </div>
                  <div className="p-10 md:p-16 flex-1 space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <h4 className="text-4xl font-display font-bold text-maple-black">{g.nameEn}</h4>
                      <div className="flex gap-2">
                        <span className="px-5 py-1.5 bg-maple-gold/10 text-maple-gold rounded-full text-xs font-bold uppercase tracking-widest border border-maple-gold/20">
                          {g.ageEn}
                        </span>
                        <span className="px-5 py-1.5 bg-maple-red/10 text-maple-red rounded-full text-xs font-bold uppercase tracking-widest border border-maple-red/20">
                          {g.level}
                        </span>
                      </div>
                    </div>
                    <div className="h-1 w-24 bg-maple-red/20 rounded-full group-hover:w-48 transition-all duration-500" />
                    <p className="text-xl text-neutral-600 font-light leading-relaxed">{g.descEn}</p>
                    <div className="pt-4">
                      <Link href="/admission" aria-label={`Apply for ${g.nameEn}`} className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-50 text-maple-black font-bold rounded-2xl hover:bg-maple-red hover:text-white transition-all group/link shadow-sm border border-neutral-100">
                        Apply Now <ArrowRight size={20} className="group-hover/link:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities Integration */}
        <section className="py-24 bg-maple-black text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-square rounded-[64px] overflow-hidden border-4 border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <Image
                  src={SCHOOL_IMAGES.render.thuVien3}
                  alt="Inspiring learning spaces"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-10">
                <div className="space-y-6">
                  <span className="text-maple-gold font-bold uppercase tracking-widest text-sm">Facilities</span>
                  <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight">Spaces That <br /><span className="text-maple-gold">Inspire the Future</span></h3>
                  <p className="text-xl text-white/60 font-light leading-relaxed">
                    At Sunshine City, we believe the learning space is &quot;the third teacher.&quot; Every corner is carefully designed to spark children&apos;s curiosity and support our 100% English environment.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { label: 'Natural Lighting', desc: '100% of classrooms have large windows.' },
                    { label: 'Canadian Materials', desc: 'Imported international-standard resources.' },
                    { label: 'English Library', desc: 'Thousands of carefully curated titles.' },
                    { label: 'Safe Playground', desc: 'Impact-absorbing surfaces to standard.' },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="text-lg font-bold text-maple-gold flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-maple-gold rounded-full" />
                        {item.label}
                      </h4>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-white text-center relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="w-20 h-20 bg-maple-red/5 rounded-3xl flex items-center justify-center mx-auto text-maple-red mb-4">
                <Globe size={40} />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-maple-black">Which program is the best fit for your child?</h2>
                <p className="text-xl text-neutral-500 font-light max-w-2xl mx-auto">Every child develops at their own pace. Let us help you find the optimal learning pathway in our 100% English international environment.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/admission" className="px-12 py-5 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 transform hover:scale-105">Book a Free Consultation</Link>
                <Link href="/gallery" className="px-12 py-5 bg-white text-maple-black font-bold rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all shadow-sm">Explore the Campus</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default CurriculumPage
