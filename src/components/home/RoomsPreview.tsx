import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const rooms = [
  {
    name: 'Classic Room',
    description:
      'Intimate and carefully composed. Natural light, warm linens, and a view of the courtyard.',
    size: '22 m²',
    guests: '2 guests',
    image: '/images/room-classic.jpg',
    href: '/rooms/classic',
  },
  {
    name: 'Deluxe Suite',
    description:
      'Generous space with a separate sitting area and curated art from local Parisian artists.',
    size: '38 m²',
    guests: '2 guests',
    image: '/images/room-deluxe.jpg',
    href: '/rooms/deluxe',
  },
  {
    name: 'Penthouse',
    description:
      'Our most elevated experience. Rooftop terrace, panoramic city views, private dining.',
    size: '72 m²',
    guests: '4 guests',
    image: '/images/room-penthouse.jpg',
    href: '/rooms/penthouse',
  },
]

export default function RoomsPreview() {
  return (
    <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 mb-3">
            Rooms & Suites
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight">
            Spaces Made for
            <br />
            <em className="italic text-stone-500">Rest and Wonder</em>
          </h2>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-stone-700 transition-colors group"
          >
            View Gallery
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors group"
          >
            View All Rooms
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Room cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Link key={room.name} href={room.href} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4">
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>

            <div className="px-1">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-serif text-xl text-stone-900">{room.name}</h3>
                <span className="text-xs text-stone-400 font-medium">{room.size}</span>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed mb-3">{room.description}</p>
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                {room.guests}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
