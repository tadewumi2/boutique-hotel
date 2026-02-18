import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'
import ContactDetails from '@/components/contact/ContactDetails'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Book',
  description:
    'Get in touch with Golden Tee — enquire about rooms, dining, experiences, or book your stay in Paris.',
}

export default function ContactPage() {
  return (
    <main className="pt-24">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 mb-3">
          Contact & Book
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <h1 className="font-serif text-5xl lg:text-6xl text-stone-900 leading-tight">
            Let&apos;s Plan
            <br />
            <em className="italic text-stone-500">Your Stay</em>
          </h1>
          <p className="text-stone-600 text-base leading-relaxed max-w-md">
            Whether you have a question, a special request, or you&apos;re ready to book — our team is
            here. We prefer conversations to booking engines.
          </p>
        </div>
      </div>

      {/* Book Now banner — US-G3 */}
      <div className="bg-amber-500 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-medium text-sm">
            Ready to book directly? Skip the form and reserve your room now.
          </p>
          <Link
            href="https://book.maisonelara.com"
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="contact-book-now-banner"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-amber-700 font-semibold text-sm hover:bg-amber-50 transition-colors group whitespace-nowrap"
            aria-label="Book your room directly (opens in new tab)"
          >
            Book Now
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact form — US-G2, G5, G6, G8 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <h2 className="font-serif text-2xl text-stone-900 mb-2">Send a Message</h2>
              <p className="text-sm text-stone-500 mb-8">
                Fields marked <span className="text-red-400">*</span> are required.
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Contact details sidebar — US-G1, G4 */}
          <div className="lg:col-span-1">
            <ContactDetails />
          </div>
        </div>
      </div>

      {/* FAQ teaser */}
      <div className="bg-stone-50 border-t border-stone-100 py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-serif text-3xl text-stone-900 mb-4">Common Questions</h2>
          <p className="text-stone-600 text-sm mb-8 leading-relaxed">
            A few things guests usually ask before arriving.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              {
                q: 'What time is check-in and check-out?',
                a: 'Check-in is from 3pm. Check-out is by 11am. Early and late options available on request.',
              },
              {
                q: 'Is breakfast included?',
                a: 'Yes — a freshly prepared continental and hot breakfast is included for all guests.',
              },
              {
                q: 'Do you accept pets?',
                a: 'Selected rooms welcome small pets under 10kg. Please mention this when enquiring.',
              },
              {
                q: 'Is parking available?',
                a: 'Valet parking is available on request. Street parking is limited in the area.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-stone-200 p-5">
                <h3 className="text-sm font-semibold text-stone-900 mb-2">{q}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
