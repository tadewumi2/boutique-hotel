import type { Season } from '@/lib/experiences'

const config: Record<Season, { label: string; color: string }> = {
  'year-round': { label: 'Year-Round', color: 'bg-stone-100 text-stone-500' },
  summer: { label: 'Summer Only', color: 'bg-amber-100 text-amber-700' },
  winter: { label: 'Winter Only', color: 'bg-blue-100 text-blue-700' },
  spring: { label: 'Spring & Summer', color: 'bg-green-100 text-green-700' },
  autumn: { label: 'Autumn Only', color: 'bg-orange-100 text-orange-700' },
}

export default function SeasonalBadge({ season }: { season: Season }) {
  const { label, color } = config[season]
  return (
    <span
      className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${color}`}
    >
      {label}
    </span>
  )
}
