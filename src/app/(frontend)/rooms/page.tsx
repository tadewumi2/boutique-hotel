'use client'

import { useState } from 'react'
import RoomCard from '@/components/rooms/RoomCard'
import RoomsFilter from '@/components/rooms/RoomsFilter'
import { rooms as allRooms } from '@/lib/rooms'
import type { Room } from '@/lib/rooms'

export default function RoomsPage() {
  const [filtered, setFiltered] = useState<Room[]>(allRooms)

  return (
    <main className="pt-24">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 mb-3">
          Accommodations
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1 className="font-serif text-5xl text-stone-900 leading-tight">Rooms &amp; Suites</h1>
          <p className="text-stone-500 text-sm max-w-sm leading-relaxed">
            Each room is individually designed. No two are exactly alike — and that's entirely the
            point.
          </p>
        </div>
      </div>

      {/* Filter bar — US-B3 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <RoomsFilter rooms={allRooms} onFilter={setFiltered} />
      </div>

      {/* Room grid — US-B1, B2 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-stone-400">
            <p className="font-serif text-2xl mb-2">No rooms match your filters</p>
            <p className="text-sm">Try adjusting or clearing your selection</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
