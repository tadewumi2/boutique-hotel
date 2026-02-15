import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.resolve(__dirname, '../public/images')

// ── Helper: upsert a media record from a local file ──────────────────────────
async function upsertMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
  alt: string,
): Promise<string | null> {
  const filePath = path.join(IMAGES_DIR, filename)

  if (!fs.existsSync(filePath)) {
    console.log(`    ⚠️  File not found, skipping: ${filename}`)
    return null
  }

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
    data: { alt, caption: '' },
    file: { data: fileBuffer, mimetype, name: filename, size: fileBuffer.length },
  })

  console.log(`    📸 Uploaded — ${filename}`)
  return media.id as string
}

// ── Room data ─────────────────────────────────────────────────────────────────
const roomData = [
  {
    name: 'Classic Room',
    slug: 'classic-room',
    order: 1,
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
    galleryFiles: [
      { file: 'room-classic.jpg', alt: 'Classic Room with courtyard view' },
      { file: 'room-classic-2.jpg', alt: 'Classic Room bathroom with rainfall shower' },
      { file: 'room-classic-3.jpg', alt: 'Classic Room detail — hand-selected textiles' },
    ],
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
    order: 2,
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
    galleryFiles: [
      { file: 'room-deluxe.jpg', alt: 'Deluxe Suite with city view' },
      { file: 'room-deluxe-2.jpg', alt: 'Deluxe Suite sitting area with original artwork' },
      { file: 'room-deluxe-3.jpg', alt: 'Deluxe Suite soaking tub with rooftop view' },
    ],
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
    order: 3,
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
    galleryFiles: [
      { file: 'room-junior.jpg', alt: 'Junior Suite with parquet flooring' },
      { file: 'room-junior-2.jpg', alt: 'Junior Suite dressing room and wardrobe' },
    ],
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
    order: 4,
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
    galleryFiles: [
      { file: 'room-penthouse.jpg', alt: 'Penthouse rooftop terrace with panoramic view' },
      { file: 'room-penthouse-2.jpg', alt: 'Penthouse bedroom with custom brass fixtures' },
      { file: 'room-penthouse-3.jpg', alt: 'Penthouse private kitchen and dining area' },
    ],
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

// ── Amenity data ──────────────────────────────────────────────────────────────
const amenityData = [
  // In-Room
  {
    name: 'High-Speed Wi-Fi',
    category: 'in-room',
    pricingStatus: 'included',
    description: 'Fibre broadband throughout the hotel and in every room.',
    icon: 'Wifi',
    availability: '24 hours',
    order: 1,
  },
  {
    name: 'Nespresso Machine',
    category: 'in-room',
    pricingStatus: 'included',
    description: 'Curated selection of single-origin capsules refreshed daily.',
    icon: 'Coffee',
    order: 2,
  },
  {
    name: 'Mini Bar',
    category: 'in-room',
    pricingStatus: 'paid',
    description: 'Stocked with local wines, artisan soft drinks, and seasonal snacks.',
    icon: 'GlassWater',
    note: 'Restocked daily',
    order: 3,
  },
  {
    name: 'In-Room Safe',
    category: 'in-room',
    pricingStatus: 'included',
    description: 'Electronic safe fitted in wardrobe, laptop-compatible.',
    icon: 'Lock',
    order: 4,
  },
  {
    name: 'Smart TV',
    category: 'in-room',
    pricingStatus: 'included',
    description: '55" 4K TV with streaming apps and Chromecast support.',
    icon: 'Tv',
    order: 5,
  },
  {
    name: 'Premium Toiletries',
    category: 'in-room',
    pricingStatus: 'included',
    description: 'Curated natural products by Aesop, replenished daily.',
    icon: 'Sparkles',
    order: 6,
  },
  // Property
  {
    name: 'Rooftop Terrace',
    category: 'property',
    pricingStatus: 'included',
    description: 'Panoramic views across central Paris. Open daily to all guests.',
    icon: 'Sun',
    availability: 'Daily 7am–10pm',
    season: 'seasonal',
    note: 'Open spring through autumn',
    hasDetail: true,
    detailImageFile: 'exp-wellness.jpg',
    detailDescription:
      'Our rooftop terrace sits atop the hotel and offers uninterrupted views of the Parisian skyline. In the mornings it hosts the wellness programme; in the evenings it transforms into a quiet space for aperitifs and conversation.',
    order: 7,
  },
  {
    name: 'Garden Courtyard',
    category: 'property',
    pricingStatus: 'included',
    description: 'A quiet inner courtyard with seasonal plantings and seating.',
    icon: 'Leaf',
    availability: 'Daily 8am–9pm',
    order: 8,
  },
  {
    name: 'Guest Library',
    category: 'property',
    pricingStatus: 'included',
    description: 'A curated collection of art books, literature, and local guides.',
    icon: 'BookOpen',
    availability: 'Open 24 hours',
    order: 9,
  },
  {
    name: 'Fitness Studio',
    category: 'property',
    pricingStatus: 'included',
    description: 'Compact but fully equipped. Free weights, Peloton bike, yoga mats.',
    icon: 'Dumbbell',
    availability: 'Daily 6am–10pm',
    order: 10,
  },
  {
    name: 'Wellness Spa',
    category: 'property',
    pricingStatus: 'paid',
    description: 'Treatment rooms offering massage, facial, and body therapies.',
    icon: 'Sparkles',
    availability: 'Daily 10am–7pm',
    note: 'By appointment only',
    hasDetail: true,
    detailImageFile: 'story-lobby.jpg',
    detailDescription:
      'The Maison Elara spa offers a selection of treatments designed around rest and restoration. Our therapists are trained in Swedish massage, deep tissue, and a signature Parisian facial using locally sourced ingredients.',
    order: 11,
  },
  // Guest Services
  {
    name: 'Daily Breakfast',
    category: 'services',
    pricingStatus: 'included',
    description: 'Freshly prepared continental and hot breakfast served in the courtyard.',
    icon: 'UtensilsCrossed',
    availability: 'Daily 7am–10:30am',
    order: 12,
  },
  {
    name: 'Concierge Service',
    category: 'services',
    pricingStatus: 'included',
    description: 'Personal itinerary planning, reservations, and local expertise.',
    icon: 'MapPin',
    availability: 'Daily 8am–9pm',
    order: 13,
  },
  {
    name: 'In-Room Dining',
    category: 'services',
    pricingStatus: 'paid',
    description: 'Curated menu available throughout the day and evening.',
    icon: 'ChefHat',
    availability: 'Daily 7am–11pm',
    order: 14,
  },
  {
    name: 'Laundry & Pressing',
    category: 'services',
    pricingStatus: 'paid',
    description: 'Same-day service available if requested before 9am.',
    icon: 'Shirt',
    note: 'Same-day if before 9am',
    order: 15,
  },
  {
    name: 'Airport Transfer',
    category: 'services',
    pricingStatus: 'on-request',
    description: 'Private vehicle to/from CDG or Orly airports.',
    icon: 'Car',
    note: 'Book 24 hours in advance',
    order: 16,
  },
  {
    name: 'Daily Housekeeping',
    category: 'services',
    pricingStatus: 'included',
    description: 'Full room service each morning; turndown service in the evening.',
    icon: 'BedDouble',
    availability: 'Morning + evening',
    order: 17,
  },
  // Accessibility & Connectivity
  {
    name: 'Accessible Rooms',
    category: 'connectivity',
    pricingStatus: 'on-request',
    description: 'Two fully accessible rooms available on the ground floor.',
    icon: 'Accessibility',
    note: 'Request at booking',
    order: 18,
  },
  {
    name: 'Luggage Storage',
    category: 'connectivity',
    pricingStatus: 'included',
    description: 'Secure storage before check-in or after check-out.',
    icon: 'Package',
    availability: '24 hours',
    order: 19,
  },
  {
    name: 'EV Charging',
    category: 'connectivity',
    pricingStatus: 'paid',
    description: 'Two charging points available in the hotel car park.',
    icon: 'Zap',
    note: 'Per kWh rate applies',
    order: 20,
  },
  {
    name: 'Pet-Friendly Rooms',
    category: 'connectivity',
    pricingStatus: 'on-request',
    description: 'Selected rooms welcome small pets (under 10kg).',
    icon: 'PawPrint',
    note: 'Surcharge applies',
    order: 21,
  },
]

// ── Seed rooms ────────────────────────────────────────────────────────────────
async function seedRooms(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n🛏  Seeding rooms (upsert mode)...\n')

  for (const room of roomData) {
    console.log(`📦 Processing — "${room.name}"`)

    const featuredImageId = await upsertMedia(
      payload,
      room.featuredImageFile,
      room.featuredImageAlt,
    )

    const galleryIds: { image: string }[] = []
    for (const { file, alt } of room.galleryFiles) {
      const id = await upsertMedia(payload, file, alt)
      if (id) galleryIds.push({ image: id })
    }

    const data = {
      name: room.name,
      slug: room.slug,
      order: room.order,
      shortDescription: room.shortDescription,
      fullDescription: room.fullDescription,
      specs: room.specs,
      features: room.features,
      amenities: room.amenities,
      popular: room.popular,
      featuredImage: featuredImageId ?? undefined,
      gallery: galleryIds,
      _status: 'published' as const,
    }

    const existing = await payload.find({
      collection: 'rooms',
      where: { slug: { equals: room.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({ collection: 'rooms', id: existing.docs[0].id as string, data })
      console.log(`  ✏️  Updated — "${room.name}"\n`)
    } else {
      await payload.create({ collection: 'rooms', data })
      console.log(`  ✅ Created — "${room.name}"\n`)
    }
  }
}

// ── Seed amenities ────────────────────────────────────────────────────────────
async function seedAmenities(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n✨ Seeding amenities (upsert mode)...\n')

  for (const amenity of amenityData) {
    console.log(`📦 Processing — "${amenity.name}"`)

    // Upload detail image if present
    let detailImageId: string | undefined
    if (amenity.hasDetail && amenity.detailImageFile) {
      const id = await upsertMedia(payload, amenity.detailImageFile, amenity.name)
      detailImageId = id ?? undefined
    }

    const data = {
      name: amenity.name,
      category: amenity.category,
      pricingStatus: amenity.pricingStatus,
      description: amenity.description,
      icon: amenity.icon,
      availability: amenity.availability ?? undefined,
      season: amenity.season ?? undefined,
      note: amenity.note ?? undefined,
      hasDetail: amenity.hasDetail ?? false,
      detailImage: detailImageId,
      detailDescription: amenity.detailDescription ?? undefined,
      order: amenity.order,
      _status: 'published' as const,
    }

    const existing = await payload.find({
      collection: 'amenities',
      where: { name: { equals: amenity.name } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({ collection: 'amenities', id: existing.docs[0].id as string, data })
      console.log(`  ✏️  Updated — "${amenity.name}"\n`)
    } else {
      await payload.create({ collection: 'amenities', data })
      console.log(`  ✅ Created — "${amenity.name}"\n`)
    }
  }
}

// ── Gallery data ──────────────────────────────────────────────────────────────
const galleryData = [
  {
    file: 'hero.jpg',
    alt: 'Maison Elara hotel exterior at dusk',
    caption: 'The hotel facade — a restored 19th-century Haussmann building.',
    category: 'Exterior',
    order: 1,
  },
  {
    file: 'room-classic.jpg',
    alt: 'Classic Room with courtyard view',
    caption: 'Classic Room — natural light and hand-selected textiles.',
    category: 'Rooms',
    order: 2,
  },
  {
    file: 'room-deluxe.jpg',
    alt: 'Deluxe Suite sitting area with city view',
    caption: 'Deluxe Suite — a separate sitting area with original Parisian artwork.',
    category: 'Rooms',
    order: 3,
  },
  {
    file: 'room-penthouse.jpg',
    alt: 'Penthouse rooftop terrace with panoramic view',
    caption: 'The Penthouse terrace — Paris at your feet.',
    category: 'Rooms',
    order: 4,
  },
  {
    file: 'exp-wine.jpg',
    alt: 'Private dining setup with wine and candlelight',
    caption: 'Private dining — seasonal menus crafted by our resident chef.',
    category: 'Dining',
    order: 5,
  },
  {
    file: 'story-lobby.jpg',
    alt: 'Hotel lobby in warm afternoon light',
    caption: 'The lobby — where every stay begins.',
    category: 'Exterior',
    order: 6,
  },
  {
    file: 'exp-wellness.jpg',
    alt: 'Rooftop yoga session at sunrise',
    caption: 'Morning wellness — sunrise yoga on the rooftop terrace.',
    category: 'Wellness',
    order: 7,
  },
  {
    file: 'exp-gallery.jpg',
    alt: 'Private gallery walk in Le Marais',
    caption: 'Gallery walks — art as discovery, not obligation.',
    category: 'Experience',
    order: 8,
  },
  {
    file: 'story-paris.jpg',
    alt: 'Parisian street near the hotel at golden hour',
    caption: 'The neighbourhood — steps from Palais Royal.',
    category: 'Exterior',
    order: 9,
  },
  {
    file: 'room-junior.jpg',
    alt: 'Junior Suite with parquet flooring',
    caption: 'Junior Suite — original parquet floors and linen upholstery.',
    category: 'Rooms',
    order: 10,
  },
  {
    file: 'exp-wine-2.jpg',
    alt: 'Courtyard dining in the evening',
    caption: 'Courtyard dining — warm evenings in the garden.',
    category: 'Dining',
    order: 11,
  },
  {
    file: 'exp-wellness-2.jpg',
    alt: 'Wellness spa treatment room',
    caption: 'The spa — restoration by appointment.',
    category: 'Wellness',
    order: 12,
  },
]

// ── Seed gallery ──────────────────────────────────────────────────────────────
async function seedGallery(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n🖼  Seeding gallery (upsert mode)...\n')

  for (const item of galleryData) {
    console.log(`📦 Processing — "${item.file}"`)

    // Upsert the media file
    const mediaId = await upsertMedia(payload, item.file, item.alt)
    if (!mediaId) {
      console.log(`  ⚠️  Skipping gallery item — media upload failed\n`)
      continue
    }

    const data = {
      title: item.alt, // internal CMS label
      image: mediaId,
      caption: item.caption,
      category: item.category,
      isVisible: true,
      order: item.order,
      _status: 'published' as const,
    }

    // Upsert by matching on the media id to avoid duplicates
    const existing = await payload.find({
      collection: 'gallery',
      where: { image: { equals: mediaId } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({ collection: 'gallery', id: existing.docs[0].id as string, data })
      console.log(`  ✏️  Updated — "${item.file}"\n`)
    } else {
      await payload.create({ collection: 'gallery', data })
      console.log(`  ✅ Created — "${item.file}"\n`)
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function seed() {
  const payload = await getPayload({ config })

  await seedRooms(payload)
  await seedAmenities(payload)
  await seedGallery(payload)

  console.log('\n🌱 All done — rooms, amenities, and gallery seeded.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
