'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useState } from 'react'
import { Plus, Minus, HelpCircle, MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { SCHOOL_INFO, SCHOOL_IMAGES } from '@/lib/constants'

const faqs = [
  {
    category: 'Admissions & Enrollment',
    questions: [
      {
        q: 'What age range does the school accept and how are class levels structured?',
        a: 'Sunshine Maple Bear Sunshine City accepts children from 18 months to 6 years old. Classes are structured by key developmental stages: Toddler (18–36 months) focuses on motor skills and early language; Nursery (3–4 years) develops social skills; Junior Kindergarten (4–5 years) introduces early literacy and numeracy; Senior Kindergarten (5–6 years) prepares children with a solid foundation for Grade 1 at top primary schools.'
      },
      {
        q: 'What does the developmental assessment process look like?',
        a: 'This is a friendly, informal meeting between teachers, a child development specialist, and your child. We do not test academic knowledge — rather, we observe the child\'s social interaction, curiosity, and basic motor skills. This helps us recommend the best learning pathway and home-school collaboration strategy for your child\'s development.'
      },
      {
        q: 'What documents are required for enrollment?',
        a: 'Parents need to prepare: 1 copy of the birth certificate or passport; 4 passport-sized photos (3x4cm); a copy of the vaccination record; parents\'/guardians\' ID copies; and the completed Enrollment Application Form provided by the school. Our admissions team will assist you in completing the entire process within 30 minutes.'
      },
      {
        q: 'Does the school accept mid-term enrollment?',
        a: 'Yes, we accept new students at any point during the academic year, subject to class availability. However, we recommend enrolling at the beginning of a learning term so your child can more easily integrate with the curriculum and classmates.'
      }
    ]
  },
  {
    category: 'Curriculum & Language',
    questions: [
      {
        q: 'What is the teacher-to-student ratio in each class?',
        a: 'We maintain a golden ratio to ensure every child receives close attention. For the Toddler program, the ratio is 1:5; Nursery and Kindergarten classes maintain 1:8 or 1:10 depending on the class. Every class has at least 2–3 teachers (including international and local educators) plus a dedicated teaching assistant.'
      },
      {
        q: 'How much English instruction does each child receive?',
        a: 'At Sunshine Maple Bear Sunshine City, all learning activities are conducted in 100% English throughout the day. Unlike our other bilingual campuses, this location provides a fully international, English-medium environment. Children acquire English naturally through every activity — from STEAM and literacy to meal times and outdoor play.'
      },
      {
        q: 'Is it possible for children to learn a second language at such a young age without confusion?',
        a: 'Scientific research has proven that young children\'s brains are exceptionally capable of acquiring multiple languages simultaneously. At Maple Bear, we use research-backed immersion techniques with clear contextual separation, helping children develop independent language reflexes and cognitive flexibility that surpasses monolingual peers.'
      },
      {
        q: 'Does the school offer extracurricular or enrichment activities?',
        a: 'Yes! Beyond the core curriculum, children participate in integrated enrichment classes including: Orff Schulwerk music, Creative Arts, specialized gymnastics for physical development, and monthly themed field trips aligned with learning objectives — all conducted in English.'
      }
    ]
  },
  {
    category: 'Care & Nutrition',
    questions: [
      {
        q: 'How does the school ensure food safety?',
        a: '100% of food at Sunshine Maple Bear is sourced from certified, reputable suppliers with full VietGAP/GlobalGAP certifications. Fresh ingredients are delivered daily, and food samples are kept for 24 hours per Ministry of Health regulations. Our kitchen follows a one-way flow design to ensure absolute hygiene from preparation to serving.'
      },
      {
        q: 'Can you accommodate children with special dietary needs?',
        a: 'Absolutely. We provide individualized meal plans for children with food allergies (eggs, dairy, seafood, etc.), religious dietary requirements, or special health conditions, under the supervision of our health officer and homeroom teacher.'
      },
      {
        q: 'How can parents stay informed about their child\'s daily activities?',
        a: 'Meal details, nap quality, learning activities, and teacher comments are updated daily through our school communication app. In addition, homeroom teachers are always available for direct conversations with parents via phone or during pick-up/drop-off times.'
      }
    ]
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>('0-0')

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-30">
            <Image
              src={SCHOOL_IMAGES.render.phongChucNang1}
              alt="Support and information center at Sunshine Maple Bear"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-maple-black via-maple-black/80 to-transparent" />
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maple-gold/10 border border-maple-gold/20 backdrop-blur-md">
                <HelpCircle size={18} className="text-maple-gold" />
                <span className="text-sm font-bold uppercase tracking-widest text-white">Help Center</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                Frequently <span className="text-maple-gold">Asked</span> <br />Questions
              </h1>
              <p className="text-xl text-white/70 font-light max-w-xl leading-relaxed">
                Everything you need to know about learning pathways, our international environment, and care at Sunshine Maple Bear — all in one place.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-4 space-y-12">
                <div className="sticky top-24 p-10 bg-neutral-50 rounded-[48px] border border-neutral-100 shadow-sm">
                  <h3 className="text-2xl font-display font-bold text-maple-black mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-maple-red/10 flex items-center justify-center text-maple-red">
                      <HelpCircle size={18} />
                    </div>
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {faqs.map((cat, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left px-6 py-4 rounded-2xl text-sm font-bold text-neutral-500 hover:bg-white hover:text-maple-red hover:shadow-md transition-all border border-transparent hover:border-neutral-100"
                        onClick={() => {
                          const element = document.getElementById(`cat-${idx}`)
                          element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                      >
                        {cat.category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-10 bg-maple-red rounded-[48px] text-white space-y-8 shadow-2xl shadow-maple-red/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <MessageCircle size={100} />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <h4 className="text-2xl font-display font-bold leading-tight">Still have questions?</h4>
                    <p className="text-white/70 text-sm font-light leading-relaxed">Our admissions team is always ready to help you.</p>
                    <div className="space-y-4 pt-2 border-t border-white/10">
                      <a href={`tel:${SCHOOL_INFO.PHONE}`} className="flex items-center gap-4 group/link">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-maple-red transition-all">
                          <Phone size={20} />
                        </div>
                        <span className="text-lg font-bold">{SCHOOL_INFO.PHONE}</span>
                      </a>
                      <a href={`mailto:${SCHOOL_INFO.EMAIL}`} className="flex items-center gap-4 group/link">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-maple-red transition-all">
                          <Mail size={20} />
                        </div>
                        <span className="text-lg font-bold">{SCHOOL_INFO.EMAIL}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="lg:col-span-8 space-y-24">
                {faqs.map((cat, catIdx) => (
                  <div key={catIdx} id={`cat-${catIdx}`} className="space-y-10 scroll-mt-24">
                    <div className="space-y-4">
                      <span className="text-maple-red font-bold uppercase tracking-widest text-sm">TOPIC</span>
                      <h2 className="text-4xl font-display font-bold text-maple-black flex items-center gap-4">
                        {cat.category}
                      </h2>
                    </div>
                    <div className="space-y-6">
                      {cat.questions.map((faq, qIdx) => {
                        const id = `${catIdx}-${qIdx}`
                        const isOpen = openIndex === id
                        return (
                          <div
                            key={qIdx}
                            className={`group rounded-[40px] border transition-all duration-500 overflow-hidden ${
                              isOpen ? 'bg-neutral-50 border-maple-gold/30 shadow-2xl' : 'bg-white border-neutral-100 hover:border-neutral-200'
                            }`}
                          >
                            <button
                              onClick={() => toggleFAQ(id)}
                              className="w-full flex items-center justify-between p-8 md:p-10 text-left focus:outline-none"
                              aria-expanded={isOpen}
                            >
                              <span className={`text-xl font-bold transition-colors leading-tight pr-4 ${isOpen ? 'text-maple-red' : 'text-maple-black'}`}>
                                {faq.q}
                              </span>
                              <div className={`flex-shrink-0 w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-500 ${
                                isOpen ? 'bg-maple-red border-maple-red text-white rotate-180 shadow-lg shadow-maple-red/20' : 'bg-white border-neutral-100 text-neutral-400 group-hover:border-maple-red group-hover:text-maple-red'
                              }`}>
                                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                              </div>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                              <div className="px-8 md:px-10 pb-10 pt-2 text-neutral-500 text-lg font-light leading-relaxed">
                                <div className="pt-8 border-t border-neutral-100/50">
                                  {faq.a}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 bg-neutral-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-maple-red/5 -z-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto text-maple-red transform hover:scale-110 transition-transform">
                <MessageCircle size={40} />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-maple-black leading-tight">Prefer to speak with us directly?</h2>
                <p className="text-xl text-neutral-500 font-light max-w-2xl mx-auto leading-relaxed">Don&apos;t hesitate to reach out for a more personalized consultation about your child&apos;s unique situation and the best developmental pathway.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contact" className="px-12 py-5 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 transform hover:scale-105 active:scale-95">
                  Contact Us Now
                </Link>
                <Link href="/admission" className="px-12 py-5 bg-white text-maple-black font-bold rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all flex items-center gap-3 shadow-sm transform hover:scale-105 active:scale-95">
                  Apply for Enrollment <ArrowRight size={20} />
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
