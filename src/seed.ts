import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.resolve(__dirname, '../public/images')

// ── Helper: create a media record from a local file ──────────────────────────
async function createMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
  alt: string,
  caption?: string,
): Promise<string | null> {
  const filePath = path.join(IMAGES_DIR, filename)

  if (!fs.existsSync(filePath)) {
    console.log(`    ⚠️  File not found, skipping: ${filename}`)
    return null
  }

  // Check if media record already exists
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log(`    ⏭  Media exists — ${filename}`)
    return existing.docs[0]?.id as string
  }

  const fileBuffer = fs.readFileSync(filePath)
  const mimetype = filename.endsWith('.png') ? 'image/png' : 'image/jpeg'

  const media = await payload.create({
    collection: 'media',
    data: { alt, caption: caption ?? '' },
    file: {
      data: fileBuffer,
      mimetype,
      name: filename,
      size: fileBuffer.length,
    },
  })

  console.log(`    📸 Uploaded — ${filename}`)
  return media.id as string
}

// ── Room data ─────────────────────────────────────────────────────────────────
const roomData = [
  {
    name: 'Classic Room',
    slug: 'classic-room',
    shortDescription:
      'Intimate and carefully composed. Natural light, warm linens, and a view of the courtyard.',
    fullDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'The Classic Room is a study in quiet elegance. Designed to feel like a well-loved Parisian apartment, it features bespoke furniture, hand-selected textiles, and warm ambient lighting. Floor-to-ceiling curtains frame a courtyard view that changes beautifully with the seasons.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    specs: { size: '22', occupancy: 2, bedType: 'Queen', view: 'Courtyard', priceFrom: 180 },
    featuredImageFile: 'room-classic.jpg',
    featuredImageAlt: 'Classic Room with courtyard view',
    galleryFiles: ['room-classic.jpg'],
    features: [
      { feature: 'Courtyard View' },
      { feature: 'Queen Bed' },
      { feature: 'Rainfall Shower' },
    ],
    amenities: [
      { amenity: 'Free Wi-Fi' },
      { amenity: 'Nespresso Machine' },
      { amenity: 'Rainfall Shower' },
      { amenity: 'Premium Toiletries' },
      { amenity: 'Daily Housekeeping' },
      { amenity: 'In-Room Safe' },
      { amenity: 'Flat Screen TV' },
      { amenity: 'Mini Bar' },
    ],
    popular: false,
  },
  {
    name: 'Deluxe Suite',
    slug: 'deluxe-suite',
    shortDescription:
      'Generous space with a separate sitting area and curated art from local Parisian artists.',
    fullDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'The Deluxe Suite offers a gracious sense of space rarely found in the heart of Paris. A separate sitting room furnished with original artwork and a handcrafted writing desk creates a sanctuary for both rest and inspiration.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    specs: { size: '38', occupancy: 2, bedType: 'King', view: 'City', priceFrom: 280 },
    featuredImageFile: 'room-deluxe.jpg',
    featuredImageAlt: 'Deluxe Suite with city view and sitting area',
    galleryFiles: ['room-deluxe.jpg'],
    features: [
      { feature: 'City View' },
      { feature: 'King Bed' },
      { feature: 'Soaking Tub' },
      { feature: 'Sitting Area' },
    ],
    amenities: [
      { amenity: 'Free Wi-Fi' },
      { amenity: 'Nespresso Machine' },
      { amenity: 'Soaking Tub' },
      { amenity: 'Rainfall Shower' },
      { amenity: 'Premium Toiletries' },
      { amenity: 'Daily Housekeeping' },
      { amenity: 'In-Room Safe' },
      { amenity: 'Flat Screen TV' },
      { amenity: 'Mini Bar' },
      { amenity: 'Separate Sitting Area' },
      { amenity: 'Writing Desk' },
    ],
    popular: true,
  },
  {
    name: 'Junior Suite',
    slug: 'junior-suite',
    shortDescription: 'A refined blend of comfort and character, ideal for longer stays.',
    fullDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'The Junior Suite bridges intimacy and space. A thoughtfully zoned layout separates sleeping and living areas without sacrificing warmth. Original parquet floors, linen upholstery, and a private dressing room make it an ideal choice for guests who appreciate the details of a longer stay.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    specs: { size: '30', occupancy: 2, bedType: 'King', view: 'Courtyard', priceFrom: 230 },
    featuredImageFile: 'room-junior.jpg',
    featuredImageAlt: 'Junior Suite with parquet flooring',
    galleryFiles: ['room-junior.jpg'],
    features: [
      { feature: 'Courtyard View' },
      { feature: 'King Bed' },
      { feature: 'Dressing Room' },
    ],
    amenities: [
      { amenity: 'Free Wi-Fi' },
      { amenity: 'Nespresso Machine' },
      { amenity: 'Rainfall Shower' },
      { amenity: 'Premium Toiletries' },
      { amenity: 'Daily Housekeeping' },
      { amenity: 'In-Room Safe' },
      { amenity: 'Flat Screen TV' },
      { amenity: 'Mini Bar' },
      { amenity: 'Dressing Room' },
    ],
    popular: false,
  },
  {
    name: 'Penthouse',
    slug: 'penthouse',
    shortDescription:
      'Our most elevated experience. Rooftop terrace, panoramic city views, private dining.',
    fullDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'The Penthouse is Maison Elara at its most expansive. Occupying the entire top floor, it features a private rooftop terrace with panoramic views across the Paris skyline, a fully equipped kitchen, and a dining area for private entertaining.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    specs: {
      size: '72',
      occupancy: 4,
      bedType: 'King + Twin',
      view: 'Panoramic Paris',
      priceFrom: 580,
    },
    featuredImageFile: 'room-penthouse.jpg',
    featuredImageAlt: 'Penthouse rooftop terrace with panoramic Paris view',
    galleryFiles: ['room-penthouse.jpg'],
    features: [
      { feature: 'Panoramic View' },
      { feature: 'Private Terrace' },
      { feature: 'King + Twin Beds' },
      { feature: 'Private Kitchen' },
    ],
    amenities: [
      { amenity: 'Free Wi-Fi' },
      { amenity: 'Nespresso Machine' },
      { amenity: 'Soaking Tub' },
      { amenity: 'Rainfall Shower' },
      { amenity: 'Premium Toiletries' },
      { amenity: 'Daily Housekeeping' },
      { amenity: 'In-Room Safe' },
      { amenity: 'Flat Screen TV' },
      { amenity: 'Mini Bar' },
      { amenity: 'Private Terrace' },
      { amenity: 'Private Kitchen' },
      { amenity: 'Dining Area' },
      { amenity: 'Butler Service' },
    ],
    popular: true,
  },
]

