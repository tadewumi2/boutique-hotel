import Image from 'next/image'
import Link from 'next/link'
import { Users, BedDouble, Maximize2, Eye, ArrowRight } from 'lucide-react'
import type { Room } from '@/lib/rooms'

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Popular badge */}
        {room.popular && (
          <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
            Popular
          </span>
        )}
        {/* Price */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 text-right">
          <p className="text-xs text-stone-400 leading-none mb-0.5">From</p>
          <p className="text-base font-semibold text-stone-900">
            €{room.priceFrom}
            <span className="text-xs font-normal text-stone-400">/night</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-xl text-stone-900 mb-2">{room.name}</h3>
        <p className="text-sm text-stone-500 leading-relaxed mb-5 line-clamp-2">
          {room.shortDescription}
        </p>

        {/* Key info grid — US-B2, B6 */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Users size={13} className="text-amber-500 shrink-0" />
            <span>
              {room.occupancy} {room.occupancy === 1 ? 'Guest' : 'Guests'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <BedDouble size={13} className="text-amber-500 shrink-0" />
            <span>{room.bedType}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Maximize2 size={13} className="text-amber-500 shrink-0" />
            <span>{room.size} m²</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Eye size={13} className="text-amber-500 shrink-0" />
            <span>{room.view}</span>
          </div>
        </div>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {room.features.slice(0, 3).map((f) => (
            <span key={f} className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/rooms/${room.slug}`}
          className="flex items-center justify-between w-full px-5 py-3 rounded-full bg-stone-900 hover:bg-amber-500 text-white text-sm font-medium transition-colors duration-200 group/btn"
        >
          View Details
          <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
