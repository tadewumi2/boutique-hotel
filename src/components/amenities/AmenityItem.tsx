'use client'

import {
  Wifi,
  Coffee,
  GlassWater,
  Lock,
  Tv,
  Sparkles,
  Sun,
  Leaf,
  BookOpen,
  Dumbbell,
  UtensilsCrossed,
  MapPin,
  ChefHat,
  Shirt,
  Car,
  BedDouble,
  Accessibility,
  Package,
  Zap,
  PawPrint,
  Clock,
  type LucideIcon,
} from 'lucide-react'
import { statusConfig, seasonConfig } from '@/lib/amenities'
import type { Amenity } from '@/lib/amenities'

// Icon map — keeps JSX out of data layer
const iconMap: Record<string, LucideIcon> = {
  Wifi,
  Coffee,
  GlassWater,
  Lock,
  Tv,
  Sparkles,
  Sun,
  Leaf,
  BookOpen,
  Dumbbell,
  UtensilsCrossed,
  MapPin,
  ChefHat,
  Shirt,
  Car,
  BedDouble,
  Accessibility,
  Package,
  Zap,
  PawPrint,
}

type Props = {
  amenity: Amenity
  onOpenDetail?: (amenity: Amenity) => void
}

export default function AmenityItem({ amenity, onOpenDetail }: Props) {
  const Icon = iconMap[amenity.icon] ?? Sparkles
  const status = statusConfig[amenity.status]
  const season = amenity.season ? seasonConfig[amenity.season] : null

  return (
    <div
      className={`group flex items-start gap-4 p-4 rounded-xl border transition-all duration-200
        ${
          amenity.hasDetail
            ? 'border-stone-200 hover:border-amber-300 hover:bg-amber-50 cursor-pointer'
            : 'border-stone-100 bg-stone-50 hover:bg-white'
        }`}
      onClick={() => amenity.hasDetail && onOpenDetail?.(amenity)}
      role={amenity.hasDetail ? 'button' : undefined}
      tabIndex={amenity.hasDetail ? 0 : undefined}
      onKeyDown={(e) => e.key === 'Enter' && amenity.hasDetail && onOpenDetail?.(amenity)}
      aria-label={amenity.hasDetail ? `View details for ${amenity.name}` : undefined}
    >
      {/* Icon — US-D8 accessible */}
      <div
        className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-sm"
        aria-hidden="true"
      >
        <Icon size={17} className="text-amber-600" />
      </div>

      <div className="flex-1 min-w-0">
        {/* Name + badges */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-stone-900">{amenity.name}</h3>
          {/* Status badge — US-D3 */}
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.color}`}>
            {status.label}
          </span>
          {/* Seasonal badge — US-D4 */}
          {season && amenity.season !== 'year-round' && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${season.color}`}>
              {season.label}
            </span>
          )}
        </div>

        {/* Description */}
        {amenity.description && (
          <p className="text-xs text-stone-600 leading-relaxed mb-1.5">{amenity.description}</p>
        )}

        {/* Availability — US-D4 */}
        {amenity.availability && (
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <Clock size={11} aria-hidden="true" />
            <span>{amenity.availability}</span>
          </div>
        )}

        {/* Note — US-D3 */}
        {amenity.note && <p className="text-xs text-stone-500 italic mt-1">{amenity.note}</p>}

        {/* Detail link hint */}
        {amenity.hasDetail && (
          <p className="text-xs text-amber-700 font-medium mt-1.5 group-hover:underline">
            View details →
          </p>
        )}
      </div>
    </div>
  )
}
