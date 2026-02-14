export type AmenityStatus = 'included' | 'paid' | 'on-request'
export type AmenitySeason = 'year-round' | 'summer' | 'winter' | 'seasonal'

export type Amenity = {
  id: string
  name: string
  description?: string
  status: AmenityStatus
  availability?: string // e.g. "Daily 6am–10pm"
  season?: AmenitySeason
  note?: string // short extra note
  hasDetail?: boolean // links to modal detail
  detailImage?: string
  detailDescription?: string
  icon: string // lucide icon name
}

export type AmenityGroup = {
  id: string
  title: string
  subtitle?: string
  amenities: Amenity[]
}

export const amenityGroups: AmenityGroup[] = [
  {
    id: 'in-room',
    title: 'In-Room',
    subtitle: 'Every room is equipped with thoughtfully selected comforts.',
    amenities: [
      {
        id: 'wifi',
        name: 'High-Speed Wi-Fi',
        description: 'Fibre broadband throughout the hotel and in every room.',
        status: 'included',
        availability: '24 hours',
        icon: 'Wifi',
      },
      {
        id: 'nespresso',
        name: 'Nespresso Machine',
        description: 'Curated selection of single-origin capsules refreshed daily.',
        status: 'included',
        icon: 'Coffee',
      },
      {
        id: 'minibar',
        name: 'Mini Bar',
        description: 'Stocked with local wines, artisan soft drinks, and seasonal snacks.',
        status: 'paid',
        note: 'Restocked daily',
        icon: 'GlassWater',
      },
      {
        id: 'safe',
        name: 'In-Room Safe',
        description: 'Electronic safe fitted in wardrobe, laptop-compatible.',
        status: 'included',
        icon: 'Lock',
      },
      {
        id: 'tv',
        name: 'Smart TV',
        description: '55" 4K TV with streaming apps and Chromecast support.',
        status: 'included',
        icon: 'Tv',
      },
      {
        id: 'toiletries',
        name: 'Premium Toiletries',
        description: 'Curated natural products by Aesop, replenished daily.',
        status: 'included',
        icon: 'Sparkles',
      },
    ],
  },
  {
    id: 'property',
    title: 'Property',
    subtitle: 'Spaces designed for rest, connection, and curiosity.',
    amenities: [
      {
        id: 'rooftop',
        name: 'Rooftop Terrace',
        description: 'Panoramic views across central Paris. Open daily to all guests.',
        status: 'included',
        availability: 'Daily 7am–10pm',
        season: 'seasonal',
        note: 'Open spring through autumn',
        hasDetail: true,
        detailImage: '/images/exp-wellness.jpg',
        detailDescription:
          'Our rooftop terrace sits atop the hotel and offers uninterrupted views of the Parisian skyline. In the mornings it hosts the wellness programme; in the evenings it transforms into a quiet space for aperitifs and conversation. Access is open to all guests during season.',
        icon: 'Sun',
      },
      {
        id: 'courtyard',
        name: 'Garden Courtyard',
        description: 'A quiet inner courtyard with seasonal plantings and seating.',
        status: 'included',
        availability: 'Daily 8am–9pm',
        icon: 'Leaf',
      },
      {
        id: 'library',
        name: 'Guest Library',
        description: 'A curated collection of art books, literature, and local guides.',
        status: 'included',
        availability: 'Open 24 hours',
        icon: 'BookOpen',
      },
      {
        id: 'fitness',
        name: 'Fitness Studio',
        description: 'Compact but fully equipped. Free weights, Peloton bike, yoga mats.',
        status: 'included',
        availability: 'Daily 6am–10pm',
        icon: 'Dumbbell',
      },
      {
        id: 'spa',
        name: 'Wellness Spa',
        description: 'Treatment rooms offering massage, facial, and body therapies.',
        status: 'paid',
        availability: 'Daily 10am–7pm',
        note: 'By appointment only',
        hasDetail: true,
        detailImage: '/images/story-lobby.jpg',
        detailDescription:
          'The Maison Elara spa offers a selection of treatments designed around rest and restoration. Our therapists are trained in Swedish massage, deep tissue, and a signature Parisian facial using locally sourced ingredients. A full treatment menu is available at reception or via the concierge.',
        icon: 'Sparkles',
      },
    ],
  },
  {
    id: 'services',
    title: 'Guest Services',
    subtitle: 'A team dedicated to making your stay effortless.',
    amenities: [
      {
        id: 'breakfast',
        name: 'Daily Breakfast',
        description: 'Freshly prepared continental and hot breakfast served in the courtyard.',
        status: 'included',
        availability: 'Daily 7am–10:30am',
        icon: 'UtensilsCrossed',
      },
      {
        id: 'concierge',
        name: 'Concierge Service',
        description: 'Personal itinerary planning, reservations, and local expertise.',
        status: 'included',
        availability: 'Daily 8am–9pm',
        icon: 'MapPin',
      },
      {
        id: 'room-service',
        name: 'In-Room Dining',
        description: 'Curated menu available throughout the day and evening.',
        status: 'paid',
        availability: 'Daily 7am–11pm',
        icon: 'ChefHat',
      },
      {
        id: 'laundry',
        name: 'Laundry & Pressing',
        description: 'Same-day service available if requested before 9am.',
        status: 'paid',
        note: 'Same-day if before 9am',
        icon: 'Shirt',
      },
      {
        id: 'transfer',
        name: 'Airport Transfer',
        description: 'Private vehicle to/from CDG or Orly airports.',
        status: 'on-request',
        note: 'Book 24 hours in advance',
        icon: 'Car',
      },
      {
        id: 'housekeeping',
        name: 'Daily Housekeeping',
        description: 'Full room service each morning; turndown service in the evening.',
        status: 'included',
        availability: 'Morning + evening',
        icon: 'BedDouble',
      },
    ],
  },
  {
    id: 'connectivity',
    title: 'Accessibility & Connectivity',
    subtitle: 'Practical details that matter.',
    amenities: [
      {
        id: 'accessible',
        name: 'Accessible Rooms',
        description: 'Two fully accessible rooms available on the ground floor.',
        status: 'on-request',
        note: 'Request at booking',
        icon: 'Accessibility',
      },
      {
        id: 'luggage',
        name: 'Luggage Storage',
        description: 'Secure storage before check-in or after check-out.',
        status: 'included',
        availability: '24 hours',
        icon: 'Package',
      },
      {
        id: 'ev',
        name: 'EV Charging',
        description: 'Two charging points available in the hotel car park.',
        status: 'paid',
        note: 'Per kWh rate applies',
        icon: 'Zap',
      },
      {
        id: 'pets',
        name: 'Pet-Friendly Rooms',
        description: 'Selected rooms welcome small pets (under 10kg).',
        status: 'on-request',
        note: 'Surcharge applies',
        icon: 'PawPrint',
      },
    ],
  },
]

export const statusConfig: Record<AmenityStatus, { label: string; color: string }> = {
  included: { label: 'Included', color: 'bg-green-100 text-green-700' },
  paid: { label: 'Paid', color: 'bg-amber-100 text-amber-700' },
  'on-request': { label: 'On Request', color: 'bg-blue-100 text-blue-700' },
}

export const seasonConfig: Record<AmenitySeason, { label: string; color: string }> = {
  'year-round': { label: 'Year-Round', color: 'bg-stone-100 text-stone-500' },
  summer: { label: 'Summer', color: 'bg-yellow-100 text-yellow-700' },
  winter: { label: 'Winter', color: 'bg-blue-100 text-blue-600' },
  seasonal: { label: 'Seasonal', color: 'bg-orange-100 text-orange-700' },
}
