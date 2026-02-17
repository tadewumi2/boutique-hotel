// ─────────────────────────────────────────────────────────────────────────────
// lib/amenities.ts
// Static types + config (used by components) + Payload fetch functions
// ─────────────────────────────────────────────────────────────────────────────

export type AmenityStatus = 'included' | 'paid' | 'on-request'
export type AmenitySeason = 'year-round' | 'summer' | 'winter' | 'seasonal'
export type AmenityCategory = 'in-room' | 'property' | 'services' | 'connectivity'

export type Amenity = {
  id: string
  name: string
  description?: string
  status: AmenityStatus
  availability?: string
  season?: AmenitySeason
  note?: string
  hasDetail?: boolean
  detailImage?: string
  detailDescription?: string
  icon: string
  order: number
  category: AmenityCategory
}

export type AmenityGroup = {
  id: string
  title: string
  subtitle?: string
  amenities: Amenity[]
}

// ── Category metadata — controls page section order + labels ─────────────────
export const categoryMeta: Record<AmenityCategory, { title: string; subtitle: string }> = {
  'in-room': {
    title: 'In-Room',
    subtitle: 'Every room is equipped with thoughtfully selected comforts.',
  },
  property: {
    title: 'Property',
    subtitle: 'Spaces designed for rest, connection, and curiosity.',
  },
  services: {
    title: 'Guest Services',
    subtitle: 'A team dedicated to making your stay effortless.',
  },
  connectivity: {
    title: 'Accessibility & Connectivity',
    subtitle: 'Practical details that matter.',
  },
}

export const categoryOrder: AmenityCategory[] = ['in-room', 'property', 'services', 'connectivity']

export const statusConfig: Record<AmenityStatus, { label: string; color: string }> = {
  included: { label: 'Included', color: 'bg-green-100 text-green-700' },
  paid: { label: 'Paid', color: 'bg-amber-100 text-amber-700' },
  'on-request': { label: 'On Request', color: 'bg-blue-100 text-blue-700' },
}

export const seasonConfig: Record<AmenitySeason, { label: string; color: string }> = {
  'year-round': { label: 'Year-Round', color: 'bg-stone-100 text-stone-600' },
  summer: { label: 'Summer', color: 'bg-yellow-100 text-yellow-700' },
  winter: { label: 'Winter', color: 'bg-blue-100 text-blue-600' },
  seasonal: { label: 'Seasonal', color: 'bg-orange-100 text-orange-700' },
}

// ── Payload response shapes ───────────────────────────────────────────────────
type PayloadMediaDoc = { url: string }

type PayloadAmenityDoc = {
  id: string
  name: string
  category: AmenityCategory
  pricingStatus: AmenityStatus
  description?: string
  icon?: string
  availability?: string
  season?: AmenitySeason
  note?: string
  hasDetail?: boolean
  detailImage?: PayloadMediaDoc
  detailDescription?: string
  order: number
}

type PayloadAmenitiesResponse = {
  docs: PayloadAmenityDoc[]
}

// ── Fetch all published amenities, sorted by order ───────────────────────────
export async function getAmenities(): Promise<Amenity[]> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: 'order',
    limit: '100',
    depth: '1',
  })

  const res = await fetch(`${base}/api/amenities?${params}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    console.error('Failed to fetch amenities:', res.statusText)
    return []
  }

  const data: PayloadAmenitiesResponse = await res.json()

  return data.docs.map((doc) => ({
    id: doc.id,
    name: doc.name,
    category: doc.category,
    status: doc.pricingStatus,
    description: doc.description,
    icon: doc.icon ?? 'Sparkles',
    availability: doc.availability,
    season: doc.season,
    note: doc.note,
    hasDetail: doc.hasDetail,
    detailImage: doc.detailImage?.url,
    detailDescription: doc.detailDescription,
    order: doc.order,
  }))
}

// ── Group amenities by category in defined order ──────────────────────────────
export function groupAmenities(amenities: Amenity[]): AmenityGroup[] {
  return categoryOrder
    .map((cat) => {
      const meta = categoryMeta[cat]
      const items = amenities.filter((a) => a.category === cat)
      if (items.length === 0) return null
      return {
        id: cat,
        title: meta.title,
        subtitle: meta.subtitle,
        amenities: items, // already sorted by order from API
      }
    })
    .filter(Boolean) as AmenityGroup[]
}
