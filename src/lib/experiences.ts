// ─────────────────────────────────────────────────────────────────────────────
// lib/experiences.ts — Payload-driven experience data fetching
// ─────────────────────────────────────────────────────────────────────────────

export type Season = 'year-round' | 'summer' | 'winter' | 'spring' | 'autumn'

export type NearbyPlace = {
  name: string
  category: string
  distance: string
  walkTime?: string
}

export type Experience = {
  id: string
  slug: string
  title: string
  category: string
  tagline: string
  description: string
  fullDescription: unknown // Lexical rich text
  image: { url: string; alt: string }
  gallery: { url: string; alt: string }[]
  season: Season
  hours?: string
  reservationNote?: string
  pricingNote?: string
  features: string[]
  order: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

// ── Nearby places — static, not CMS-driven ───────────────────────────────────
export const nearbyPlaces: NearbyPlace[] = [
  { name: 'Palais Royal Gardens', category: 'Park', distance: '200m', walkTime: '3 min' },
  { name: 'Louvre Museum', category: 'Museum', distance: '400m', walkTime: '5 min' },
  { name: 'Galerie Vivienne', category: 'Shopping', distance: '350m', walkTime: '4 min' },
  { name: 'Café de Flore', category: 'Café', distance: '2.1km', walkTime: '25 min' },
  { name: 'Marché des Enfants Rouges', category: 'Market', distance: '1.8km', walkTime: '22 min' },
  { name: 'Centre Pompidou', category: 'Museum', distance: '1.2km', walkTime: '15 min' },
]

// ── Payload response shapes ───────────────────────────────────────────────────
type PayloadMediaDoc = { url: string; alt: string }

type PayloadExperienceDoc = {
  id: string
  slug: string
  title: string
  category: string
  tagline?: string
  description: string
  fullDescription?: unknown
  image: PayloadMediaDoc
  gallery?: { image: PayloadMediaDoc }[]
  season: Season
  details?: {
    hours?: string
    pricingNote?: string
    reservationNote?: string
  }
  features?: { feature: string }[]
  order: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

type PayloadExperiencesResponse = { docs: PayloadExperienceDoc[] }

// ── Fetch all published experiences, sorted by order ─────────────────────────
export async function getExperiences(): Promise<Experience[]> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: 'order',
    limit: '50',
    depth: '1',
  })

  const res = await fetch(`${base}/api/experiences?${params}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    console.error('Failed to fetch experiences:', res.statusText)
    return []
  }

  const data: PayloadExperiencesResponse = await res.json()
  return data.docs.map(normalise)
}

// ── Fetch a single experience by slug ────────────────────────────────────────
export async function getExperienceBySlug(slug: string): Promise<Experience | null> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    limit: '1',
    depth: '1',
  })

  const res = await fetch(`${base}/api/experiences?${params}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) return null
  const data: PayloadExperiencesResponse = await res.json()
  const doc = data.docs[0]
  return doc ? normalise(doc) : null
}

// ── Fetch all published slugs (for generateStaticParams) ─────────────────────
export async function getAllExperienceSlugs(): Promise<string[]> {
  const exps = await getExperiences()
  return exps.map((e) => e.slug)
}

// ── Normalise Payload doc → Experience type ───────────────────────────────────
function normalise(doc: PayloadExperienceDoc): Experience {
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    tagline: doc.tagline ?? '',
    description: doc.description,
    fullDescription: doc.fullDescription,
    image: { url: doc.image.url, alt: doc.image.alt },
    gallery: (doc.gallery ?? []).map((g) => ({ url: g.image.url, alt: g.image.alt })),
    season: doc.season,
    hours: doc.details?.hours,
    pricingNote: doc.details?.pricingNote,
    reservationNote: doc.details?.reservationNote,
    features: (doc.features ?? []).map((f) => f.feature),
    order: doc.order,
    seo: doc.seo,
  }
}
