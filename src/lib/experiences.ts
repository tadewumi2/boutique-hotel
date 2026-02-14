export type Season = 'year-round' | 'summer' | 'winter' | 'spring' | 'autumn'

export type NearbyPlace = {
  name: string
  category: string
  distance: string
  walkTime?: string
}

export type Experience = {
  slug: string
  title: string
  category: string
  tagline: string
  description: string
  fullDescription: string
  image: string
  gallery?: string[]
  season: Season
  hours?: string
  reservationNote?: string
  pricingNote?: string
  features: string[]
  anchor: string // used for section anchors on the main page
}

export const experiences: Experience[] = [
  {
    slug: 'private-dining',
    title: 'Private Dining',
    category: 'Food & Wine',
    tagline: 'An intimate table for two — or twenty.',
    description:
      'Curated menus crafted by our resident chef using seasonal produce from local Parisian markets. From quiet breakfasts to candlelit private dinners.',
    fullDescription:
      "Our private dining experience begins with a consultation with our resident chef, who sources ingredients daily from Marché d'Aligre and Marché des Enfants Rouges. Whether you are celebrating a milestone or simply savouring an evening, every menu is composed with your preferences in mind. The private dining room seats up to twelve and is available for exclusive hire.",
    image: '/images/exp-wine.jpg',
    gallery: ['/images/exp-wine.jpg', '/images/exp-wine-2.jpg'],
    season: 'year-round',
    hours: 'Breakfast 7–10am · Dinner 7–10pm',
    reservationNote: 'Reservation required 24 hours in advance',
    pricingNote: 'From €65 per person',
    features: ['Seasonal Menu', 'Wine Pairing', 'Private Room Available', 'Dietary Options'],
    anchor: 'dining',
  },
  {
    slug: 'gallery-walks',
    title: 'Gallery Walks',
    category: 'Culture',
    tagline: 'Art as context, not decoration.',
    description:
      'Private guided tours through Le Marais galleries and Palais Royal gardens, tailored to your taste and pace. Art not as obligation — as discovery.',
    fullDescription:
      'Led by our in-house cultural curator, these walks venture into the gallery districts surrounding the hotel. We partner with independent gallerists to offer after-hours access to exhibitions not available to the public. Each walk is composed to match your interests — contemporary, classical, or somewhere beautifully in between.',
    image: '/images/exp-gallery.jpg',
    gallery: ['/images/exp-gallery.jpg', '/images/exp-gallery-2.jpg'],
    season: 'year-round',
    hours: 'Mornings 9–11am · Evenings by arrangement',
    reservationNote: 'Book at least 48 hours in advance',
    pricingNote: 'Complimentary for suite guests · €45 per person for others',
    features: ['Private Guide', 'After-Hours Access', 'Customised Route', 'Max 6 Guests'],
    anchor: 'culture',
  },
  {
    slug: 'morning-wellness',
    title: 'Morning Wellness',
    category: 'Wellness',
    tagline: 'Begin the day with intention.',
    description:
      'Sunrise yoga on the rooftop terrace followed by a light seasonal breakfast. A gentle ritual designed to settle you into Paris at your own pace.',
    fullDescription:
      'Our morning wellness programme takes place on the rooftop terrace overlooking the Parisian skyline. Sessions are led by a resident yoga instructor and run for 60 minutes, followed by a curated wellness breakfast of seasonal fruit, cold-pressed juices, and house-baked pastries. Available daily from spring through autumn.',
    image: '/images/exp-wellness.jpg',
    gallery: ['/images/exp-wellness.jpg', '/images/exp-wellness-2.jpg'],
    season: 'spring',
    hours: 'Daily 7–8am',
    reservationNote: 'Sign up at reception the evening prior',
    pricingNote: 'Included for all guests',
    features: ['Rooftop Setting', 'Seasonal Breakfast', 'Max 8 Guests', 'All Levels Welcome'],
    anchor: 'wellness',
  },
  {
    slug: 'concierge-itineraries',
    title: 'Concierge Itineraries',
    category: 'Exploration',
    tagline: 'Paris, curated just for you.',
    description:
      'Our concierge team crafts personal day plans — restaurant reservations, hidden bookshops, market routes, and more — tailored entirely to your interests.',
    fullDescription:
      'The Maison Elara concierge service goes well beyond restaurant bookings. Before your arrival, our team reaches out to understand what kind of Paris you are hoping to find. We then craft a day-by-day itinerary of recommendations, reservations, and discoveries — from the well-known to the genuinely secret. Adjustments are made each morning over breakfast.',
    image: '/images/story-paris.jpg',
    gallery: ['/images/story-paris.jpg'],
    season: 'year-round',
    hours: 'Concierge available daily 8am–9pm',
    reservationNote: 'Contact us before arrival for best results',
    pricingNote: 'Complimentary service',
    features: [
      'Personalised Planning',
      'Restaurant Reservations',
      'Hidden Gems',
      'Pre-Arrival Service',
    ],
    anchor: 'exploration',
  },
]

export const nearbyPlaces: NearbyPlace[] = [
  { name: 'Palais Royal Gardens', category: 'Park', distance: '200m', walkTime: '3 min' },
  { name: 'Louvre Museum', category: 'Museum', distance: '400m', walkTime: '5 min' },
  { name: 'Galerie Vivienne', category: 'Shopping', distance: '350m', walkTime: '4 min' },
  { name: 'Café de Flore', category: 'Café', distance: '2.1km', walkTime: '25 min' },
  { name: 'Marché des Enfants Rouges', category: 'Market', distance: '1.8km', walkTime: '22 min' },
  { name: 'Centre Pompidou', category: 'Museum', distance: '1.2km', walkTime: '15 min' },
]

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug)
}

export function getAllExperienceSlugs(): string[] {
  return experiences.map((e) => e.slug)
}
