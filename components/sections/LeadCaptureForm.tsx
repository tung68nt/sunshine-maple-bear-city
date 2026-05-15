'use client'

import { useState } from 'react'
import { CheckCircle2, MapPin, Phone, Mail, Sparkles, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { SCHOOL_IMAGES, SCHOOL_INFO } from '@/lib/constants'

export function LeadCaptureForm() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    childAge: '',
    campus: '',
    note: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-maple-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-30">
        <Image 
          src={SCHOOL_IMAGES.render.lopHoc3}
          alt="Maple Bear Classroom Environment"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-maple-black via-maple-black/80 to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-maple-red opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-maple-gold opacity-5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Info */}
          <div className="space-y-10 text-white animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maple-gold/10 border border-maple-gold/20 backdrop-blur-md">
                <Sparkles size={16} className="text-maple-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-maple-gold">Admissions 2026</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                The Journey of <br />Joy <span className="text-maple-gold">Begins Here</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-lg">
                Give your child the finest Canadian international early learning experience in a 100% English environment from the very first years of life.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Phone size={20} />, title: 'Hotline', text: SCHOOL_INFO.PHONE, href: `tel:${SCHOOL_INFO.PHONE}` },
                { icon: <Mail size={20} />, title: 'Email', text: SCHOOL_INFO.EMAIL, href: `mailto:${SCHOOL_INFO.EMAIL}` },
                { icon: <MapPin size={20} />, title: 'Address', text: 'Sunshine City, Ciputra, Hanoi', href: '#' },
              ].map((item, idx) => (
                <a key={idx} href={item.href} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-maple-gold border border-white/10 group-hover:bg-maple-gold group-hover:text-maple-black transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{item.title}</p>
                    <p className="text-white font-bold group-hover:text-maple-gold transition-colors">{item.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl relative" role="region" aria-label="Enrollment inquiry form">
            {isSubmitted ? (
              <div className="text-center py-16 space-y-6 animate-fade-in" aria-live="polite">
                <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-3xl text-maple-black">Thank You!</h3>
                  <p className="text-neutral-500">Our admissions team will contact you within 24 hours.</p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all focus:ring-4 focus:ring-maple-red/20"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Book a school tour">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-maple-black">
                    Book a Campus Tour
                  </h3>
                  <p className="text-sm text-neutral-600 font-light italic">* Please fill in your details for a complimentary consultation.</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <label htmlFor="lead-name" className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest ml-1 mb-1 block">Parent&apos;s Name *</label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      autoComplete="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-maple-black focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label htmlFor="lead-phone" className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest ml-1 mb-1 block">Phone Number *</label>
                      <input
                        id="lead-phone"
                        type="tel"
                        required
                        placeholder="+84 xxx xxx xxx"
                        autoComplete="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-maple-black focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all"
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor="lead-email" className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest ml-1 mb-1 block">Email</label>
                      <input
                        id="lead-email"
                        type="email"
                        placeholder="parent@example.com"
                        autoComplete="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-maple-black focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label htmlFor="lead-age" className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest ml-1 mb-1 block">Child&apos;s Age</label>
                      <select
                        id="lead-age"
                        value={formState.childAge}
                        onChange={(e) => setFormState({ ...formState, childAge: e.target.value })}
                        className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-maple-black focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select age range</option>
                        <option value="12m-24m">12 – 24 months</option>
                        <option value="2-3">2 – 3 years old</option>
                        <option value="3-4">3 – 4 years old</option>
                        <option value="4-5">4 – 5 years old</option>
                      </select>
                    </div>
                    <div className="relative">
                      <label htmlFor="lead-campus" className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest ml-1 mb-1 block">Preferred Campus</label>
                      <select
                        id="lead-campus"
                        value={formState.campus}
                        onChange={(e) => setFormState({ ...formState, campus: e.target.value })}
                        className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-maple-black focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all appearance-none cursor-pointer"
                      >
                        <option value="sunshine-city">Sunshine City, Ciputra</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="lead-note" className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest ml-1 mb-1 block">Additional Notes</label>
                    <textarea
                      id="lead-note"
                      rows={2}
                      placeholder="Any specific questions or requirements..."
                      value={formState.note}
                      onChange={(e) => setFormState({ ...formState, note: e.target.value })}
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-maple-black focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  aria-label="Submit enrollment inquiry"
                  className="w-full py-5 bg-maple-red text-white font-display font-bold text-lg rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 flex items-center justify-center gap-3 group focus:ring-4 focus:ring-maple-red/20"
                >
                  Submit Inquiry
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
