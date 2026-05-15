'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useState } from 'react'
import { Calendar, Clock, Users, MapPin, CheckCircle2, ArrowRight, Sparkles, Building2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SCHOOL_INFO, SCHOOL_IMAGES } from '@/lib/constants'

export default function TourBookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorEmail: '',
    visitorPhone: '',
    tourDate: '',
    tourTime: '',
    numAdults: '1',
    numChildren: '0',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const payload = {
        visitorName: formData.visitorName,
        visitorEmail: formData.visitorEmail,
        visitorPhone: formData.visitorPhone,
        preferredDate: formData.tourDate,
        preferredTime: formData.tourTime,
        numberOfVisitors: parseInt(formData.numAdults) + parseInt(formData.numChildren),
        childAge: parseInt(formData.numChildren) > 0 ? null : 0, // Placeholder
        notes: formData.notes,
      }

      const res = await fetch('/api/submissions/tour-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('Failed to submit booking')
      }

      setIsSuccess(true)
    } catch (error) {
      console.error('Error submitting tour booking:', error)
      alert('An error occurred while booking. Please try again later.')
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
              src={SCHOOL_IMAGES.render.thuVien1}
              alt="Learning environment at Sunshine Maple Bear"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-maple-black via-maple-black/80 to-transparent" />
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maple-gold/10 border border-maple-gold/20 backdrop-blur-md">
                <Sparkles size={18} className="text-maple-gold" />
                <span className="text-sm font-bold uppercase tracking-widest text-white">Experience Firsthand</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                Visit Our <span className="text-maple-gold">Campus</span> <br />In Person
              </h1>
              <p className="text-xl text-white/70 font-light max-w-2xl leading-relaxed">
                We invite parents to visit and experience firsthand the Canada-standard learning space at Sunshine Maple Bear.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {isSuccess ? (
            <div className="max-w-2xl mx-auto text-center space-y-8 py-20 animate-fade-in">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[32px] flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-display font-bold text-maple-black">Booking Successful!</h2>
                <p className="text-xl text-neutral-500 font-light leading-relaxed">
                  Thank you for your interest. Our advisory team will contact you to confirm the tour schedule within the next 24 hours via the phone number <strong>{formData.visitorPhone}</strong>.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-10 py-4 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20"
                >
                  Book Another Tour
                </button>
                <Link href="/" className="px-10 py-4 bg-neutral-100 text-maple-black font-bold rounded-2xl hover:bg-neutral-200 transition-all">
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Info Sidebar */}
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl font-display font-bold text-maple-black leading-tight">A Journey of <br />Creative Discovery</h2>
                  <p className="text-lg text-neutral-500 font-light leading-relaxed">A typical tour lasts 30-45 minutes, helping parents get the most authentic view of their child's daily environment.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Typical Classroom', img: SCHOOL_IMAGES.render.lopHoc1 },
                    { label: 'Colorful Library', img: SCHOOL_IMAGES.render.thuVien3 },
                    { label: 'Creative Playground', img: SCHOOL_IMAGES.render.sanChoi2 },
                    { label: 'Music Area', img: SCHOOL_IMAGES.render.phongChucNang1 },
                  ].map((item, idx) => (
                    <div key={idx} className="group relative h-48 rounded-[32px] overflow-hidden border border-neutral-100 shadow-sm">
                      <Image src={item.img} alt={item.label} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-8 pt-4">
                  {[
                    { icon: <Clock />, title: 'Touring Hours', content: 'Mon - Fri: 09:00 AM - 05:00 PM' },
                    { icon: <Building2 />, title: 'Location', content: SCHOOL_INFO.ADDRESS },
                    { icon: <Users />, title: 'Group Size', content: 'Max 2 parents & child per session' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 items-start group">
                      <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-maple-red border border-neutral-100 group-hover:bg-maple-red group-hover:text-white transition-all shadow-sm">
                        {item.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-lg text-maple-black">{item.title}</h4>
                        <p className="text-neutral-500 font-light leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form Card */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[48px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-neutral-100 p-8 md:p-16 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-maple-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                  
                  <div className="space-y-2 mb-12">
                    <h3 className="text-3xl font-display font-bold text-maple-black">Registration Details</h3>
                    <p className="text-neutral-400 text-sm">* Please fill in all details for the best school arrangement.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Contact Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label htmlFor="visitorName" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Full Name *</label>
                        <input
                          id="visitorName"
                          type="text"
                          name="visitorName"
                          value={formData.visitorName}
                          onChange={handleChange}
                          required
                          className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="visitorPhone" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Phone Number *</label>
                        <input
                          id="visitorPhone"
                          type="tel"
                          name="visitorPhone"
                          value={formData.visitorPhone}
                          onChange={handleChange}
                          required
                          className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all"
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label htmlFor="tourDate" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Preferred Date *</label>
                        <input
                          id="tourDate"
                          type="date"
                          name="tourDate"
                          value={formData.tourDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="tourTime" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Time Slot *</label>
                        <select 
                          id="tourTime"
                          name="tourTime"
                          value={formData.tourTime}
                          onChange={handleChange}
                          required
                          className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all appearance-none"
                        >
                          <option value="">Select time...</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="16:00">04:00 PM</option>
                        </select>
                      </div>
                    </div>

                    {/* Guests Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label htmlFor="numAdults" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Number of Adults</label>
                        <select 
                          id="numAdults"
                          name="numAdults"
                          value={formData.numAdults}
                          onChange={handleChange}
                          className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all appearance-none"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="numChildren" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Children Accompanying</label>
                        <select 
                          id="numChildren"
                          name="numChildren"
                          value={formData.numChildren}
                          onChange={handleChange}
                          className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all appearance-none"
                        >
                          <option value="0">None</option>
                          <option value="1">1 Child</option>
                          <option value="2">2 Children</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="notes" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Special Requests</label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all resize-none"
                        placeholder="Any additional information or support needed?"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Submit tour booking request"
                      className="w-full py-5 bg-maple-red text-white font-bold rounded-[20px] hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 flex items-center justify-center gap-3 group disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isSubmitting ? 'Submitting request...' : 'Confirm Tour Booking'}
                      {!isSubmitting && <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
