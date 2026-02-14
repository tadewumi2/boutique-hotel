'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { hotelLocation } from '@/lib/location'

// US-F8 — map lazy-loaded behind a click-to-load pattern to avoid
// Lighthouse penalty from iframe loading on page mount
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100">
      {!loaded ? (
        // Placeholder — click to load map
        <button
          onClick={() => setLoaded(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-stone-100 hover:bg-stone-200 transition-colors group"
          aria-label="Load interactive map"
        >
          <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
            <MapPin size={24} className="text-amber-500" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-stone-700">View on Map</p>
            <p className="text-xs text-stone-400 mt-0.5">Click to load interactive map</p>
          </div>
          {/* Static location pin overlay */}
          <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2 shadow-sm">
            <p className="text-xs font-semibold text-stone-800">{hotelLocation.name}</p>
            <p className="text-xs text-stone-400">{hotelLocation.address.full}</p>
          </div>
        </button>
      ) : (
        <iframe
          src={hotelLocation.maps.embed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing location of ${hotelLocation.name}`}
          className="absolute inset-0"
        />
      )}
    </div>
  )
}
