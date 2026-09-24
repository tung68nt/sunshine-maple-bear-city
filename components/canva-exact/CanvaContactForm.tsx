'use client'
import { useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { CvForm } from './types'

type V = CSSProperties & Record<`--${string}`, string | number>

/**
 * Live inputs laid exactly over the Canva form artwork (labels/placeholders stay in the background image;
 * a field turns opaque once focused or filled).
 * Set NEXT_PUBLIC_CANVA_CONTACT_ENDPOINT to POST the values as JSON, e.g. to an API route of your own.
 */
export function CanvaContactForm({ form }: { form: CvForm }) {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    let ok = true
    f.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input,textarea').forEach((el) => {
      const bad = !el.checkValidity() || (el.required && !el.value.trim())
      el.setAttribute('aria-invalid', String(bad))
      if (bad) ok = false
    })
    if (!ok) return
    const data = Object.fromEntries(new FormData(f).entries())
    const url = process.env.NEXT_PUBLIC_CANVA_CONTACT_ENDPOINT
    setBusy(true)
    try {
      if (url) {
        const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        if (!r.ok) throw new Error(await r.text())
      }
      f.reset()
      setSent(true)
    } catch (err) {
      console.error(err)
      alert('Sorry, the form could not be sent. Please call 094 254 6655.')
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <span id="contact" className="cv-anchor" style={{ '--y': form.anchorY } as V} />
      <form id="cv-contact" className="cv-form" style={{ '--x': form.x, '--y': form.y } as V} noValidate onSubmit={onSubmit} aria-busy={busy}>
        {form.fields.map((x) => {
          const style: V = { '--x': x.x, '--y': x.y, '--w': x.w, '--h': x.h }
          if (x.type === 'textarea')
            return <textarea key={x.name} name={x.name} aria-label={x.label} placeholder=" " required={x.required} style={style} />
          if (x.type === 'date')
            return <input key={x.name} name={x.name} aria-label={x.label} placeholder=" " type="text" style={style}
              onFocus={(e) => { e.currentTarget.type = 'date' }}
              onBlur={(e) => { if (!e.currentTarget.value) e.currentTarget.type = 'text' }} />
          return <input key={x.name} name={x.name} aria-label={x.label} placeholder=" " type={x.type} required={x.required} style={style} />
        })}
        {sent && <p className="cv-form-ok" role="status">Thank you! We will contact you shortly.</p>}
      </form>
    </>
  )
}
