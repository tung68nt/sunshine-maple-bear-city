'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CanvaHeader } from '../CanvaHeader'
import { CanvaFooter } from '../CanvaFooter'
import { CanvaContactFormSection } from '../home/ContactFormSection'
import { Award, BookOpen, Users, Star } from 'lucide-react'

export function CanvaFoundingFamiliesPageContent() {
  const privileges = [
    {
      title: 'Enduring Commitment',
      desc: 'Privileges maintained throughout continuous enrollment.',
      icon: Award,
    },
    {
      title: 'Priority Educational Access',
      desc: 'Priority entry to specialized workshops & educational advisory.',
      icon: BookOpen,
    },
    {
      title: 'Distinguished Community Engagement',
      desc: 'Exclusive invitations to parent networking events.',
      icon: Users,
    },
    {
      title: 'Bespoke Founding Privileges',
      desc: 'Curated honors announced across school operational phases.',
      icon: Star,
    },
  ]

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B2321] flex flex-col justify-between">
      <CanvaHeader />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative w-full h-[50vh] sm:h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
          <Image
            src="/images/render/THU_VIEN_1_.jpg"
            alt="Founding Families Sunshine Maple Bear"
            fill
            priority
            className="object-cover object-center filter brightness-[0.6] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative text-center px-4">
            <h1 className="font-canva-heading text-4xl sm:text-6xl lg:text-7xl tracking-[0.1em] text-white uppercase font-normal">
              Founding Families
            </h1>
          </div>
        </section>

        {/* Section 1: Become One of Our 40 Founding Families */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-semibold block">
                Exclusive Opportunity
              </span>

              <h2 className="font-canva-heading text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#2B2321] leading-tight">
                Become <br />
                One of Our
              </h2>

              <div className="font-canva-heading text-7xl sm:text-8xl lg:text-9xl text-[#C5A059] font-light tracking-tight leading-none">
                40
              </div>

              <h3 className="font-canva-heading text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.1em] text-[#8B1B1E]">
                Founding Families
              </h3>

              <div className="pt-4">
                <a
                  href="#contact-section"
                  className="inline-block px-8 py-3 text-xs font-serif uppercase tracking-[0.2em] border border-[#8B1B1E] text-[#8B1B1E] hover:bg-[#8B1B1E] hover:text-white transition-all shadow-xs"
                >
                  Register interest
                </a>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-6 relative h-80 sm:h-96 lg:h-[460px] w-full overflow-hidden shadow-lg border border-[#C5A059]/20">
              <Image
                src="/images/teacher_child_learning.jpg"
                alt="Sunshine Maple Bear Founding Families"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Red Exclusive 30% Scholarship Banner */}
        <section className="bg-[#8B1B1E] text-white py-16 sm:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Photo of Child */}
              <div className="lg:col-span-6 relative h-72 sm:h-96 w-full rounded-xs overflow-hidden shadow-xl border-2 border-white/20">
                <Image
                  src="/images/smiling_founding_child.jpg"
                  alt="Happy child enjoying 30% scholarship"
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Right Big 30% Banner */}
              <div className="lg:col-span-6 text-center lg:text-left space-y-4">
                <h3 className="font-canva-heading text-2xl sm:text-3xl uppercase tracking-[0.15em] text-white font-light">
                  And Enjoy An Exclusive
                </h3>

                <div className="font-canva-heading text-7xl sm:text-8xl lg:text-9xl text-[#C5A059] font-light leading-none tracking-tight">
                  30%
                </div>

                <div className="font-canva-heading text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.12em] text-white">
                  Tuition Scholarship
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 4 Privileges */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {privileges.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 border border-[#E8E4DF] shadow-xs flex flex-col justify-between hover:border-[#8B1B1E] transition-colors rounded-xs group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#8B1B1E]/10 flex items-center justify-center text-[#8B1B1E] mb-6 group-hover:bg-[#8B1B1E] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h4 className="font-canva-heading text-lg sm:text-xl text-[#2B2321] uppercase tracking-wide mb-3">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-sans text-[#665E5C] leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Contact Form Section */}
        <CanvaContactFormSection />
      </main>

      <CanvaFooter />
    </div>
  )
}
