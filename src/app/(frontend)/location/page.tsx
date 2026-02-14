import Link from 'next/link'
import { ArrowRight, Map, Navigation } from 'lucide-react'
import { hotelLocation, travelMethods, neighborhoodHighlights } from '@/lib/location'
import { nearbyPlaces } from '@/lib/experiences'
import MapEmbed from '@/components/location/MapEmbed'
import GettingThere from '@/components/location/GettingThere'
import NeighborhoodSection from '@/components/location/NeighborhoodSection'
import LocationContact from '@/components/location/LocationContact'
import NearbySection from '@/components/experience/NearbySection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Location & Neighbourhood',
  description:
    "Maison Elara is located at the heart of Paris' 1st arrondissement — steps from the Louvre, Palais Royal, and the best of the city.",
}

export default function LocationPage() {
  return (
    <main className="pt-24">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 mb-3">
          Location
        </p>
        {/* US-F9 — semantic H1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <h1 className="font-serif text-5xl lg:text-6xl text-stone-900 leading-tight">
            In the Heart
            <br />
            <em className="italic text-stone-400">of Paris</em>
          </h1>
          <p className="text-stone-500 text-base leading-relaxed max-w-md">{hotelLocation.intro}</p>
        </div>
      </div>

      {/* Sticky section nav */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-sm border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-6 overflow-x-auto py-3">
            {[
              { label: 'Map', href: '#map' },
              { label: 'Getting Here', href: '#getting-here' },
              { label: 'Neighbourhood', href: '#neighbourhood' },
              { label: 'Nearby', href: '#nearby' },
              { label: 'Contact', href: '#contact-details' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-stone-500 hover:text-amber-600 whitespace-nowrap transition-colors pb-1 border-b-2 border-transparent hover:border-amber-500"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 space-y-20">
        {/* Map section — US-F1, F2, F8 */}
        <section id="map" className="scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map embed */}
            <div className="lg:col-span-2">
              <MapEmbed />
            </div>

            {/* Map actions + contact sidebar */}
            <div className="flex flex-col gap-4">
              {/* Address block — US-F7, F9 */}
              <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6">
                <h2 className="font-serif text-xl text-stone-900 mb-4">Our Address</h2>
                <address className="not-italic text-sm text-stone-600 leading-relaxed mb-5">
                  {hotelLocation.address.street}
                  <br />
                  {hotelLocation.address.postalCode} {hotelLocation.address.city}
                  <br />
                  {hotelLocation.address.country}
                </address>

                {/* Map links — US-F2, F10 */}
                <div className="flex flex-col gap-2">
                  <a
                    href={hotelLocation.maps.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics="location-google-maps-click"
                    aria-label="Open hotel location in Google Maps (opens in new tab)"
                    className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl bg-white border border-stone-200 hover:border-amber-400 text-sm font-medium text-stone-700 hover:text-amber-600 transition-all"
                  >
                    <Map size={15} className="text-amber-500" aria-hidden="true" />
                    Open in Google Maps
                  </a>
                  <a
                    href={hotelLocation.maps.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics="location-apple-maps-click"
                    aria-label="Open hotel location in Apple Maps (opens in new tab)"
                    className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl bg-white border border-stone-200 hover:border-amber-400 text-sm font-medium text-stone-700 hover:text-amber-600 transition-all"
                  >
                    <Navigation size={15} className="text-amber-500" aria-hidden="true" />
                    Open in Apple Maps
                  </a>
                </div>
              </div>

              {/* Contact card — US-F7 */}
              <LocationContact />
            </div>
          </div>
        </section>

        {/* Getting There — US-F4 */}
        <GettingThere methods={travelMethods} />

        {/* Neighbourhood — US-F5 */}
        <NeighborhoodSection highlights={neighborhoodHighlights} />
      </div>

      {/* Nearby places — US-F3 (reusing component from Experience) */}
      <NearbySection places={nearbyPlaces} />

      {/* CTA — US-F6, F10 */}
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600 mb-4">
          The Location Works?
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-5">
          Then all that's left
          <br />
          <em className="italic text-amber-600">is booking.</em>
        </h2>
        <p className="text-stone-500 text-sm max-w-md mx-auto leading-relaxed mb-10">
          Reserve your room, arrange a transfer, or simply reach out with a question. We're here
          before you even arrive.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            data-analytics="location-cta-book"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-white font-medium text-sm transition-all duration-200 group"
          >
            Book Your Stay
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            data-analytics="location-cta-enquire"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-stone-300 hover:border-stone-400 text-stone-700 hover:text-stone-900 font-medium text-sm transition-all duration-200"
          >
            Ask a Question
          </Link>
        </div>
      </div>
    </main>
  )
}
