'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AmenityGroup from '@/components/amenities/AmenityGroup'
import AmenityDetailModal from '@/components/amenities/AmenityDetailModal'
import type { Amenity, AmenityGroup as AmenityGroupType } from '@/lib/amenities'

type Props = {
  groups: AmenityGroupType[]
}

export default function AmenitiesClient({ groups }: Props) {
  const [activeAmenity, setActiveAmenity] = useState<Amenity | null>(null)

  return (
    <>
      <main className="pt-24">
        {/* Page header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 mb-3">
            Amenities
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <h1 className="font-serif text-5xl lg:text-6xl text-stone-900 leading-tight">
              Everything You Need,
              <br />
              <em className="italic text-stone-400">Nothing Extra.</em>
            </h1>
            <p className="text-stone-500 text-base leading-relaxed max-w-md">
              We've considered every detail of your stay — from the coffee machine in your room to
              the concierge who knows Paris better than a guidebook.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-8">
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Included', color: 'bg-green-100 text-green-700' },
              { label: 'Paid', color: 'bg-amber-100 text-amber-700' },
              { label: 'On Request', color: 'bg-blue-100 text-blue-700' },
              { label: 'Seasonal', color: 'bg-orange-100 text-orange-700' },
            ].map(({ label, color }) => (
              <span key={label} className={`text-xs font-medium px-3 py-1 rounded-full ${color}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Sticky section nav — built from live groups */}
        <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-sm border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex gap-6 overflow-x-auto py-3 scrollbar-none">
              {groups.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="text-sm font-medium text-stone-500 hover:text-amber-600 whitespace-nowrap transition-colors pb-1 border-b-2 border-transparent hover:border-amber-500"
                >
                  {g.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Amenity groups */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 space-y-16">
          {groups.length > 0 ? (
            groups.map((group) => (
              <AmenityGroup key={group.id} group={group} onOpenDetail={setActiveAmenity} />
            ))
          ) : (
            <p className="text-center text-stone-400 py-20 text-sm tracking-widest uppercase">
              No amenities published yet.
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="bg-stone-900 py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 mb-4">
              Ready to Arrive?
            </p>
            <h2 className="font-serif text-4xl text-white leading-tight mb-5">
              Every amenity is waiting
              <br />
              <em className="italic text-stone-400">for your arrival.</em>
            </h2>
            <p className="text-stone-400 text-sm max-w-md mx-auto leading-relaxed mb-10">
              Have a question about a specific service, or need something arranged before you check
              in? Our team is ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                data-analytics="amenities-cta-book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-white font-medium text-sm transition-all duration-200 group"
              >
                Book Your Stay
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                data-analytics="amenities-cta-enquire"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-stone-600 hover:border-stone-400 text-stone-300 hover:text-white font-medium text-sm transition-all duration-200"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Detail modal */}
      <AmenityDetailModal amenity={activeAmenity} onClose={() => setActiveAmenity(null)} />
    </>
  )
}
