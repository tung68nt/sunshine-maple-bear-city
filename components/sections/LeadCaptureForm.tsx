'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight, X, Loader2, AlertCircle } from 'lucide-react'
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

  const [errors, setErrors] = useState<{ phone?: string; email?: string; fullName?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const validateForm = () => {
    const newErrors: { phone?: string; email?: string; fullName?: string } = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên phụ huynh'
    }

    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại liên hệ'
    } else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (ví dụ: 0912345678)'
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Địa chỉ email không đúng định dạng'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowPopup(true)
    }, 800)
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
    setErrors({})
  }

  return (
    <section id="contact-us" className="py-24 lg:py-32 bg-[#151513] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs font-display font-black text-maple-gold uppercase tracking-[0.2em]">07 / CONTACT & ADMISSIONS</span>
          <div className="h-[1px] bg-white/20 flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
                Contact <span className="font-serif italic font-normal text-amber-200">Us</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                If you have any questions, please fill in the form below and we will get in touch as soon as possible.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/15">
              <a href={`tel:${SCHOOL_INFO.PHONE}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-maple-gold group-hover:border-maple-red group-hover:bg-maple-red group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-300 font-bold uppercase tracking-widest block">Hotline</span>
                  <span className="text-white font-display font-bold group-hover:text-maple-gold transition-colors">{SCHOOL_INFO.PHONE}</span>
                </div>
              </a>

              <a href={`mailto:${SCHOOL_INFO.EMAIL}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-maple-gold group-hover:border-maple-red group-hover:bg-maple-red group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-300 font-bold uppercase tracking-widest block">Email</span>
                  <span className="text-white font-display font-bold group-hover:text-maple-gold transition-colors">{SCHOOL_INFO.EMAIL}</span>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-maple-gold flex-shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-300 font-bold uppercase tracking-widest block">Campus Address</span>
                  <span className="text-sm font-display font-medium text-white leading-snug">
                    S4 Building, Sunshine City, Nam Thang Long Urban Area, Phu Thuong Ward, Hanoi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white text-[#1D1D1B] p-8 sm:p-10 shadow-2xl border border-neutral-200">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="border-b border-neutral-200 pb-4 mb-6">
                <h3 className="font-display font-extrabold text-2xl text-[#1D1D1B]">
                  Register for <span className="text-maple-red">School Tour</span>
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1">
                  Fill in your contact information below. Our Admissions Director will get back to you within 24 business hours.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="lead-fullName" className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#1D1D1B]">
                  Full Name of Parent / Guardian *
                </label>
                <input
                  id="lead-fullName"
                  type="text"
                  required
                  placeholder="e.g. Nguyễn Văn Nam"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#FDFBF7] border text-xs text-[#1D1D1B] focus:outline-none focus:ring-2 focus:ring-maple-red transition-all ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-neutral-300'
                  }`}
                />
                {errors.fullName && (
                  <span className="text-[10px] text-red-600 font-bold mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.fullName}
                  </span>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-phone" className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#1D1D1B]">
                    Phone Number *
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#FDFBF7] border text-xs text-[#1D1D1B] focus:outline-none focus:ring-2 focus:ring-maple-red transition-all ${
                      errors.phone ? 'border-red-500 bg-red-50/20' : 'border-neutral-300'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[10px] text-red-600 font-bold mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="lead-email" className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#1D1D1B]">
                    Email Address
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    placeholder="parent@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#FDFBF7] border text-xs text-[#1D1D1B] focus:outline-none focus:ring-2 focus:ring-maple-red transition-all ${
                      errors.email ? 'border-red-500 bg-red-50/20' : 'border-neutral-300'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-600 font-bold mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Child Name & DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-childName" className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#1D1D1B]">
                    Child&apos;s Full Name
                  </label>
                  <input
                    id="lead-childName"
                    type="text"
                    placeholder="e.g. Nguyễn Minh Trí"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-300 text-xs text-[#1D1D1B] focus:outline-none focus:ring-2 focus:ring-maple-red transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="lead-dob" className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#1D1D1B]">
                    Child&apos;s Date of Birth
                  </label>
                  <input
                    id="lead-dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-300 text-xs text-[#1D1D1B] focus:outline-none focus:ring-2 focus:ring-maple-red transition-all"
                  />
                </div>
              </div>

              {/* Enquiry */}
              <div>
                <label htmlFor="lead-enquiry" className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#1D1D1B]">
                  Message / Special Enquiries
                </label>
                <textarea
                  id="lead-enquiry"
                  rows={3}
                  placeholder="Tell us about your preferred visit time or questions..."
                  value={formData.enquiry}
                  onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-300 text-xs text-[#1D1D1B] focus:outline-none focus:ring-2 focus:ring-maple-red transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#1D1D1B] hover:bg-maple-red disabled:bg-neutral-500 text-white font-display font-bold text-xs uppercase tracking-widest transition-colors border border-[#1D1D1B] flex items-center justify-center gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing Registration...
                  </>
                ) : (
                  <>
                    Submit Tour Registration
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Confirmation Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white text-[#1D1D1B] max-w-md w-full p-8 text-center space-y-6 shadow-2xl border border-neutral-300 relative animate-fade-in">
            <button onClick={closePopup} className="absolute top-4 right-4 text-neutral-400 hover:text-black">
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold">Registration Received!</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Thank you, <span className="font-bold">{formData.fullName || 'Parent'}</span>. Our Admissions Officer will contact you via <span className="font-bold">{formData.phone}</span> shortly to confirm your campus tour schedule.
              </p>
            </div>
            <button
              onClick={closePopup}
              className="w-full py-3 bg-[#1D1D1B] text-white text-xs font-bold uppercase tracking-wider hover:bg-maple-red transition-colors"
            >
              Close Confirmation
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
