'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

type FormState = 'idle' | 'loading' | 'success' | 'error'
type FieldErrors = Record<string, string>

const inputClass = (error?: string) =>
  `w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
    error
      ? 'border-red-300 focus:ring-red-300 bg-red-50'
      : 'border-stone-200 focus:ring-amber-400 focus:border-transparent bg-white'
  }`

const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'General Enquiry',
  })

  const set =
    (k: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }))
      // Clear error on change
      if (fieldErrors[k])
        setFieldErrors((fe) => {
          const n = { ...fe }
          delete n[k]
          return n
        })
    }

  // Client-side validation — US-G2, G8
  const validate = (): boolean => {
    const errs: FieldErrors = {}
    if (!values.name.trim() || values.name.trim().length < 2)
      errs.name = 'Please enter your full name.'
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      errs.email = 'Please enter a valid email address.'
    if (!values.message.trim() || values.message.trim().length < 10)
      errs.message = 'Please enter a message (at least 10 characters).'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setState('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, _trap: '' }),
      })
      const data = await res.json()

      if (data.success) {
        setState('success')
        setValues({ name: '', email: '', phone: '', message: '', interest: 'General Enquiry' })
        setFieldErrors({})

        // US-G7 — analytics event
        window.dispatchEvent(
          new CustomEvent('contact:submitted', {
            detail: { interest: values.interest },
          }),
        )
      } else {
        setFieldErrors(data.errors ?? {})
        setState('idle')
      }
    } catch {
      setState('error')
    }
  }

  // Success state — US-G5
  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="font-serif text-2xl text-stone-900 mb-2">Message Received</h3>
        <p className="text-stone-500 text-sm leading-relaxed max-w-sm mb-6">
          Thank you for reaching out. A member of our team will respond within 24 hours — usually
          sooner.
        </p>
        <button
          onClick={() => setState('idle')}
          className="text-sm font-medium text-amber-600 hover:text-amber-700 underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      {/* Global error — US-G5 */}
      {state === 'error' && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-6"
          role="alert"
        >
          <AlertCircle size={17} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">
            Something went wrong. Please try again or email us directly at{' '}
            <a href="mailto:hello@maisonelara.com" className="underline">
              hello@maisonelara.com
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name — US-G2, G8 */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name{' '}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={set('name')}
            required
            aria-required="true"
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            aria-invalid={!!fieldErrors.name}
            className={inputClass(fieldErrors.name)}
          />
          {fieldErrors.name && (
            <p
              id="name-error"
              role="alert"
              className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
            >
              <AlertCircle size={11} /> {fieldErrors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address{' '}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={values.email}
            onChange={set('email')}
            required
            aria-required="true"
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            aria-invalid={!!fieldErrors.email}
            className={inputClass(fieldErrors.email)}
          />
          {fieldErrors.email && (
            <p
              id="email-error"
              role="alert"
              className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
            >
              <AlertCircle size={11} /> {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Phone — optional */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-stone-300 font-normal normal-case">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 234 567 8900"
            value={values.phone}
            onChange={set('phone')}
            className={inputClass()}
          />
        </div>

        {/* Enquiry type */}
        <div>
          <label htmlFor="interest" className={labelClass}>
            I'm enquiring about
          </label>
          <select
            id="interest"
            value={values.interest}
            onChange={set('interest')}
            className={inputClass() + ' cursor-pointer'}
          >
            {[
              'General Enquiry',
              'Room Booking',
              'Private Dining',
              'Wellness & Spa',
              'Special Occasion',
              'Group Booking',
            ].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        {/* Message — full width */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message{' '}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell us about your stay, dates, or any questions..."
            value={values.message}
            onChange={set('message')}
            required
            aria-required="true"
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
            aria-invalid={!!fieldErrors.message}
            className={inputClass(fieldErrors.message) + ' resize-none'}
          />
          {fieldErrors.message && (
            <p
              id="message-error"
              role="alert"
              className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
            >
              <AlertCircle size={11} /> {fieldErrors.message}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — US-G6, hidden from real users */}
      <input
        type="text"
        name="_trap"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="absolute left-[-9999px] w-px h-px overflow-hidden opacity-0"
        defaultValue=""
      />

      {/* Submit */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 disabled:bg-stone-200 disabled:text-stone-400 text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
          data-analytics="contact-form-submit"
        >
          {state === 'loading' ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Sending…
            </>
          ) : (
            'Send Message'
          )}
        </button>
        <p className="text-xs text-stone-400 mt-3">
          We reply within 24 hours · Your information is never shared.
        </p>
      </div>
    </form>
  )
}
