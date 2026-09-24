'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CanvaHeader } from '../CanvaHeader'
import { CanvaFooter } from '../CanvaFooter'
import { CanvaContactFormSection } from '../home/ContactFormSection'

export function CanvaAdmissionsPageContent() {
  const steps = [
    {
      step: '1',
      title: 'Experience Sunshine Maple Bear',
      desc: 'Nothing compares to experiencing our school firsthand. We warmly encourage families to visit us through an Open Day or an individual school tour. This visit provides a clear insight into our child-centered approach, an opportunity to meet our caring educators, and a true sense of the loving, inspiring community we build every day.',
      cta: { label: 'Book a visit', href: '/tour-booking' },
    },
    {
      step: '2',
      title: 'Application & Inquiry',
      desc: 'When you feel Sunshine Maple Bear International Kindergarten aligns with your family’s vision, the next step is to register your interest. This enables our Admissions Team to provide personalized care, share timely information, and assist you seamlessly throughout the entire admissions journey.',
    },
    {
      step: '3',
      title: 'Our Approach to Assessment',
      desc: 'We view assessment as a way to deeply understand each child as a unique individual. Through gentle, play-based observation and a collaborative conversation with parents, this pressure-free experience allows us to learn about your child’s milestones and school readiness in a warm environment where they can naturally shine.',
    },
    {
      step: '4',
      title: 'Offer of Admission',
      desc: 'Following the admissions process, families will be promptly notified of the outcome. When an offer of admission is extended, it reflects our complete confidence that your child will thrive within Sunshine Maple Bear\'s warm, Canadian educational environment—growing happily, confidently, and holistically.',
    },
    {
      step: '5',
      title: 'Joining Our Community',
      desc: 'Upon confirming enrollment, your family officially becomes part of the Sunshine Maple Bear family. We share thoughtful preparation guidelines and host orientation activities so both parents and children feel completely at home. From day one of confirmation, our team walks hand-in-hand with your family to guarantee a seamless and happy transition for your child.',
      cta: { label: 'Register interest', href: '/admissions/founding-families' },
    },
  ]

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B2321] flex flex-col justify-between">
      <CanvaHeader />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative w-full h-[50vh] sm:h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
          <Image
            src="/images/render/THU_VIEN_3_.jpg"
            alt="Admissions Sunshine Maple Bear"
            fill
            priority
            className="object-cover object-center filter brightness-[0.6] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative text-center px-4">
            <h1 className="font-canva-heading text-4xl sm:text-6xl lg:text-7xl tracking-[0.1em] text-white uppercase font-normal">
              Admissions
            </h1>
          </div>
        </section>

        {/* Section 1: A Most Distinguished Welcome */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Welcome Text */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-canva-heading text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#8B1B1E] leading-tight">
                A Most Distinguished Welcome
              </h2>
              <div className="space-y-4 text-base sm:text-lg font-sans text-[#554D4B] leading-relaxed font-light">
                <p>Welcome to Sunshine Maple Bear International Kindergarten.</p>
                <p>
                  Powered by Canada's world-leading educational methodology, we are proud to offer a safe, loving environment where curiosity and holistic growth thrive. In our care, every child is valued as an independent learner, encouraged to explore and excel through proven Canadian inquiry-based learning.
                </p>
                <p>
                  Understanding that choosing a school is a vital choice, our Admissions Team is committed to walking alongside you with transparent, dedicated, and tailored guidance at every stage.
                </p>
                <p>
                  We look forward to welcoming you and partnering with your family to pave the way for your children’s future.
                </p>
              </div>
            </div>

            {/* Right: Picture */}
            <div className="lg:col-span-5 relative h-80 sm:h-96 lg:h-[460px] w-full overflow-hidden shadow-lg border border-[#C5A059]/20">
              <Image
                src="/images/teacher_child_learning.jpg"
                alt="Welcoming families to Sunshine Maple Bear"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Admissions Process Roadmap */}
        <section className="py-20 bg-[#FAF6EF] border-t border-[#C5A059]/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16 space-y-3">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 sm:w-16 bg-[#C5A059]" />
                <span className="text-xs sm:text-sm tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
                  Navigate
                </span>
                <div className="h-px w-12 sm:w-16 bg-[#C5A059]" />
              </div>
              <h2 className="font-canva-heading text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#8B1B1E]">
                Admissions Process
              </h2>
              <blockquote className="text-base sm:text-lg font-serif italic text-[#665E5C] max-w-xl mx-auto">
                “Below is a clear, step-by-step guide designed to support your family throughout this admissions journey.”
              </blockquote>
            </div>

            {/* Steps Container */}
            <div className="space-y-8">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="bg-white p-6 sm:p-10 border border-[#E8E4DF] shadow-xs relative flex flex-col md:flex-row md:items-start gap-6 hover:border-[#8B1B1E] transition-colors rounded-xs"
                >
                  {/* Step Number Badge */}
                  <div className="w-12 h-12 bg-[#C5A059]/20 border border-[#C5A059] text-[#8B1B1E] font-canva-heading text-2xl flex items-center justify-center shrink-0">
                    {item.step}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h3 className="font-canva-heading text-xl sm:text-2xl text-[#2B2321] uppercase tracking-wide">
                        {item.title}
                      </h3>
                      {item.cta && (
                        <Link
                          href={item.cta.href}
                          className="self-start sm:self-auto px-5 py-1.5 text-xs font-serif uppercase tracking-widest border border-[#8B1B1E] text-[#8B1B1E] hover:bg-[#8B1B1E] hover:text-white transition-colors"
                        >
                          {item.cta.label}
                        </Link>
                      )}
                    </div>
                    <p className="text-sm sm:text-base font-sans text-[#554D4B] leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
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
