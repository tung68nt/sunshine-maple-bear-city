'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Star, Users } from 'lucide-react'
import { SCHOOL_IMAGES, MOCK_EVENTS } from '@/lib/constants'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>(MOCK_EVENTS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('is_public', true)
          .order('start_date', { ascending: true })

        if (error) throw error
        if (data && data.length > 0) {
          setEvents(data)
        }
      } catch (error) {
        console.error('Error fetching events, staying with mock data:', error)
      }
    }
    fetchEvents()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-30">
            <Image
              src={SCHOOL_IMAGES.render.thuVien6}
              alt="Extracurricular activities at Sunshine Maple Bear"
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
                <span className="text-xs font-bold uppercase tracking-wider text-maple-gold">Sự Kiện & Lễ Hội Thường Niên</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                Building <span className="text-maple-gold">Community</span> <br />Creating Memories
              </h1>
              <p className="text-xl text-white/70 font-light max-w-xl leading-relaxed">
                Discover our vibrant events at Sunshine Maple Bear, where every moment is a journey of exploration and talent development.
              </p>
              <div className="flex gap-4 pt-4">
                <a href="#upcoming" aria-label="Scroll to upcoming events" className="px-10 py-4 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 transform hover:scale-105 active:scale-95">
                  View Upcoming Events
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Grid */}
        <section id="upcoming" className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-maple-red/5 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20 space-y-4">
              <span className="text-maple-red font-bold uppercase tracking-widest text-sm">EVENT CALENDAR</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black">Featured Activities</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">Join your child in enriching extracurricular activities that strengthen family bonds at Maple Bear.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {loading ? (
                <div className="col-span-full text-center py-20">
                  <div className="w-12 h-12 border-4 border-maple-red/20 border-t-maple-red rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-neutral-500 font-light">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="col-span-full text-center py-20 text-neutral-400 font-light">
                  No events are currently scheduled.
                </div>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="group bg-white rounded-[48px] overflow-hidden border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={event.cover_image || SCHOOL_IMAGES.render.thuVien1}
                        alt={`Event: ${event.title}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6">
                        <span className={`bg-maple-red text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg border border-white/20 backdrop-blur-sm`}>
                          Event
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-10 space-y-8">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold text-maple-black group-hover:text-maple-red transition-colors leading-tight">
                          {event.title}
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed font-light line-clamp-3">
                          {event.description}
                        </p>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-neutral-100">
                        <div className="flex items-center gap-4 text-neutral-600">
                          <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-maple-red border border-neutral-100">
                            <Calendar size={18} />
                          </div>
                          <span className="text-sm font-bold">{new Date(event.start_date || event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-4 text-neutral-600">
                          <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-maple-red border border-neutral-100">
                            <Clock size={18} />
                          </div>
                          <span className="text-sm font-bold">
                            {event.time || new Date(event.start_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-neutral-600">
                          <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-maple-red border border-neutral-100">
                            <MapPin size={18} />
                          </div>
                          <span className="text-sm font-bold">{event.location || 'On Campus'}</span>
                        </div>
                      </div>

                      <Link
                        href={`/events/${event.slug || event.id}`}
                        aria-label={`View details for ${event.title}`}
                        className="flex items-center justify-center w-full py-5 bg-neutral-50 text-maple-black border border-neutral-100 rounded-2xl group/btn hover:bg-maple-red hover:text-white hover:border-maple-red transition-all font-bold gap-3"
                      >
                        View Details <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Past Highlight Section */}
        <section className="py-24 bg-neutral-50 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <div className="space-y-6">
                  <span className="text-maple-red font-bold uppercase tracking-widest text-sm">Memorable Moments</span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black leading-tight">
                    Where Beautiful <br /><span className="text-maple-red">Memories Begin</span>
                  </h2>
                  <p className="text-lg text-neutral-600 font-light leading-relaxed">
                    At Sunshine Maple Bear, we don&apos;t just teach children knowledge — we help them create vibrant childhood memories through traditional and international celebrations.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-8 bg-white rounded-[32px] shadow-sm border border-neutral-100 hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-maple-red/5 rounded-2xl flex items-center justify-center text-maple-red mb-6">
                      <Users size={32} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-maple-black">2,000+</p>
                      <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Parents Engaged</p>
                    </div>
                  </div>
                  <div className="p-8 bg-white rounded-[32px] shadow-sm border border-neutral-100 hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-maple-gold/5 rounded-2xl flex items-center justify-center text-maple-gold mb-6">
                      <Star size={32} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-maple-black">50+</p>
                      <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Annual Events</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="h-72 rounded-[40px] overflow-hidden relative shadow-2xl group">
                      <Image src={SCHOOL_IMAGES.render.lopHoc1} alt="Extracurricular activities" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="h-56 rounded-[40px] overflow-hidden relative shadow-2xl group">
                      <Image src={SCHOOL_IMAGES.render.thuVien2} alt="Library reading" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                  <div className="space-y-6 pt-12">
                    <div className="h-56 rounded-[40px] overflow-hidden relative shadow-2xl group">
                      <Image src={SCHOOL_IMAGES.render.hanhLang2} alt="Creative hallways" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="h-72 rounded-[40px] overflow-hidden relative shadow-2xl group">
                      <Image src={SCHOOL_IMAGES.render.phongChucNang2} alt="Music class" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-maple-gold/10 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-maple-red/5 -z-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="w-20 h-20 bg-maple-red/10 rounded-3xl flex items-center justify-center mx-auto text-maple-red mb-4">
                <Sparkles size={40} />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-maple-black">Don&apos;t want to miss the next event?</h2>
                <p className="text-xl text-neutral-500 font-light max-w-2xl mx-auto leading-relaxed">
                  Sign up to be among the first to receive invitations to our experiential open days and exclusive events at Sunshine Maple Bear.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-12 py-5 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 transform hover:scale-105 active:scale-95"
                >
                  Subscribe to Updates <ArrowRight size={20} />
                </Link>
                <Link
                  href="/admissions"
                  className="px-12 py-5 bg-white text-maple-black font-bold rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all shadow-sm"
                >
                  Learn About Admissions
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
