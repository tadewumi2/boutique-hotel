import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function StorySection() {
  return (
    <section className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Row 1 — image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="/images/story-lobby.jpg"
              alt="Golden Tee lobby bathed in warm afternoon light"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-4xl text-stone-900 leading-snug mb-6">
              Built on Intention,
              <br />
              <em className="italic text-stone-600">Not Convention</em>
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Golden Tee began as a love letter to slow living. Tucked within a 19th-century
              Haussmann building, every space was imagined not as a room to sleep in, but as a place
              to arrive.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              We work with local artisans, source materials with care, and design every detail to
              feel both timeless and alive.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-700 transition-colors group"
            >
              Read Our Story
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Row 2 — text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 lg:pr-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 mb-4">
              The Neighborhood
            </p>
            <h2 className="font-serif text-4xl text-stone-900 leading-snug mb-6">
              Paris at Your
              <br />
              <em className="italic text-stone-600">Own Pace</em>
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Steps from the Palais Royal, surrounded by independent bookshops, morning markets, and
              galleries that change with the season.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              Our concierge team crafts personal itineraries — whether you want to disappear into
              the city or simply sit still with a coffee.
            </p>
            <Link
              href="/location"
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-700 transition-colors group"
            >
              Explore the Area
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="/images/story-paris.jpg"
              alt="Parisian street view near Golden Tee at golden hour"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
