'use client'

import { useState } from 'react'
import { CheckCircle2, ArrowRight, User, Phone, Mail, Calendar, MapPin, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface EventRegistrationFormProps {
  eventTitle: string
  eventDate: string
  eventLocation: string
}

export function EventRegistrationForm({ eventTitle, eventDate, eventLocation }: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    participants: '1',
    note: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const payload = {
        ...formData,
        eventTitle,
      }

      const res = await fetch('/api/submissions/event-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('Failed to submit registration')
      }

      setIsSuccess(true)
    } catch (error) {
      console.error('Error submitting event registration:', error)
      alert('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white rounded-[40px] p-10 text-center space-y-6 shadow-2xl border border-neutral-100 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={40} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-bold text-maple-black">Registration Successful!</h3>
          <p className="text-neutral-500">Thank you for registering for <strong>{eventTitle}</strong>. We will contact you to confirm your spot shortly.</p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-8 py-3 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all"
        >
          Register Again
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-neutral-100 overflow-hidden">
      <div className="bg-maple-black p-8 text-white relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-maple-red opacity-20 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-maple-gold">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold">Event Registration</h3>
            <p className="text-white/60 text-xs uppercase tracking-widest font-bold mt-1">Event: {eventTitle}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="event-name" className="text-xs font-bold text-neutral-600 uppercase tracking-wider ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
              <input
                id="event-name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="event-phone" className="text-xs font-bold text-neutral-600 uppercase tracking-wider ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                <input
                  id="event-phone"
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="09xx xxx xxx"
                  className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="event-email" className="text-xs font-bold text-neutral-600 uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                <input
                  id="event-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="event-participants" className="text-xs font-bold text-neutral-600 uppercase tracking-wider ml-1">Number of Attendees</label>
            <select
              id="event-participants"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all appearance-none"
            >
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">Family (4+ people)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="event-note" className="text-xs font-bold text-neutral-600 uppercase tracking-wider ml-1">Notes (optional)</label>
            <textarea
              id="event-note"
              name="note"
              rows={3}
              value={formData.note}
              onChange={handleChange}
              placeholder="Any special requirements?"
              className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-maple-red text-white font-display font-bold text-lg rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 flex items-center justify-center gap-3 group disabled:opacity-70"
        >
          {isSubmitting ? 'Processing...' : 'Confirm Registration'}
          {!isSubmitting && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
        </button>

        <p className="text-[10px] text-center text-neutral-600 uppercase tracking-widest font-bold">
          This event is completely free of charge
        </p>
      </form>
    </div>
  )
}
