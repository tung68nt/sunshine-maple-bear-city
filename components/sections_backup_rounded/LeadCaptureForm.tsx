'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight, X, Sparkles } from 'lucide-react'
import { SCHOOL_INFO } from '@/lib/constants'

export function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    childName: '',
    dob: '',
    currentSchool: '',
    enquiry: '',
  })

  const [showPopup, setShowPopup] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      childName: '',
      dob: '',
      currentSchool: '',
      enquiry: '',
    })
  }

  return (
    <section id="contact-us" className="py-24 lg:py-32 bg-[#151513] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maple-gold/15 border border-maple-gold/30 backdrop-blur-md">
                <Sparkles size={16} className="text-maple-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-maple-gold">Contact Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
                Contact <span className="font-serif italic font-normal text-amber-200">Us</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                If you have any questions, please fill in the form below and we will get in touch as soon as possible.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/15">
              <a href={`tel:${SCHOOL_INFO.PHONE}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-maple-gold transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-maple-gold/20 text-maple-gold flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">Hotline</span>
                  <span className="text-white font-display font-bold group-hover:text-maple-gold transition-colors">{SCHOOL_INFO.PHONE}</span>
                </div>
              </a>

              <a href={`mailto:${SCHOOL_INFO.EMAIL}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-maple-gold transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-maple-gold/20 text-maple-gold flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">Email</span>
                  <span className="text-white font-display font-bold group-hover:text-maple-gold transition-colors">{SCHOOL_INFO.EMAIL}</span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-maple-red/20 text-maple-red flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">Campus Address</span>
                  <span className="text-sm font-display font-medium text-white leading-snug">
                    S4 Building, Sunshine City, Nam Thang Long Urban Area, Phu Thuong Ward, Hanoi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card with Soft Rounded Corners (7 cols) */}
          <div className="lg:col-span-7 bg-white text-[#1D1D1B] p-8 sm:p-10 rounded-3xl shadow-2xl border border-neutral-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-neutral-200 pb-4 mb-6">
                <h3 className="font-display font-extrabold text-2xl text-[#1D1D1B]">
                  Send Us A Message
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1">
                  Fields marked with an asterisk (*) are required.
                </p>
              </div>

              {/* 1. Full Name */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-maple-red transition-colors"
                />
              </div>

              {/* 2. Phone & 3. Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Your Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-maple-red transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-maple-red transition-colors"
                  />
                </div>
              </div>

              {/* 4. Child's Name & 5. Date of Birth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Your Child&apos;s Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter child's full name"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-maple-red transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Date of Birth (dd/mm/yyyy) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="dd/mm/yyyy"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-maple-red transition-colors"
                  />
                </div>
              </div>

              {/* 6. Current School */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                  Current School
                </label>
                <input
                  type="text"
                  placeholder="Name of current school or kindergarten (optional)"
                  value={formData.currentSchool}
                  onChange={(e) => setFormData({ ...formData, currentSchool: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-maple-red transition-colors"
                />
              </div>

              {/* 7. Your Enquiry */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                  Your Enquiry *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="How can we assist your family?"
                  value={formData.enquiry}
                  onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-maple-red transition-colors resize-none"
                />
              </div>

              {/* Submit Button: Smooth Rounded Pill */}
              <button
                type="submit"
                className="w-full py-4 bg-maple-red text-white font-display font-bold text-sm rounded-full hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-3 mt-4 active:scale-95"
              >
                <span>Submit Message</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Confirmation Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-[#1D1D1B] p-8 rounded-3xl max-w-md w-full text-center relative border border-neutral-300 shadow-2xl">
            <button
              onClick={closePopup}
              aria-label="Close"
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-2 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>

            <h3 className="text-2xl font-display font-extrabold text-[#1D1D1B] mb-3">
              Thank You!
            </h3>

            <p className="text-xs text-neutral-600 font-light leading-relaxed mb-6">
              Thank you for your interest in Sunshine Maple Bear International Kindergarten. Our Admissions Team will contact you within one business day to arrange your personalized school tour.
            </p>

            <button
              onClick={closePopup}
              className="px-8 py-3 bg-maple-red text-white font-display font-bold text-xs rounded-full hover:bg-red-700 transition-colors shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
