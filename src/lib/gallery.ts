// ─────────────────────────────────────────────────────────────────────────────
// lib/gallery.ts  — Payload-driven gallery data fetching
// ─────────────────────────────────────────────────────────────────────────────

export type GalleryCategory = 'All' | 'Rooms' | 'Dining' | 'Wellness' | 'Exterior' | 'Experience'

export type GalleryImage = {
  id: string
  src: string
  alt: string
  caption?: string
  category: Exclude<GalleryCategory, 'All'>
  width: number
  height: number
  order: number
  roomSlug?: string
}

export const galleryCategories: GalleryCategory[] = [
  'All',
  'Rooms',
  'Dining',
  'Wellness',
  'Exterior',
  'Experience',
]

// ── Payload response shapes ───────────────────────────────────────────────────
type PayloadMediaDoc = {
  url: string
  alt: string
  width?: number
  height?: number
}

type PayloadRoomDoc = {
  slug: string
}

type PayloadGalleryDoc = {
  id: string
  image: PayloadMediaDoc
  caption?: string
  category: Exclude<GalleryCategory, 'All'>
  isVisible: boolean
  order: number
  room?: PayloadRoomDoc
}

type PayloadGalleryResponse = {
  docs: PayloadGalleryDoc[]
}

// ── Fetch all visible gallery images, sorted by order ────────────────────────
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

  const params = new URLSearchParams({
    'where[isVisible][equals]': 'true',
    sort: 'order',
    limit: '100',
    depth: '1',
  })

  const res = await fetch(`${base}/api/gallery?${params}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    console.error('Failed to fetch gallery images:', res.statusText)
    return []
  }

  const data: PayloadGalleryResponse = await res.json()

  return data.docs.map((doc) => ({
    id: doc.id,
    src: doc.image.url,
    alt: doc.image.alt,
    caption: doc.caption,
    category: doc.category,
    width: doc.image.width ?? 4,
    height: doc.image.height ?? 3,
    order: doc.order,
    roomSlug: doc.room?.slug,
  }))
}

// ── Filter helper (used client-side after initial fetch) ─────────────────────
export function filterByCategory(
  images: GalleryImage[],
  category: GalleryCategory,
): GalleryImage[] {
  if (category === 'All') return images
  return images.filter((img) => img.category === category)
}

// ── Fetch gallery images linked to a specific room ───────────────────────────
export async function getGalleryImagesByRoom(roomSlug: string): Promise<GalleryImage[]> {
  const all = await getGalleryImages()
  return all.filter((img) => img.roomSlug === roomSlug)
}
