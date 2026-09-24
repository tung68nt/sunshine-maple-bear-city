'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CanvaHeader } from '../CanvaHeader'
import { CanvaFooter } from '../CanvaFooter'
import { CanvaContactFormSection } from '../home/ContactFormSection'
import { BookOpen, Globe2, Sparkles, Star, ArrowRight } from 'lucide-react'

export function CanvaAboutPageContent() {
  const keyFigures = [
    { number: '37+', label: 'COUNTRIES WORLDWIDE', image: '/images/render/LOP_HOC_DIEN_HINH_3_.jpg' },
    { number: '100%', label: 'NATIVE OCT EDUCATORS', image: '/images/ms_jennifer.jpg' },
    { number: '500+', label: 'GLOBAL SCHOOLS', image: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg' },
    { number: '100%', label: 'ENGLISH IMMERSION', image: '/images/canadian_curriculum_kids.jpg' },
  ]

  const specialPillars = [
    {
      title: 'Authentic Canadian Curriculum',
      desc: 'Authentic Canadian Early Childhood Curriculum designed by leading global educational experts.',
      icon: BookOpen,
      href: '/academics',
    },
    {
      title: '100% English Immersion',
      desc: '100% English Immersion environment developing natural bilingual fluency without translation pressure.',
      icon: Globe2,
      href: '/about/why-maple-bear',
    },
    {
      title: '5-Star Modern Campus',
      desc: '5-Star Modern Campus Facilities located inside Sunshine City urban complex.',
      icon: Star,
      href: '/tour-booking',
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
            alt="About Sunshine Maple Bear"
            fill
            priority
            className="object-cover object-center filter brightness-[0.6] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative text-center px-4">
            <h1 className="font-canva-heading text-4xl sm:text-6xl lg:text-7xl tracking-[0.1em] text-white uppercase font-normal">
              About Us
            </h1>
          </div>
        </section>

        {/* Section 1: Introduction */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Red framed box */}
            <div className="lg:col-span-5 border-2 border-[#8B1B1E] p-8 sm:p-10 bg-white shadow-sm space-y-4">
              <span className="text-xs tracking-[0.2em] text-[#C5A059] uppercase font-semibold block">
                Introduction
              </span>
              <h2 className="font-canva-heading text-2xl sm:text-3xl text-[#8B1B1E] uppercase font-normal leading-tight">
                Sunshine Maple Bear <br />
                <span className="text-[#2B2321] text-xl sm:text-2xl">International Kindergarten</span>
              </h2>
              <p className="text-sm sm:text-base font-sans text-[#554D4B] leading-relaxed font-light pt-2">
                Maple Bear schools offer full Canadian programs utilizing Canadian methodology and curriculum developed by our own experts from the ground up for preschool, elementary, and high school.
              </p>
              <p className="text-sm sm:text-base font-sans text-[#554D4B] leading-relaxed font-light">
                We take our responsibility to our students and their parents very seriously. Strict quality controls ensure we deliver the very best Canadian practices in education.
              </p>
            </div>

            {/* Right Column: Classroom photo */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[450px] w-full overflow-hidden shadow-md">
              <Image
                src="/images/render/LOP_HOC_DIEN_HINH_4_.jpg"
                alt="Sunshine Maple Bear Facilities"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Educational Mission Quote */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative h-72 sm:h-96 w-full overflow-hidden shadow-md">
              <Image
                src="/images/teacher_child_learning.jpg"
                alt="Teacher caring for child"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="lg:col-span-6 bg-[#C5A059]/15 border border-[#C5A059]/40 p-8 sm:p-12 shadow-xs space-y-6">
              <blockquote className="font-serif italic text-base sm:text-lg lg:text-xl text-[#2B2321] leading-relaxed">
                “Our goal is to deliver a student-focused learning system in a safe, secure and stimulating environment that prepares students for success at a post secondary level and that instills a passion for lifelong learning. The Maple Bear Program is designed to educate the whole child - physically, intellectually, emotionally, and socially.”
              </blockquote>
              <div>
                <Link
                  href="/about/why-maple-bear"
                  className="inline-block px-6 py-2 text-xs font-serif uppercase tracking-[0.2em] border border-[#8B1B1E] text-[#8B1B1E] hover:bg-[#8B1B1E] hover:text-white transition-all rounded-xs"
                >
                  More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Key Figures */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E8E4DF]">
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <h2 className="font-canva-heading text-3xl sm:text-4xl uppercase tracking-[0.12em] text-[#2B2321]">
                Key Figures
              </h2>
              <div className="h-0.5 w-full bg-[#8B1B1E] mt-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFigures.map((fig, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E8E4DF] shadow-xs overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={fig.image}
                    alt={fig.label}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>
                <div className="p-6 text-center">
                  <div className="font-canva-heading text-3xl sm:text-4xl text-[#8B1B1E] font-light">
                    {fig.number}
                  </div>
                  <div className="text-xs tracking-wider uppercase text-[#665E5C] font-semibold mt-1">
                    {fig.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: What Makes Us Special */}
        <section className="py-20 bg-[#FAF6EF] border-t border-[#C5A059]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-canva-heading text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.1em] text-[#8B1B1E]">
                What Makes Us Special
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specialPillars.map((pillar, idx) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={idx}
                    className="bg-white p-8 border border-[#E8E4DF] shadow-xs flex flex-col justify-between hover:border-[#8B1B1E] transition-colors rounded-xs"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-full bg-[#8B1B1E]/10 flex items-center justify-center text-[#8B1B1E] mb-6">
                        <Icon className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <h3 className="font-canva-heading text-xl sm:text-2xl text-[#2B2321] uppercase tracking-wide mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-sm font-sans text-[#665E5C] leading-relaxed font-light">
                        {pillar.desc}
                      </p>
                    </div>
                    <div className="pt-6">
                      <Link
                        href={pillar.href}
                        className="inline-block px-5 py-1.5 text-xs font-serif uppercase tracking-widest border border-[#8B1B1E] text-[#8B1B1E] hover:bg-[#8B1B1E] hover:text-white transition-colors"
                      >
                        More
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Section 5: Our Invitation */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-canva-heading text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#8B1B1E]">
                Our Invitation
              </h2>
              <p className="text-base sm:text-lg font-sans text-[#554D4B] leading-relaxed font-light">
                At Sunshine Maple Bear International Kindergarten, pupils grow into confident learners, compassionate friends and thoughtful young leaders.
              </p>
              <p className="text-base sm:text-lg font-sans text-[#554D4B] leading-relaxed font-light">
                Together with families, we prepare pupils to flourish at school, in life and in the world beyond.
              </p>
              <div className="pt-2">
                <Link
                  href="/tour-booking"
                  className="inline-block px-8 py-3 text-xs font-serif uppercase tracking-[0.2em] border border-[#8B1B1E] text-[#8B1B1E] hover:bg-[#8B1B1E] hover:text-white transition-all shadow-xs"
                >
                  Book a visit
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-72 sm:h-96 w-full overflow-hidden shadow-lg border border-[#C5A059]/20">
              <Image
                src="/images/school_entrance_team.jpg"
                alt="Our Invitation to Sunshine Maple Bear"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <CanvaContactFormSection />
      </main>

      <CanvaFooter />
    </div>
  )
}
