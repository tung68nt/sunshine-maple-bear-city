'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Calendar, CheckCircle2, Loader2 } from 'lucide-react'

export function CanvaContactFormSection() {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    childName: '',
    dob: '',
    currentSchool: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise((res) => setTimeout(res, 800))
      setIsSuccess(true)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-section" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background Image: Canva classroom_reception spanning full width */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/canva/classroom_reception.png"
          alt="Sunshine Maple Bear Reception"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* Floating Ivory Glassmorphism Card */}
        <div className="max-w-xl bg-[#FAF5EE]/95 backdrop-blur-md p-8 sm:p-10 shadow-2xl rounded-xs border border-white/60">
          <div className="mb-6">
            <h2 className="font-canva-heading text-3xl sm:text-4xl tracking-[0.06em] text-[#2B2321] uppercase font-normal">
              Contact Us
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#554D4B] mt-2 font-light">
              If you have any questions, please fill in the form below and we will get in touch as soon as possible.
            </p>
          </div>

          {isSuccess ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-[#8B1B1E] mx-auto stroke-[1.5]" />
              <h3 className="font-canva-heading text-2xl uppercase tracking-wider text-[#2B2321]">
                Thank you for contacting us!
              </h3>
              <p className="text-sm font-sans text-[#554D4B]">
                Our admissions advisors will get in touch with you shortly.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2 text-xs font-serif uppercase tracking-widest text-[#2B2321] border border-[#2B2321] hover:bg-[#8B1B1E] hover:text-white hover:border-[#8B1B1E] transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Parent Name */}
              <div>
                <label className="block text-[10px] font-sans font-semibold tracking-wider uppercase text-[#554D4B] mb-1">
                  Full Name (Parent / Guardian) *
                </label>
                <input
                  type="text"
                  required
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white border border-[#D8C7B0] text-[#2B2321] text-xs sm:text-sm rounded-xs focus:border-[#8B1B1E] outline-none transition-colors"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-sans font-semibold tracking-wider uppercase text-[#554D4B] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-[#D8C7B0] text-[#2B2321] text-xs sm:text-sm rounded-xs focus:border-[#8B1B1E] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans font-semibold tracking-wider uppercase text-[#554D4B] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-[#D8C7B0] text-[#2B2321] text-xs sm:text-sm rounded-xs focus:border-[#8B1B1E] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Child Name & DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-sans font-semibold tracking-wider uppercase text-[#554D4B] mb-1">
                    Child's Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nguyễn Minh Trí"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-[#D8C7B0] text-[#2B2321] text-xs sm:text-sm rounded-xs placeholder-[#999] focus:border-[#8B1B1E] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans font-semibold tracking-wider uppercase text-[#554D4B] mb-1">
                    Child's Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-[#D8C7B0] text-[#2B2321] text-xs sm:text-sm rounded-xs placeholder-[#999] focus:border-[#8B1B1E] outline-none transition-colors pr-9"
                    />
                    <Calendar className="w-4 h-4 text-[#777] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Current School */}
              <div>
                <label className="block text-[10px] font-sans font-semibold tracking-wider uppercase text-[#554D4B] mb-1">
                  Current School / Kindergarten
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mầm non Họa Mi..."
                  name="currentSchool"
                  value={formData.currentSchool}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white border border-[#D8C7B0] text-[#2B2321] text-xs sm:text-sm rounded-xs placeholder-[#999] focus:border-[#8B1B1E] outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-sans font-semibold tracking-wider uppercase text-[#554D4B] mb-1">
                  Message / Special Enquiries
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your preferred visit time or questions..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white border border-[#D8C7B0] text-[#2B2321] text-xs sm:text-sm rounded-xs placeholder-[#999] focus:border-[#8B1B1E] outline-none transition-colors resize-none"
                />
              </div>

              {/* Centered Send Button */}
              <div className="pt-3 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-1.5 text-xs font-serif uppercase tracking-[0.2em] border border-neutral-800 text-neutral-900 hover:bg-[#8B1B1E] hover:text-white hover:border-[#8B1B1E] transition-all rounded-none shadow-xs inline-flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
