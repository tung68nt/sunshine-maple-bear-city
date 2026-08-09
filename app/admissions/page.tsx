'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useState } from 'react'
import { CheckCircle2, Info, FileText, Heart, ShieldCheck, ArrowRight } from 'lucide-react'
import { GRADE_LEVELS, SCHOOL_IMAGES, SCHOOL_INFO } from '@/lib/constants'
import Image from 'next/image'

import { supabase } from '@/lib/supabase'

export default function AdmissionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    parentAddress: '',
    childName: '',
    childDOB: '',
    childGender: '',
    nationality: '',
    passportNumber: '',
    desiredGrade: '',
    currentLanguage: '',
    specialNeeds: '',
    allergies: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    
    try {
      const payload = {
        childName: formData.childName,
        childDob: formData.childDOB,
        gradeLevel: formData.desiredGrade,
        parentName: formData.parentName,
        parentEmail: formData.parentEmail,
        parentPhone: formData.parentPhone,
        address: formData.parentAddress,
        notes: `Gender: ${formData.childGender}, Nationality: ${formData.nationality}, Passport: ${formData.passportNumber}, Language: ${formData.currentLanguage}, Special Needs: ${formData.specialNeeds}, Allergies: ${formData.allergies}`,
      }

      const res = await fetch('/api/submissions/admission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitMessage('Thank you for submitting your application! Our admissions team will contact you shortly to discuss the next steps.')
      setFormData({
        parentName: '', parentEmail: '', parentPhone: '', parentAddress: '',
        childName: '', childDOB: '', childGender: '', nationality: '',
        passportNumber: '', desiredGrade: '', currentLanguage: '',
        specialNeeds: '', allergies: '',
      })
    } catch (error) {
      console.error('Error submitting admission:', error)
      setSubmitMessage('An error occurred while submitting. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-30">
            <Image
              src={SCHOOL_IMAGES.render.lopHoc2}
              alt="Canadian-standard learning environment at Sunshine Maple Bear"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-maple-black via-maple-black/80 to-transparent" />
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-8 animate-fade-in-up">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-4 bg-maple-gold rounded-full inline-block" />
                <span className="text-xs font-bold uppercase tracking-wider text-maple-gold">Tuyển Sinh Năm Học 2026-2027</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                Shaping <span className="text-maple-gold">Tomorrow&apos;s</span> <br />Global Citizens
              </h1>
              <p className="text-xl text-white/70 font-light max-w-xl leading-relaxed">
                Welcome to the Sunshine Maple Bear community. Begin your child&apos;s 100% English international education journey today.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Sidebar Info */}
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-10">
                <div className="space-y-6">
                  <h3 className="text-3xl font-display font-bold text-maple-black flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-maple-red/10 flex items-center justify-center text-maple-red">
                      <Info size={24} />
                    </div>
                    5-Step Process
                  </h3>
                  <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-100">
                    {[
                      { title: 'Online Application', desc: 'Complete the enrollment application form accurately.' },
                      { title: 'Campus Tour & Consultation', desc: 'Parents are invited to visit and explore our facilities.' },
                      { title: 'Developmental Assessment', desc: 'A friendly session to understand your child\'s abilities.' },
                      { title: 'Enrollment Decision', desc: 'Receive an official letter of acceptance from our Principal.' },
                      { title: 'Complete Documentation', desc: 'Submit required documents and finalize tuition.' },
                    ].map((step, idx) => (
                      <div key={idx} className="relative pl-12 group">
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-2 border-maple-red text-maple-red flex items-center justify-center font-bold text-xs z-10 group-hover:bg-maple-red group-hover:text-white transition-all shadow-sm">
                          {idx + 1}
                        </div>
                        <h4 className="font-bold text-maple-black text-lg">{step.title}</h4>
                        <p className="text-sm text-neutral-500 font-light leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-neutral-50 rounded-[32px] space-y-8 border border-neutral-100 shadow-sm">
                  <h3 className="text-xl font-display font-bold text-maple-black flex items-center gap-3">
                    <FileText className="text-maple-gold" />
                    Required Documents
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Copy of Birth Certificate / Passport',
                      '4 passport-sized photos (4x6cm)',
                      'Vaccination record (photocopy)',
                      'Recent health check-up certificate',
                      'Parent/guardian ID copies',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-600 font-light">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-10 bg-maple-black text-white rounded-[32px] relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <ShieldCheck size={120} />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-display font-bold">Admissions Support</h3>
                    <p className="text-white/60 text-sm font-light leading-relaxed">Need more information? Our admissions team is always ready to assist you.</p>
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <a href={`tel:${SCHOOL_INFO.PHONE}`} className="block text-2xl font-bold text-maple-gold hover:text-white transition-colors">{SCHOOL_INFO.PHONE}</a>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">Monday – Friday: 08:00 AM – 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-8">
              <div className="bg-white p-8 md:p-16 rounded-[48px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-neutral-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-maple-red/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                
                <div className="mb-12 space-y-4">
                  <h2 className="text-4xl font-display font-bold text-maple-black">Enrollment Application</h2>
                  <p className="text-neutral-500 font-light text-lg">Please provide complete information so we can recommend the best learning pathway for your child.</p>
                </div>

                {submitMessage && (
                  <div className={`mb-12 p-8 rounded-3xl animate-fade-in-up shadow-sm border ${
                    submitMessage.includes('Thank you')
                      ? 'bg-green-50 border-green-100 text-green-800'
                      : 'bg-red-50 border-red-100 text-red-800'
                  }`}>
                    <div className="flex gap-4 items-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${submitMessage.includes('Thank you') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {submitMessage.includes('Thank you') ? <CheckCircle2 size={24} /> : <Info size={24} />}
                      </div>
                      <p className="font-bold text-lg">{submitMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-16">
                  {/* Section 1: Parent Info */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-maple-red text-white flex items-center justify-center font-bold shadow-lg shadow-maple-red/20">1</div>
                      <h3 className="text-2xl font-display font-bold text-maple-black">Parent / Guardian Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label htmlFor="parentName" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Full Name *</label>
                        <input id="parentName" type="text" name="parentName" value={formData.parentName} onChange={handleChange} required className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red focus:bg-white transition-all font-bold placeholder:font-light" placeholder="Parent/Guardian full name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="parentEmail" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Email *</label>
                        <input id="parentEmail" type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} required className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red focus:bg-white transition-all font-bold placeholder:font-light" placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="parentPhone" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Phone Number *</label>
                        <input id="parentPhone" type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleChange} required className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red focus:bg-white transition-all font-bold placeholder:font-light" placeholder="+84 xxx xxx xxx" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="parentAddress" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Home Address</label>
                        <input id="parentAddress" type="text" name="parentAddress" value={formData.parentAddress} onChange={handleChange} className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red focus:bg-white transition-all font-bold placeholder:font-light" placeholder="Residential address" />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Child Info */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-maple-gold text-maple-black flex items-center justify-center font-bold shadow-lg shadow-maple-gold/20">2</div>
                      <h3 className="text-2xl font-display font-bold text-maple-black">Child Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label htmlFor="childName" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Child&apos;s Full Name *</label>
                        <input id="childName" type="text" name="childName" value={formData.childName} onChange={handleChange} required className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-gold/20 focus:border-maple-gold focus:bg-white transition-all font-bold placeholder:font-light" placeholder="Child's full name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="childDOB" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Date of Birth *</label>
                        <input id="childDOB" type="date" name="childDOB" value={formData.childDOB} onChange={handleChange} required className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-gold/20 focus:border-maple-gold focus:bg-white transition-all font-bold" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="childGender" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Gender</label>
                        <div className="relative">
                          <select id="childGender" name="childGender" value={formData.childGender} onChange={handleChange} className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-gold/20 focus:border-maple-gold focus:bg-white transition-all font-bold appearance-none">
                            <option value="">Select gender</option>
                            <option value="boy">Male</option>
                            <option value="girl">Female</option>
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400"><ArrowRight className="rotate-90" size={16} /></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="desiredGrade" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Desired Class Level *</label>
                        <div className="relative">
                          <select id="desiredGrade" name="desiredGrade" value={formData.desiredGrade} onChange={handleChange} required className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-gold/20 focus:border-maple-gold focus:bg-white transition-all font-bold appearance-none">
                            <option value="">Select class level</option>
                            {Object.values(GRADE_LEVELS).map((grade) => (
                              <option key={grade.id} value={grade.id}>
                                {grade.label} ({grade.age})
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400"><ArrowRight className="rotate-90" size={16} /></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Health */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">3</div>
                      <h3 className="text-2xl font-display font-bold text-maple-black">Health Information</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="allergies" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block flex items-center gap-2">
                          <Heart size={12} className="text-maple-red" />
                          Health Notes / Allergies
                        </label>
                        <textarea id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} rows={4} className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 focus:bg-white transition-all font-bold placeholder:font-light resize-none" placeholder="Please note any food allergies, medication sensitivities, or special health considerations (if applicable)"></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Submit enrollment application"
                      className="w-full py-6 bg-maple-red text-white font-bold rounded-[24px] hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 flex items-center justify-center gap-3 group disabled:opacity-50 transform hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting application...</span>
                        </div>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-3 text-neutral-400 text-xs italic">
                      <ShieldCheck size={14} />
                      <p>Your information is kept strictly confidential and secure.</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
