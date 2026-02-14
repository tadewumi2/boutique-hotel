export type Room = {
  slug: string
  name: string
  shortDescription: string
  fullDescription: string
  size: string
  occupancy: number
  bedType: string
  view: string
  priceFrom: number
  features: string[]
  amenities: string[]
  images: string[]
  popular?: boolean
}

export const rooms: Room[] = [
  {
    slug: 'classic-room',
    name: 'Classic Room',
    shortDescription:
      'Intimate and carefully composed. Natural light, warm linens, and a view of the courtyard.',
    fullDescription:
      'The Classic Room is a study in quiet elegance. Designed to feel like a well-loved Parisian apartment, it features bespoke furniture, hand-selected textiles, and warm ambient lighting. Floor-to-ceiling curtains frame a courtyard view that changes beautifully with the seasons. Perfect for the solo traveller or couple seeking an intimate city retreat.',
    size: '22',
    occupancy: 2,
    bedType: 'Queen',
    view: 'Courtyard',
    priceFrom: 180,
    features: ['Courtyard View', 'Queen Bed', 'Rainfall Shower'],
    amenities: [
      'Free Wi-Fi',
      'Nespresso Machine',
      'Rainfall Shower',
      'Premium Toiletries',
      'Daily Housekeeping',
      'In-Room Safe',
      'Flat Screen TV',
      'Mini Bar',
    ],
    images: [
      '/images/room-classic.jpg',
      '/images/room-classic-2.jpg',
      '/images/room-classic-3.jpg',
    ],
  },
  {
    slug: 'deluxe-suite',
    name: 'Deluxe Suite',
    shortDescription:
      'Generous space with a separate sitting area and curated art from local Parisian artists.',
    fullDescription:
      'The Deluxe Suite offers a gracious sense of space rarely found in the heart of Paris. A separate sitting room furnished with original artwork and a handcrafted writing desk creates a sanctuary for both rest and inspiration. The oversized bathroom features a deep soaking tub with a view of the rooftops.',
    size: '38',
    occupancy: 2,
    bedType: 'King',
    view: 'City',
    priceFrom: 280,
    features: ['City View', 'King Bed', 'Soaking Tub', 'Sitting Area'],
    amenities: [
      'Free Wi-Fi',
      'Nespresso Machine',
      'Soaking Tub',
      'Rainfall Shower',
      'Premium Toiletries',
      'Daily Housekeeping',
      'In-Room Safe',
      'Flat Screen TV',
      'Mini Bar',
      'Separate Sitting Area',
      'Writing Desk',
    ],
    images: ['/images/room-deluxe.jpg', '/images/room-deluxe-2.jpg', '/images/room-deluxe-3.jpg'],
    popular: true,
  },
  {
    slug: 'junior-suite',
    name: 'Junior Suite',
    shortDescription: 'A refined blend of comfort and character, ideal for longer stays.',
    fullDescription:
      'The Junior Suite bridges intimacy and space. A thoughtfully zoned layout separates sleeping and living areas without sacrificing warmth. Original parquet floors, linen upholstery, and a private dressing room make it an ideal choice for guests who appreciate the details of a longer stay.',
    size: '30',
    occupancy: 2,
    bedType: 'King',
    view: 'Courtyard',
    priceFrom: 230,
    features: ['Courtyard View', 'King Bed', 'Dressing Room'],
    amenities: [
      'Free Wi-Fi',
      'Nespresso Machine',
      'Rainfall Shower',
      'Premium Toiletries',
      'Daily Housekeeping',
      'In-Room Safe',
      'Flat Screen TV',
      'Mini Bar',
      'Dressing Room',
    ],
    images: ['/images/room-junior.jpg', '/images/room-junior-2.jpg'],
  },
  {
    slug: 'penthouse',
    name: 'Penthouse',
    shortDescription:
      'Our most elevated experience. Rooftop terrace, panoramic city views, private dining.',
    fullDescription:
      'The Penthouse is Maison Elara at its most expansive. Occupying the entire top floor, it features a private rooftop terrace with panoramic views across the Paris skyline, a fully equipped kitchen, and a dining area for private entertaining. Every detail — from the hand-poured concrete floors to the custom brass fixtures — has been designed to feel extraordinary.',
    size: '72',
    occupancy: 4,
    bedType: 'King + Twin',
    view: 'Panoramic Paris',
    priceFrom: 580,
    features: ['Panoramic View', 'Private Terrace', 'King + Twin Beds', 'Private Kitchen'],
    amenities: [
      'Free Wi-Fi',
      'Nespresso Machine',
      'Soaking Tub',
      'Rainfall Shower',
      'Premium Toiletries',
      'Daily Housekeeping',
      'In-Room Safe',
      'Flat Screen TV',
      'Mini Bar',
      'Private Terrace',
      'Private Kitchen',
      'Dining Area',
      'Butler Service',
    ],
    images: [
      '/images/room-penthouse.jpg',
      '/images/room-penthouse-2.jpg',
      '/images/room-penthouse-3.jpg',
    ],
    popular: true,
  },
]

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug)
}

export function getAllRoomSlugs(): string[] {
  return rooms.map((r) => r.slug)
}