// ── Main seed function ────────────────────────────────────────────────────────
async function seed() {
  const payload = await getPayload({ config })

  console.log('\n🌱 Seeding rooms with images...\n')

  for (const room of roomData) {
    console.log(`📦 Processing — "${room.name}"`)

    // Check for duplicate
    const existing = await payload.find({
      collection: 'rooms',
      where: { slug: { equals: room.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      console.log(`  ⏭  Already exists, skipping\n`)
      continue
    }

    // Upload featured image
    const featuredImageId = await createMedia(
      payload,
      room.featuredImageFile,
      room.featuredImageAlt,
    )

    // Upload gallery images
    const galleryIds: { image: string }[] = []
    for (const file of room.galleryFiles) {
      const id = await createMedia(payload, file, `${room.name} gallery image`)
      if (id) galleryIds.push({ image: id })
    }

    // Create room record
    await payload.create({
      collection: 'rooms',
      data: {
        name: room.name,
        slug: room.slug,
        shortDescription: room.shortDescription,
        fullDescription: room.fullDescription,
        specs: room.specs,
        features: room.features,
        amenities: room.amenities,
        popular: room.popular,
        featuredImage: featuredImageId ?? undefined,
        gallery: galleryIds,
        _status: 'published',
      },
    })

    console.log(`  ✅ Created — "${room.name}"\n`)
  }

  console.log('✨ Seed complete — all rooms published with images.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
