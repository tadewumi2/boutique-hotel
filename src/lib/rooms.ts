// ─────────────────────────────────────────────────────────────────────────────
// lib/rooms.ts  — Payload-driven room data fetching
// ─────────────────────────────────────────────────────────────────────────────

export type Room = {
  id: string
  slug: string
  name: string
  shortDescription: string
  fullDescription: unknown // Payload Lexical rich text — rendered via @payloadcms/richtext-lexical
  size: string
  occupancy: number
  bedType: string
  view: string
  priceFrom: number
  features: string[]
  amenities: string[]
  featuredImage?: { url: string; alt: string }
  gallery: { url: string; alt: string }[]
  images: string[]
  popular?: boolean
  order: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

// ── Payload response shapes ───────────────────────────────────────────────────
type PayloadMediaDoc = {
  url: string
  alt: string
}

type PayloadRoomDoc = {
  id: string
  slug: string
  name: string
  shortDescription: string
  fullDescription: unknown
  specs: {
    size: string
    occupancy: number
    bedType: string
    view: string
    priceFrom: number
  }
  features?: { feature: string }[]
  amenities?: { amenity: string }[]
  featuredImage?: PayloadMediaDoc
  gallery?: { image: PayloadMediaDoc }[]
  popular?: boolean
  order: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

type PayloadRoomsResponse = {
  docs: PayloadRoomDoc[]
}

// ── Fetch all published rooms, sorted by order field (US-2B4) ────────────────
export async function getRooms(): Promise<Room[]> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: 'order',
    limit: '20',
    depth: '1',
  })

  const res = await fetch(`${base}/api/rooms?${params}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    console.error('Failed to fetch rooms:', res.statusText)
    return []
  }

  const data: PayloadRoomsResponse = await res.json()
  return data.docs.map(normaliseRoom)
}

// ── Fetch a single room by slug ───────────────────────────────────────────────
export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    limit: '1',
    depth: '1',
  })

  const res = await fetch(`${base}/api/rooms?${params}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) return null

  const data: PayloadRoomsResponse = await res.json()
  const doc = data.docs[0]
  return doc ? normaliseRoom(doc) : null
}

// ── Fetch all published slugs (for generateStaticParams) ─────────────────────
export async function getAllRoomSlugs(): Promise<string[]> {
  const rooms = await getRooms()
  return rooms.map((r) => r.slug)
}

// ── Normalise Payload doc → Room type ─────────────────────────────────────────
function normaliseRoom(doc: PayloadRoomDoc): Room {
  return {
    id: doc.id,
    slug: doc.slug,
    name: doc.name,
    shortDescription: doc.shortDescription,
    fullDescription: doc.fullDescription,
    size: doc.specs.size,
    occupancy: doc.specs.occupancy,
    bedType: doc.specs.bedType,
    view: doc.specs.view,
    priceFrom: doc.specs.priceFrom,
    features: (doc.features ?? []).map((f) => f.feature),
    amenities: (doc.amenities ?? []).map((a) => a.amenity),
    featuredImage: doc.featuredImage
      ? { url: doc.featuredImage.url, alt: doc.featuredImage.alt }
      : undefined,
    gallery: (doc.gallery ?? [])
      .filter((g) => g.image)
      .map((g) => ({ url: g.image.url, alt: g.image.alt })),
    images: doc.featuredImage ? [doc.featuredImage.url] : [],
    popular: doc.popular,
    order: doc.order,
    seo: doc.seo,
  }
}
