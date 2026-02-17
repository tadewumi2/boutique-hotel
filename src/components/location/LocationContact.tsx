import { MapPin, Phone, Mail, Copy } from 'lucide-react'
import { hotelLocation } from '@/lib/location'

export default function LocationContact() {
  return (
    <section
      id="contact-details"
      className="bg-stone-900 rounded-2xl p-8 text-white"
      aria-label="Hotel contact details"
    >
      <h2 className="font-serif text-2xl mb-6">Find Us</h2>

      <div className="flex flex-col gap-5">
        {/* Address — US-F7 copyable, US-F9 text outside map */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-amber-500" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Address</p>
            {/* Full address as selectable text — US-F7, F9 */}
            <address className="not-italic text-sm text-white leading-relaxed">
              {hotelLocation.address.street}
              <br />
              {hotelLocation.address.postalCode} {hotelLocation.address.city}
              <br />
              {hotelLocation.address.country}
            </address>
          </div>
        </div>

        {/* Phone — US-F7 clickable on mobile */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Phone size={16} className="text-amber-500" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Phone</p>
            <a
              href={hotelLocation.contact.phoneHref}
              className="text-sm text-white hover:text-amber-500 transition-colors"
              aria-label={`Call us at ${hotelLocation.contact.phone}`}
              data-analytics="location-phone-click"
            >
              {hotelLocation.contact.phone}
            </a>
          </div>
        </div>

        {/* Email — US-F7 opens mail client */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Mail size={16} className="text-amber-500" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Email</p>
            <a
              href={hotelLocation.contact.emailHref}
              className="text-sm text-white hover:text-amber-500 transition-colors"
              aria-label="Send us an email"
              data-analytics="location-email-click"
            >
              {hotelLocation.contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
