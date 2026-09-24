'use client'

import React, { useState } from 'react'

interface ContactFormProps {
  x: number
  y: number
  pageTitle: string
}

export function CanvaExactContactForm({ x, y, pageTitle }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    childName: '',
    childDob: '',
    currentSchool: '',
    message: '',
  })
  const [isDobFocused, setIsDobFocused] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}
    if (!formData.name.trim()) newErrors.name = true
    if (!formData.phone.trim()) newErrors.phone = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await fetch('/api/submissions/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          childName: formData.childName || undefined,
          childDob: formData.childDob || undefined,
          notes: `[From ${pageTitle}] Current school: ${formData.currentSchool || 'N/A'}. Message: ${formData.message || 'N/A'}`,
        }),
      })
      setIsSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        childName: '',
        childDob: '',
        currentSchool: '',
        message: '',
      })
    } catch (err) {
      console.error('Form submission error:', err)
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      id="cv-contact"
      className="cv-form"
      style={{ '--x': x, '--y': y } as React.CSSProperties}
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        type="text"
        name="name"
        aria-label="Full name of parent / guardian"
        placeholder=" "
        value={formData.name}
        onChange={handleChange}
        aria-invalid={errors.name ? 'true' : undefined}
        style={{ '--x': 4.5, '--y': 22, '--w': 396.5, '--h': 26 } as React.CSSProperties}
        required
      />
      <input
        type="tel"
        name="phone"
        aria-label="Phone number"
        placeholder=" "
        value={formData.phone}
        onChange={handleChange}
        aria-invalid={errors.phone ? 'true' : undefined}
        style={{ '--x': 4.5, '--y': 76.5, '--w': 192.5, '--h': 26 } as React.CSSProperties}
        required
      />
      <input
        type="email"
        name="email"
        aria-label="Email address"
        placeholder=" "
        value={formData.email}
        onChange={handleChange}
        style={{ '--x': 209.5, '--y': 76.5, '--w': 191.5, '--h': 26 } as React.CSSProperties}
      />
      <input
        type="text"
        name="childName"
        aria-label="Child's full name"
        placeholder=" "
        value={formData.childName}
        onChange={handleChange}
        style={{ '--x': 4.5, '--y': 131, '--w': 192.5, '--h': 26 } as React.CSSProperties}
      />
      <input
        type={isDobFocused || formData.childDob ? 'date' : 'text'}
        name="childDob"
        aria-label="Child's date of birth"
        placeholder=" "
        value={formData.childDob}
        onFocus={() => setIsDobFocused(true)}
        onBlur={() => setIsDobFocused(false)}
        onChange={handleChange}
        style={{ '--x': 209.5, '--y': 131, '--w': 191.5, '--h': 26 } as React.CSSProperties}
      />
      <input
        type="text"
        name="currentSchool"
        aria-label="Current school / kindergarten"
        placeholder=" "
        value={formData.currentSchool}
        onChange={handleChange}
        style={{ '--x': 4.5, '--y': 185, '--w': 396.5, '--h': 26 } as React.CSSProperties}
      />
      <textarea
        name="message"
        aria-label="Message / special enquiries"
        placeholder=" "
        value={formData.message}
        onChange={handleChange}
        style={{ '--x': 4.5, '--y': 239.5, '--w': 396.5, '--h': 47 } as React.CSSProperties}
      />
      {isSuccess && (
        <p className="cv-form-ok" role="status">
          Thank you! We will contact you shortly.
        </p>
      )}
    </form>
  )
}
