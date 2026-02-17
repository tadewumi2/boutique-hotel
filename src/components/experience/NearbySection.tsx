import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import type { NearbyPlace } from '@/lib/experiences'

const categoryColors: Record<string, string> = {
  Park: 'bg-green-100 text-green-700',
  Museum: 'bg-purple-100 text-purple-700',
  Shopping: 'bg-pink-100 text-pink-700',
  Café: 'bg-amber-100 text-amber-700',
  Market: 'bg-orange-100 text-orange-700',
  default: 'bg-stone-100 text-stone-600',
}

export default function NearbySection({ places }: { places: NearbyPlace[] }) {
  return (
    <section id="nearby" className="py-20 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500 mb-3">
              The Neighbourhood
            </p>
            <h2 className="font-serif text-4xl text-white leading-tight">
              What's Around
              <br />
              <em className="italic text-stone-400">the Corner</em>
            </h2>
          </div>
          <Link
            href="/location"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-300 transition-colors group shrink-0"
          >
            View Full Map
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Places grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => {
            const colorClass = categoryColors[place.category] ?? categoryColors.default
            return (
              <div
                key={place.name}
                className="flex items-start gap-4 p-5 rounded-xl bg-stone-800 hover:bg-stone-700 transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-full bg-stone-700 flex items-center justify-center shrink-0">
                  <MapPin size={15} className="text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white leading-snug">{place.name}</h4>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${colorClass}`}
                    >
                      {place.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">
                    {place.distance}
                    {place.walkTime && ` · ${place.walkTime} walk`}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
