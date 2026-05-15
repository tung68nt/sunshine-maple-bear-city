'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { Smartphone, Calendar, MessageSquare, Book, Users, Star, ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'

export default function ParentPortalPage() {
  const tools = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'The Maple Bear App',
      desc: 'Real-time updates on your child’s daily activities, meals, and photos delivered straight to your smartphone.'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'School Calendar',
      desc: 'Stay informed about upcoming events, field trips, parent-teacher meetings, and public holidays.'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Direct Messaging',
      desc: 'A secure channel to communicate directly with your child’s teachers and the school administration.'
    },
    {
      icon: <Book className="w-6 h-6" />,
      title: 'Learning Resources',
      desc: 'Access home-learning materials, reading lists, and tips to support your child’s development at home.'
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
              src={SCHOOL_IMAGES.render.lopHoc2}
              alt="Parent Community"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-maple-black via-maple-black/60 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maple-gold/20 border border-maple-gold/30 backdrop-blur-md mb-4">
                <Users size={18} className="text-maple-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Your Connection to School</span>
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight">
                Parent <span className="text-maple-gold">Portal</span>
              </h1>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                Partnering with parents to create the best possible educational journey for every child.
              </p>
            </div>
          </div>
        </section>

        {/* Digital Tools */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black">Digital Connectivity</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-lg">Powerful tools to keep you connected with your child&apos;s daily life at school.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tools.map((tool, idx) => (
                <div key={idx} className="p-10 bg-neutral-50 rounded-[40px] border border-neutral-100 transition-all hover:bg-white hover:shadow-2xl hover:border-maple-gold/20 group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-maple-red shadow-sm mb-6 group-hover:bg-maple-red group-hover:text-white transition-all">
                    {tool.icon}
                  </div>
                  <h4 className="text-xl font-bold text-maple-black mb-4">{tool.title}</h4>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App Download Promo */}
        <section className="py-24 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-maple-black rounded-[64px] overflow-hidden relative p-12 md:p-24 text-white">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 text-center lg:text-left">
                  <h3 className="text-4xl md:text-6xl font-display font-bold leading-tight">Download the <br /><span className="text-maple-gold">Maple Bear App</span></h3>
                  <p className="text-xl text-white/60 font-light leading-relaxed">
                    Access all school services, track attendance, and view your child&apos;s digital portfolio from anywhere in the world.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <button className="bg-white text-maple-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-neutral-100 transition-all">
                      <Download size={20} /> App Store
                    </button>
                    <button className="bg-white text-maple-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-neutral-100 transition-all">
                      <Download size={20} /> Google Play
                    </button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-64 h-[500px] border-8 border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
                     <Image src={SCHOOL_IMAGES.render.lopHoc5} alt="App preview" fill className="object-cover opacity-50" />
                     <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                        <div className="space-y-4">
                           <Smartphone className="w-16 h-16 text-maple-gold mx-auto" />
                           <p className="font-bold text-xl">Interactive Portfolio</p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parent Council */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative rounded-[56px] overflow-hidden aspect-video shadow-2xl">
                <Image src={SCHOOL_IMAGES.render.thuVien5} alt="Parent involvement" fill className="object-cover" />
              </div>
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black leading-tight">Parent-Teacher <br /><span className="text-maple-red">Partnership</span></h2>
                <p className="text-lg text-neutral-600 font-light leading-relaxed">
                  We believe that education is a shared journey. Our Parent Council (PC) meets regularly to discuss school improvements, organize community events, and support our mission to provide the best kindergarten experience.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-maple-red font-bold text-lg hover:gap-4 transition-all">
                  Join the Parent Council <ArrowRight size={24} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
