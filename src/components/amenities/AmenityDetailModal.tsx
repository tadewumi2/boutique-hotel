'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, ArrowRight } from 'lucide-react'
import { statusConfig } from '@/lib/amenities'
import type { Amenity } from '@/lib/amenities'

type Props = {
  amenity: Amenity | null
  onClose: () => void
}

export default function AmenityDetailModal({ amenity, onClose }: Props) {
  if (!amenity) return null
  const status = statusConfig[amenity.status]

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${amenity.name} details`}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        {amenity.detailImage && (
          <div className="relative aspect-[16/9]">
            <Image
              src={amenity.detailImage}
              alt={amenity.name}
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-7">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-1">{amenity.name}</h2>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                {status.label}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 transition-colors mt-1"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {amenity.detailDescription && (
            <p className="text-sm text-stone-500 leading-relaxed mb-5">
              {amenity.detailDescription}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-col gap-2 mb-6 text-xs text-stone-400">
            {amenity.availability && (
              <p>
                <span className="font-medium text-stone-600">Hours: </span>
                {amenity.availability}
              </p>
            )}
            {amenity.note && (
              <p>
                <span className="font-medium text-stone-600">Note: </span>
                {amenity.note}
              </p>
            )}
          </div>

          {/* CTA — US-D5 */}
          <Link
            href="/contact"
            data-analytics="amenity-detail-cta"
            className="flex items-center justify-between w-full px-5 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-white font-medium text-sm transition-colors group"
          >
            Book or Enquire
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
