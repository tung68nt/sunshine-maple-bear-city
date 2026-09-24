'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CanvaHeader } from '../CanvaHeader'
import { CanvaFooter } from '../CanvaFooter'
import { CanvaContactFormSection } from '../home/ContactFormSection'
import { Clock, CheckCircle2, Apple, ShieldCheck, Flame } from 'lucide-react'

export function CanvaAcademicsPageContent() {
  const agePrograms = [
    {
      age: '12M – 24M',
      title: 'Toddler Class',
      desc: 'Sensory discovery, gross motor & emotional bonding.',
    },
    {
      age: '2Y – 3Y',
      title: 'Nursery Class',
      desc: 'Natural English immersion, vocabulary & peer dialogue.',
    },
    {
      age: '3Y – 4Y',
      title: 'Junior Kindergarten',
      desc: 'Jolly Phonics, mathematical logic & science discovery.',
    },
    {
      age: '4Y – 5Y',
      title: 'Senior Kindergarten',
      desc: 'Advanced STEAM projects & Primary School readiness.',
    },
  ]

  const dailySchedule = [
    { time: '07:30 - 08:30', activity: 'Morning Health Check & Welcome Circle' },
    { time: '08:30 - 11:00', activity: 'Jolly Phonics & English Immersion Discovery' },
    { time: '11:30 - 14:00', activity: '5-Star Organic Lunch & Rest Time' },
    { time: '14:30 - 16:30', activity: 'STEAM Activity & Outdoor Sports' },
    { time: '16:30 - 17:30', activity: 'Farewell Circle & Parent Handover' },
  ]

  const nutritionPillars = [
    {
      badge: '100% ORGANIC',
      title: 'Certified Organic Farm',
      desc: 'Daily fresh delivery from accredited organic farms.',
      icon: Apple,
    },
    {
      badge: 'CALORIE BALANCED',
      title: 'Pediatric Dietitian Menu',
      desc: 'Calorie-balanced meals designed for child growth.',
      icon: Flame,
    },
    {
      badge: 'HYGIENE GUARANTEE',
      title: '5-Star Hygiene Standards',
      desc: '24-hour food sampling & microbiology audits.',
      icon: ShieldCheck,
    },
  ]

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B2321] flex flex-col justify-between">
      <CanvaHeader />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative w-full h-[50vh] sm:h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
          <Image
            src="/images/render/LOP_HOC_DIEN_HINH_5_.jpg"
            alt="Academics at Sunshine Maple Bear"
            fill
            priority
            className="object-cover object-center filter brightness-[0.6] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative text-center px-4">
            <h1 className="font-canva-heading text-4xl sm:text-6xl lg:text-7xl tracking-[0.1em] text-white uppercase font-normal">
              Academics
            </h1>
          </div>
        </section>

        {/* Section 1: Overview */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Crimson Overview Card */}
            <div className="lg:col-span-6 bg-[#8B1B1E] text-white p-8 sm:p-12 shadow-md space-y-4">
              <span className="text-xs tracking-[0.2em] text-[#C5A059] uppercase font-semibold block">
                Academic Excellence
              </span>
              <h2 className="font-canva-heading text-3xl sm:text-4xl uppercase tracking-[0.08em] font-normal leading-tight">
                Overview
              </h2>
              <p className="text-sm sm:text-base font-sans text-white/90 leading-relaxed font-light pt-2">
                Representing the pinnacle of Canadian education, Maple Bear International Kindergarten curates a premium bilingual early learning experience. From exclusive infant Bear Care to our gold-standard Preschool, we unlock your child's utmost cognitive potential.
              </p>
              <p className="text-sm sm:text-base font-sans text-white/90 leading-relaxed font-light">
                Through elite language immersion within a luxurious, secure environment, we build a solid launchpad for tomorrow's outstanding global citizens.
              </p>
            </div>

            {/* Right Column: Joyful Learning Photo */}
            <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-[440px] w-full overflow-hidden shadow-md">
              <Image
                src="/images/canadian_curriculum_kids.jpg"
                alt="Canadian early learning in action"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Early Childhood Programs (4 Age Brackets) */}
        <section className="py-20 bg-[#FAF6EF] border-t border-[#C5A059]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-canva-heading text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#2B2321]">
                Early Childhood Programs
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {agePrograms.map((prog, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 border border-[#E8E4DF] hover:border-[#8B1B1E] transition-all rounded-xs shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="font-canva-heading text-2xl sm:text-3xl text-[#8B1B1E] font-light block mb-2">
                      {prog.age}
                    </span>
                    <h3 className="font-canva-heading text-lg sm:text-xl text-[#2B2321] uppercase tracking-wide font-normal mb-3">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-[#665E5C] leading-relaxed font-light">
                      {prog.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: How Children Learn */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Photo Collage */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative h-56 sm:h-72 w-full overflow-hidden shadow-sm">
                <Image
                  src="/images/school_entrance_team.jpg"
                  alt="Educators smiling"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="relative h-56 sm:h-72 w-full overflow-hidden shadow-sm mt-6">
                <Image
                  src="/images/teacher_child_learning.jpg"
                  alt="Child learning through play"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right: Pedagogical Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-canva-heading text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#8B1B1E]">
                How Children Learn
              </h2>
              <p className="text-base sm:text-lg font-sans text-[#554D4B] leading-relaxed font-light">
                At Maple Bear, children assimilate knowledge organically through unhindered exploration and purposeful play.
              </p>
              <p className="text-base sm:text-lg font-sans text-[#554D4B] leading-relaxed font-light">
                Honoring each child's unique developmental pace, our immersive pedagogy translates active observation into practical application, masterfully cultivating innate curiosity, independent reasoning, and holistic problem-solving skills.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Weekly Plan (Daily Timetable) */}
        <section className="py-20 bg-[#FAF6EF] border-t border-[#C5A059]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Timetable List */}
              <div className="lg:col-span-6 space-y-6">
                <div className="border-b border-[#8B1B1E]/30 pb-4">
                  <h2 className="font-canva-heading text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#8B1B1E]">
                    Weekly Plan
                  </h2>
                </div>

                <div className="space-y-4">
                  {dailySchedule.map((slot, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-[#E8E4DF] flex items-center justify-between gap-4 rounded-xs shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                        <span className="font-mono text-xs sm:text-sm font-semibold text-[#8B1B1E]">
                          {slot.time}
                        </span>
                      </div>
                      <span className="font-sans text-xs sm:text-sm text-[#332C2B] text-right font-medium">
                        {slot.activity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/academics/daily-schedule"
                    className="inline-block px-6 py-2 text-xs font-serif uppercase tracking-widest border border-[#8B1B1E] text-[#8B1B1E] hover:bg-[#8B1B1E] hover:text-white transition-all shadow-xs"
                  >
                    View detailed daily routine
                  </Link>
                </div>
              </div>

              {/* Classroom Photo */}
              <div className="lg:col-span-6 relative h-80 sm:h-96 lg:h-[460px] w-full overflow-hidden shadow-md">
                <Image
                  src="/images/render/LOP_HOC_DIEN_HINH_2_.jpg"
                  alt="Classroom daily plan environment"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Nutrition & Program Meal */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left: Crimson Block + Meal Image */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="bg-[#8B1B1E] text-white p-8 sm:p-10 shadow-md flex items-center justify-between gap-6">
                <div>
                  <span className="text-xs tracking-[0.2em] text-[#C5A059] uppercase font-semibold">
                    Wholesome Growth
                  </span>
                  <h2 className="font-canva-heading text-2xl sm:text-3xl lg:text-4xl tracking-[0.08em] uppercase font-normal mt-1">
                    Nutrition & <br />
                    Program Meal
                  </h2>
                </div>
                <Link
                  href="/academics/nutrition"
                  className="px-5 py-2 text-xs font-serif uppercase tracking-[0.15em] border border-white/60 text-white hover:bg-white hover:text-[#8B1B1E] transition-all rounded-xs shrink-0"
                >
                  Find out more
                </Link>
              </div>

              <div className="relative h-72 sm:h-96 w-full rounded-xs overflow-hidden shadow-md border border-[#C5A059]/20">
                <Image
                  src="/images/organic_kids_meal.jpg"
                  alt="5-Star Organic Meals at Sunshine Maple Bear"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right: 3 Golden/Tan Cards */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              {nutritionPillars.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="bg-[#EFE6D8]/80 hover:bg-[#EAE0D0] transition-colors p-6 sm:p-8 rounded-xs border border-[#D8C7B0] flex items-start gap-5 shadow-xs"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#8B1B1E]/10 flex items-center justify-center text-[#8B1B1E] shrink-0">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-[#8B1B1E] block mb-1">
                        {item.badge}
                      </span>
                      <h3 className="font-canva-heading text-xl sm:text-2xl text-[#2B2321] tracking-wide font-normal mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-sans text-[#665E5C] leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
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
