'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { Wallet, GraduationCap, FileText, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function TuitionPage() {
  const fees = [
    { name: 'Teddy Bears (12m - 24m)', monthly: '12,500,000 VND', annual: '125,000,000 VND' },
    { name: 'Koala Bears (2y - 3y)', monthly: '12,500,000 VND', annual: '125,000,000 VND' },
    { name: 'Panda Bears (3y - 4y)', monthly: '13,500,000 VND', annual: '135,000,000 VND' },
    { name: 'Sun & Polar Bears (4y - 5y)', monthly: '13,500,000 VND', annual: '135,000,000 VND' },
  ]

  const otherFees = [
    { item: 'Registration Fee', cost: '5,000,000 VND', frequency: 'One-time (Non-refundable)' },
    { item: 'Development Fee', cost: '6,000,000 VND', frequency: 'Annual' },
    { item: 'Uniform Package', cost: '2,500,000 VND', frequency: 'Annual' },
    { item: 'Material & Activity Fee', cost: '4,000,000 VND', frequency: 'Annual' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-40">
            <Image
              src={SCHOOL_IMAGES.render.hanhLang1}
              alt="Admissions & Tuition"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-maple-black via-maple-black/60 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maple-gold/20 border border-maple-gold/30 backdrop-blur-md mb-4">
                <Wallet size={18} className="text-maple-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Transparent Pricing 2026</span>
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight">
                Invest in Your Child&apos;s <span className="text-maple-gold">Future</span>
              </h1>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                World-class Canadian education at Sunshine Maple Bear. We are committed to transparency and value in every aspect of our program.
              </p>
            </div>
          </div>
        </section>

        {/* Tuition Table */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black">Tuition Structure</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-lg">Detailed fees for the 2026-2027 academic year.</p>
            </div>
            
            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-100">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100">
                    <th className="p-8 text-sm font-bold uppercase tracking-widest text-neutral-600">Grade Level</th>
                    <th className="p-8 text-sm font-bold uppercase tracking-widest text-neutral-600">Monthly Plan</th>
                    <th className="p-8 text-sm font-bold uppercase tracking-widest text-neutral-600">Annual Plan (10% Discount)</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee, idx) => (
                    <tr key={idx} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                      <td className="p-8 font-display font-bold text-maple-black text-lg">{fee.name}</td>
                      <td className="p-8 text-neutral-600 font-medium">{fee.monthly}</td>
                      <td className="p-8 text-maple-red font-bold">{fee.annual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Other Fees & Discounts */}
        <section className="py-24 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h3 className="text-3xl font-display font-bold text-maple-black">Ancillary Fees</h3>
                <div className="space-y-4">
                  {otherFees.map((fee, idx) => (
                    <div key={idx} className="flex justify-between items-center p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                      <div>
                        <h4 className="font-bold text-maple-black">{fee.item}</h4>
                        <p className="text-sm text-neutral-400">{fee.frequency}</p>
                      </div>
                      <div className="text-lg font-display font-bold text-maple-black">{fee.cost}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <h3 className="text-3xl font-display font-bold text-maple-black">Scholarships & Incentives</h3>
                <div className="p-10 bg-maple-gold/5 rounded-[48px] border border-maple-gold/20 space-y-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-maple-gold shadow-sm">
                    <GraduationCap size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-maple-black">Founder&apos;s Scholarship</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Exclusive **20% discount** on tuition fees for the first 50 students enrolled at Sunshine City campus. This scholarship is valid for the entire duration of the child&apos;s study at our kindergarten.
                  </p>
                  <ul className="space-y-3">
                    {['Sibling discount: 5-10%', 'Corporate partner discounts', 'Early bird payment incentives'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-bold text-maple-gold">
                        <CheckCircle2 size={18} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Link href="/admissions" className="inline-flex items-center gap-2 text-maple-red font-bold hover:gap-3 transition-all">
                      Apply for Scholarship <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Policies */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <FileText size={48} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black">Financial Policies</h2>
              <p className="text-xl text-neutral-500 font-light max-w-2xl mx-auto">
                Please review our detailed payment terms, refund policies, and withdrawal notice requirements. We are here to help you plan your child&apos;s educational journey.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contact" className="px-12 py-5 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 transform hover:scale-105">Request Full Fee Schedule</Link>
                <Link href="/faq" className="px-12 py-5 bg-white text-maple-black font-bold rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all">Finance FAQs</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
