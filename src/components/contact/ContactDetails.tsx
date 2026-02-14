import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import { hotelLocation } from '@/lib/location'

export default function ContactDetails() {
  return (
    <aside aria-label="Hotel contact information">
      {/* Quick contact — US-G4 */}
      <div className="bg-stone-900 rounded-2xl p-7 text-white mb-5">
        <h2 className="font-serif text-xl mb-6">Get in Touch</h2>

        <div className="flex flex-col gap-5">
          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Phone size={15} className="text-amber-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Phone</p>
              {/* US-G4 — clickable tel link on mobile */}
              <a
                href={hotelLocation.contact.phoneHref}
                className="text-sm text-white hover:text-amber-400 transition-colors"
                aria-label={`Call us at ${hotelLocation.contact.phone}`}
                data-analytics="contact-phone-click"
              >
                {hotelLocation.contact.phone}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Mail size={15} className="text-amber-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Email</p>
              {/* US-G4 — mailto link */}
              <a
                href={hotelLocation.contact.emailHref}
                className="text-sm text-white hover:text-amber-400 transition-colors"
                aria-label="Send us an email"
                data-analytics="contact-email-click"
              >
                {hotelLocation.contact.email}
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <MapPin size={15} className="text-amber-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Address</p>
              <address className="not-italic text-sm text-white/80 leading-relaxed">
                {hotelLocation.address.street}
                <br />
                {hotelLocation.address.postalCode} {hotelLocation.address.city}
                <br />
                {hotelLocation.address.country}
              </address>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Clock size={15} className="text-amber-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Reception</p>
              <p className="text-sm text-white/80">Open 24 hours, 7 days a week</p>
            </div>
          </div>
        </div>

        {/* Social — US-G4 */}
        <div className="flex gap-3 mt-7 pt-6 border-t border-white/10">
          {[
            { Icon: Instagram, href: '#', label: 'Follow us on Instagram' },
            { Icon: Facebook, href: '#', label: 'Follow us on Facebook' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:border-amber-500 hover:text-amber-500 transition-colors"
            >
              <Icon size={15} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Response time note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1.5">
          Response Time
        </p>
        <p className="text-sm text-amber-700 leading-relaxed">
          We aim to respond to all enquiries within <strong>24 hours</strong>. For urgent matters,
          please call us directly.
        </p>
      </div>
    </aside>
  )
}
