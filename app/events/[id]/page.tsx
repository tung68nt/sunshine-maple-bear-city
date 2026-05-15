'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Calendar, MapPin, Clock, ArrowLeft, Phone } from 'lucide-react'
import { SCHOOL_IMAGES, SCHOOL_INFO } from '@/lib/constants'
import { supabase } from '@/lib/supabase'

import { EventRegistrationForm } from '@/components/event-registration-form'

export default function EventDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true)
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        
        let query = supabase.from('events').select('*');
        if (isUuid) {
          query = query.or(`id.eq.${id},slug.eq.${id}`);
        } else {
          query = query.eq('slug', id);
        }

        const { data, error } = await query.single();

        if (error) throw error
        setEvent(data)
      } catch (error) {
        console.error('Error fetching event, using mock data:', error)
        setEvent({
          id: id,
          slug: id,
          title: id === 'spring-fair' ? 'Spring Fair 2026' : 'Featured Event',
          description: '<p>This is a demo event. Parents and students will participate in exciting activities, interact with teachers, and experience the Canadian-standard learning environment.</p><ul><li>Participate in cognitive development games.</li><li>Tour model classrooms and functional areas.</li><li>Directly interact with the school management and teachers.</li></ul>',
          start_date: new Date('2026-03-15T09:00:00').toISOString(),
          location: 'Sunshine Maple Bear Campus',
          cover_image: null,
        })
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <div className="w-12 h-12 border-4 border-maple-red/20 border-t-maple-red rounded-full animate-spin" />
        <p className="text-neutral-500 font-light">Loading event information...</p>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold text-maple-black">Event Not Found</h1>
        <Link href="/events" className="text-maple-red font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft size={20} /> Back to events list
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-40">
            <Image
              src={event.cover_image || SCHOOL_IMAGES.render.thuVien1}
              alt={`Event: ${event.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-maple-black via-maple-black/60 to-transparent" />
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl space-y-8 animate-fade-in-up">
              <Link href="/events" aria-label="Back to events list" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group mb-4">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-sm uppercase tracking-widest">All Events</span>
              </Link>
              
              <div className="space-y-6">
                <div className={`inline-block px-4 py-1.5 rounded-full bg-maple-red text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/10`}>
                  Event
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                  {event.title}
                </h1>
                
                <div className="flex flex-wrap gap-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-maple-gold backdrop-blur-md">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider">Date</p>
                      <p className="font-bold text-white">{new Date(event.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-maple-gold backdrop-blur-md">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider">Time</p>
                      <p className="font-bold text-white">{new Date(event.start_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-maple-gold backdrop-blur-md">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider">Location</p>
                      <p className="font-bold text-white">{event.location || 'On Campus'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-12">
              <div className="prose prose-xl max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-neutral-600 prose-p:leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: event.description || '<p>Content coming soon...</p>' }} />
              </div>
              
              <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl border border-neutral-100">
                <Image
                  src={event.cover_image || SCHOOL_IMAGES.render.thuVien1}
                  alt={`Event Detail: ${event.title}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div className="sticky top-24 space-y-8">
                {/* Dedicated Event Registration Form */}
                <EventRegistrationForm 
                  eventTitle={event.title}
                  eventDate={new Date(event.start_date).toLocaleDateString('en-US')}
                  eventLocation={event.location || 'On Campus'}
                />

                {/* Contact Card */}
                <div className="bg-neutral-50 rounded-[32px] p-8 border border-neutral-100">
                  <h4 className="font-display font-black text-maple-black mb-4">Need More Assistance?</h4>
                  <p className="text-neutral-500 text-sm mb-6">Contact our admissions department directly for any questions.</p>
                  <a href={`tel:${SCHOOL_INFO.PHONE}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-maple-red shadow-sm group-hover:bg-maple-red group-hover:text-white transition-all">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Hotline</p>
                      <p className="font-black text-maple-black">{SCHOOL_INFO.PHONE}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
