'use client'

import { useState } from 'react'
import { Button } from './Button'

type Fields = {
  parent: string
  phone: string
  email: string
  child: string
  dob: string
  school: string
  message: string
}

const EMPTY: Fields = { parent: '', phone: '', email: '', child: '', dob: '', school: '', message: '' }

/** Contact form laid out as in the design PDF; posts to the same admissions endpoint as the other forms. */
export function ContactForm({ source = 'Home' }: { /** page name recorded with the enquiry */ source?: string }) {
  const [f, setF] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value }))
    setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (!f.parent.trim()) next.parent = 'Please enter your name.'
    if (!/^[0-9+\s().-]{8,}$/.test(f.phone.trim())) next.phone = 'Please enter a valid phone number.'
    if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email.trim())) next.email = 'Please enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length) return

    setBusy(true)
    try {
      await fetch('/api/submissions/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: f.parent.trim(),
          phone: f.phone.trim(),
          email: f.email.trim() || undefined,
          childName: f.child.trim() || undefined,
          childDob: f.dob || undefined,
          program: 'preschool',
          notes: `[From ${source}] Current school: ${f.school || 'N/A'}. Message: ${f.message || 'N/A'}`,
        }),
      })
    } catch (err) {
      console.error('Contact form submission error:', err)
    } finally {
      setBusy(false)
      setDone(true)
      setF(EMPTY)
    }
  }

  if (done) {
    return (
      <p className="ds-form__done" role="status">
        Thank you for contacting Sunshine Maple Bear. A member of our admissions team will be in touch with you shortly.
      </p>
    )
  }

  const field = (name: keyof Fields, label: string, opts: { required?: boolean; type?: string; placeholder?: string; full?: boolean } = {}) => (
    <div className={opts.full ? 'ds-form__field ds-form__field--full' : 'ds-form__field'}>
      <label htmlFor={`sf-${name}`}>
        {label}
        {opts.required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={`sf-${name}`}
        name={name}
        type={opts.type ?? 'text'}
        value={f[name]}
        onChange={set(name)}
        placeholder={opts.placeholder}
        aria-invalid={!!errors[name]}
      />
      {errors[name] && <span className="ds-form__error">{errors[name]}</span>}
    </div>
  )

  return (
    <form className="ds-form" onSubmit={submit} noValidate>
      {field('parent', 'Full name of parent / guardian', { required: true, placeholder: 'e.g. Nguyễn Văn Nam', full: true })}
      {field('phone', 'Phone number', { required: true, type: 'tel', placeholder: '0912 345 678' })}
      {field('email', 'Email address', { type: 'email', placeholder: 'parent@example.com' })}
      {field('child', 'Child’s full name', { placeholder: 'e.g. Nguyễn Minh Trí' })}
      {field('dob', 'Child’s date of birth', { type: 'date' })}
      {field('school', 'Current school / kindergarten', { placeholder: 'e.g. Mầm non Hoa Mi…', full: true })}
      <div className="ds-form__field ds-form__field--full">
        <label htmlFor="sf-message">Message / special enquiries</label>
        <textarea
          id="sf-message"
          name="message"
          rows={3}
          value={f.message}
          onChange={set('message')}
          placeholder="Tell us about your preferred visit time or questions…"
        />
      </div>
      <div className="ds-form__actions">
        <Button type="submit" variant="outline" tone="ink" disabled={busy}>
          {busy ? 'Sending…' : 'Send'}
        </Button>
      </div>
    </form>
  )
}
