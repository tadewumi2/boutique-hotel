'use client'

import { useState } from 'react'
import type { Room } from '@/lib/rooms'

type Props = {
  rooms: Room[]
  onFilter: (filtered: Room[]) => void
}

const BED_TYPES = ['All', 'Queen', 'King', 'King + Twin']
const OCCUPANCY = ['All', '2', '4']
const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Popular', value: 'popular' },
]

export default function RoomsFilter({ rooms, onFilter }: Props) {
  const [bed, setBed] = useState('All')
  const [occupancy, setOccupancy] = useState('All')
  const [sort, setSort] = useState('default')

  const apply = (newBed: string, newOcc: string, newSort: string) => {
    let result = [...rooms]

    if (newBed !== 'All') result = result.filter((r) => r.bedType === newBed)
    if (newOcc !== 'All') result = result.filter((r) => r.occupancy === parseInt(newOcc))

    if (newSort === 'price_asc') result.sort((a, b) => a.priceFrom - b.priceFrom)
    else if (newSort === 'price_desc') result.sort((a, b) => b.priceFrom - a.priceFrom)
    else if (newSort === 'popular') result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))

    onFilter(result)
  }

  const handleBed = (v: string) => {
    setBed(v)
    apply(v, occupancy, sort)
  }
  const handleOcc = (v: string) => {
    setOccupancy(v)
    apply(bed, v, sort)
  }
  const handleSort = (v: string) => {
    setSort(v)
    apply(bed, occupancy, v)
  }

  const reset = () => {
    setBed('All')
    setOccupancy('All')
    setSort('default')
    onFilter(rooms)
  }

  const isFiltered = bed !== 'All' || occupancy !== 'All' || sort !== 'default'

  return (
    <div className="flex flex-wrap items-center gap-4 py-5 border-b border-stone-200 mb-10">
      {/* Bed type */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Bed</span>
        <div className="flex gap-1">
          {BED_TYPES.map((b) => (
            <button
              key={b}
              onClick={() => handleBed(b)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                bed === b
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Occupancy */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Guests
        </span>
        <div className="flex gap-1">
          {OCCUPANCY.map((o) => (
            <button
              key={o}
              onClick={() => handleOcc(o)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                occupancy === o
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {o === 'All' ? 'All' : `${o} guests`}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Sort</span>
        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          className="text-xs bg-stone-100 text-stone-700 border-none rounded-full px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset */}
      {isFiltered && (
        <button
          onClick={reset}
          className="text-xs text-amber-700 hover:text-amber-700 font-medium underline underline-offset-2"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
