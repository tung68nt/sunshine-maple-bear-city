'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, PhoneCall, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { SCHOOL_INFO, SCHOOL_IMAGES } from '@/lib/constants'
import Image from 'next/image'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setSubmitMessage('Thank you for reaching out! Our admissions team will respond within 24 working hours.')
      setIsSubmitting(false)
      e.currentTarget.reset()
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-30">
            <Image
              src={SCHOOL_IMAGES.render.hanhLang2}
              alt="Creative learning spaces at Sunshine Maple Bear"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-maple-black via-maple-black/80 to-transparent" />
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maple-gold/10 border border-maple-gold/20 backdrop-blur-md">
                <MessageSquare size={18} className="text-maple-gold" />
                <span className="text-sm font-bold uppercase tracking-widest text-white">Get in Touch</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                We&apos;re Here <span className="text-maple-gold">to Help</span> <br />&amp; Connect
              </h1>
              <p className="text-xl text-white/70 font-light max-w-xl leading-relaxed">
                We value every inquiry and are always ready to answer your questions about your child&apos;s journey at our 100% English international kindergarten.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <span className="text-maple-red font-bold uppercase tracking-widest text-sm">CONTACT INFORMATION</span>
                <h2 className="text-4xl font-display font-bold text-maple-black leading-tight">Meet Our <br />Admissions Team</h2>
                <p className="text-lg text-neutral-500 font-light leading-relaxed">Our team is available Monday through Friday, 7:30 AM to 6:00 PM to assist you.</p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: <MapPin size={24} />, title: 'Campus Address', content: SCHOOL_INFO.ADDRESS, color: 'text-maple-red', bg: 'bg-maple-red/5' },
                  { icon: <PhoneCall size={24} />, title: 'Admissions Hotline', content: SCHOOL_INFO.PHONE, color: 'text-maple-gold', bg: 'bg-maple-gold/5' },
                  { icon: <Mail size={24} />, title: 'Email', content: SCHOOL_INFO.EMAIL, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { icon: <Clock size={24} />, title: 'Office Hours', content: 'Monday – Friday: 07:30 AM – 6:00 PM', color: 'text-green-500', bg: 'bg-green-50' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start group">
                    <div className={`w-16 h-16 rounded-[20px] ${item.bg} flex items-center justify-center ${item.color} group-hover:bg-maple-black group-hover:text-white transition-all duration-500 shadow-sm`}>
                      {item.icon}
                    </div>
                    <div className="space-y-1 pt-1">
                      <h4 className="text-lg font-bold text-maple-black">{item.title}</h4>
                      <p className="text-neutral-500 font-light leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Connect */}
              <div className="p-10 bg-neutral-50 rounded-[48px] border border-neutral-100 space-y-8 shadow-sm">
                <h4 className="text-xl font-display font-bold text-maple-black">Connect on Social Media</h4>
                <div className="flex flex-wrap gap-4">
                  {['Facebook', 'Youtube', 'Instagram'].map((social, idx) => (
                    <button key={idx} className="px-8 py-3 bg-white border border-neutral-200 rounded-2xl text-sm font-bold text-neutral-600 hover:bg-maple-red hover:text-white hover:border-maple-red transition-all shadow-sm">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[48px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-neutral-100 p-8 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-maple-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                
                <div className="mb-12 space-y-4">
                  <h3 className="text-3xl font-display font-bold text-maple-black">Send a Message</h3>
                  <p className="text-neutral-400 font-light">We will respond to your inquiry within 24 working hours.</p>
                </div>

                {submitMessage && (
                  <div className="mb-12 p-8 bg-green-50 text-green-800 rounded-[32px] border border-green-100 animate-fade-in-up flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                      <Send size={24} />
                    </div>
                    <p className="font-bold text-lg leading-snug">{submitMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red focus:bg-white transition-all font-bold placeholder:font-light"
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red focus:bg-white transition-all font-bold placeholder:font-light"
                        placeholder="+84 xxx xxx xxx"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red focus:bg-white transition-all font-bold placeholder:font-light"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Topic of Interest</label>
                    <div className="relative">
                      <select className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red focus:bg-white transition-all font-bold appearance-none">
                        <option>Admissions Inquiry</option>
                        <option>Schedule a Campus Tour</option>
                        <option>Partnership & Collaboration</option>
                        <option>Feedback & Suggestions</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                        <ArrowRight className="rotate-90" size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Message *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red focus:bg-white transition-all font-bold placeholder:font-light resize-none"
                      placeholder="Please share your questions or how we can help..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-maple-red text-white font-bold rounded-[24px] hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 flex items-center justify-center gap-4 group disabled:opacity-50 transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </div>
                    ) : (
                      <>
                        Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="h-[600px] relative mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.36430335017!2d105.7946927760205!3d21.058105680599553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aa6d98d2466f%3A0xe7819957793d5f3!2sSunshine%20City!5e0!3m2!1sen!2s!4v1715610000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sunshine Maple Bear Sunshine City Location Map"
          ></iframe>
          <div className="absolute top-12 left-12 hidden lg:block">
            <div className="bg-white p-10 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-neutral-100 max-w-sm space-y-8 animate-fade-in-up">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-maple-red rounded-2xl flex items-center justify-center text-white shadow-lg shadow-maple-red/20">
                  <MapPin size={28} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xl font-display font-bold text-maple-black">Campus Location</h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-maple-gold font-bold">Sunshine City, Ciputra</p>
                </div>
              </div>
              <p className="text-neutral-500 font-light leading-relaxed">Prime location within Ciputra Urban Area, conveniently accessible from Vo Chi Cong avenue. Safe parking facilities available for parents.</p>
              <a 
                href="https://maps.app.goo.gl/xxx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-4 bg-neutral-50 text-maple-red font-bold rounded-2xl border border-neutral-100 hover:bg-maple-red hover:text-white transition-all gap-3"
              >
                Open in Google Maps <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
