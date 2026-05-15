'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { ShieldCheck, Eye, Users, Phone, FileText, Lock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function SafeguardingPage() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Vetted Staff',
      desc: 'All employees undergo rigorous background checks and international police clearances before joining our team.'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'CCTV Monitoring',
      desc: 'Comprehensive camera coverage in all common areas and classrooms, monitored by our 24/7 security team.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Secure Campus',
      desc: 'Strict access control systems ensuring that only authorized parents and staff can enter the learning areas.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Regular Training',
      desc: 'Staff receive bi-annual training on child protection, first aid, and emergency response protocols.'
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
              src={SCHOOL_IMAGES.render.hanhLang2}
              alt="Safeguarding & Safety"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-maple-black via-maple-black/60 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-md mb-4">
                <ShieldCheck size={18} className="text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Safety First Environment</span>
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight">
                Our Highest <span className="text-maple-gold">Priority</span>
              </h1>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                At Sunshine Maple Bear, we are committed to providing a safe, secure, and nurturing environment where every child can flourish.
              </p>
            </div>
          </div>
        </section>

        {/* Commitment Statement */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black">Zero Tolerance Policy</h2>
              <p className="text-lg text-neutral-600 font-light leading-relaxed">
                We have a zero-tolerance policy towards any form of child abuse or neglect. Our safeguarding framework is aligned with international best practices and Vietnamese law to ensure the physical and emotional well-being of our students.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
                {pillars.map((pillar, idx) => (
                  <div key={idx} className="p-8 bg-neutral-50 rounded-[32px] text-left border border-neutral-100">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-maple-red shadow-sm mb-4">
                      {pillar.icon}
                    </div>
                    <h4 className="font-bold text-maple-black mb-2">{pillar.title}</h4>
                    <p className="text-sm text-neutral-500">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reporting Section */}
        <section className="py-24 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[56px] shadow-sm border border-neutral-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-20 space-y-8">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-maple-black">Voice Your Concerns</h3>
                <p className="text-neutral-500 leading-relaxed font-light">
                  We encourage parents, staff, and students to report any safety concerns immediately. Our Designated Safeguarding Lead (DSL) is available to handle all reports with the strictest confidentiality.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-6 bg-neutral-50 rounded-2xl">
                    <div className="w-10 h-10 bg-maple-red text-white rounded-full flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Emergency Hotline</p>
                      <p className="text-lg font-bold text-maple-black">024 7303 6655</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-neutral-50 rounded-2xl">
                    <div className="w-10 h-10 bg-maple-gold text-white rounded-full flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Email DSL</p>
                      <p className="text-lg font-bold text-maple-black">safety@smb.edu.vn</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[400px]">
                <Image src={SCHOOL_IMAGES.render.hanhLang1} alt="Safety support" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl font-display font-bold text-maple-black">Download Our Policies</h2>
              <p className="text-neutral-500">For a detailed look at our procedures, please download the full Safeguarding Handbook.</p>
              <button className="px-10 py-4 bg-maple-black text-white font-bold rounded-2xl hover:bg-neutral-800 transition-all flex items-center gap-2 mx-auto">
                <FileText size={20} />
                Download Handbook (PDF)
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
