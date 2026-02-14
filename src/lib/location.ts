export const hotelLocation = {
  name: 'Maison Elara',
  address: {
    street: '42 Rue de la Paix',
    city: 'Paris',
    postalCode: '75001',
    country: 'France',
    full: '42 Rue de la Paix, 75001 Paris, France',
  },
  coordinates: {
    lat: 48.8698,
    lng: 2.3309,
  },
  contact: {
    phone: '+33 1 23 45 67 89',
    phoneHref: 'tel:+33123456789',
    email: 'hello@maisonelara.com',
    emailHref: 'mailto:hello@maisonelara.com',
  },
  maps: {
    google: 'https://maps.google.com/?q=42+Rue+de+la+Paix+Paris+France',
    apple: 'https://maps.apple.com/?q=42+Rue+de+la+Paix+Paris+France',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2!2d2.3309!3d48.8698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUyJzExLjMiTiAywrAxOSc1MS4yIkU!5e0!3m2!1sen!2sfr!4v1',
  },
  intro:
    "Maison Elara sits in the heart of the 1st arrondissement, one of the most storied and walkable parts of Paris. From our door, the Louvre is a five-minute stroll. The Palais Royal gardens are around the corner. And the best croissant in the city is three blocks away — we'll tell you exactly where.",
}

export type TravelMethod = {
  id: string
  mode: 'car' | 'transit' | 'airport' | 'walk'
  title: string
  icon: string
  steps: string[]
  duration?: string
}

export const travelMethods: TravelMethod[] = [
  {
    id: 'car',
    mode: 'car',
    title: 'By Car',
    icon: 'Car',
    duration: 'Varies by traffic',
    steps: [
      'From the A1/A3 motorway, follow signs for Paris Centre.',
      'Take Boulevard de la Madeleine heading east.',
      'Turn right onto Rue de la Paix — the hotel is on the left at number 42.',
      'Valet parking available. Street parking limited in the area.',
    ],
  },
  {
    id: 'transit',
    mode: 'transit',
    title: 'By Metro',
    icon: 'Train',
    duration: '10–15 min from most central stations',
    steps: [
      'Line 3 or 7 — alight at Opéra station (5 min walk).',
      'Line 1 — alight at Tuileries (7 min walk).',
      'RER A — alight at Châtelet-Les Halles (10 min walk).',
      "Vélib' bike stations available within 100m of the hotel.",
    ],
  },
  {
    id: 'airport',
    mode: 'airport',
    title: 'From the Airport',
    icon: 'Plane',
    duration: '45–60 min from CDG · 30–40 min from Orly',
    steps: [
      'From CDG: RER B direct to Châtelet-Les Halles, then 10 min walk. Or private transfer arranged by concierge.',
      'From Orly: OrlyVal + RER B to Châtelet-Les Halles. Or taxi/VTC (approx. €35–50).',
      'Private airport transfers available — contact us at least 24 hours in advance.',
    ],
  },
  {
    id: 'walk',
    mode: 'walk',
    title: 'On Foot',
    icon: 'Footprints',
    duration: 'From central Paris',
    steps: [
      'From the Louvre: 5 min walk north via Rue de Rivoli.',
      'From Place Vendôme: 3 min walk east along Rue de la Paix.',
      'From Opéra Garnier: 4 min walk south.',
      'The entire neighbourhood is best explored on foot — flat, walkable, and beautiful.',
    ],
  },
]

export const neighborhoodHighlights = [
  {
    id: 'nh1',
    name: 'Palais Royal',
    type: 'Garden & Culture',
    description:
      'Arcaded gardens, independent boutiques, and some of the best outdoor seating in Paris. Two minutes from the hotel.',
    link: 'https://en.wikipedia.org/wiki/Palais-Royal',
  },
  {
    id: 'nh2',
    name: 'Galerie Vivienne',
    type: 'Shopping',
    description:
      "One of Paris's most beautiful covered passages — mosaic floors, bookshops, and a legendary wine merchant.",
    link: 'https://en.wikipedia.org/wiki/Galerie_Vivienne',
  },
  {
    id: 'nh3',
    name: 'Musée du Louvre',
    type: 'Museum',
    description:
      "The world's most visited museum, a five-minute walk from the hotel. We recommend a Tuesday evening visit to avoid crowds.",
    link: 'https://www.louvre.fr',
  },
  {
    id: 'nh4',
    name: 'Marché Saint-Honoré',
    type: 'Market',
    description:
      'A neighbourhood food market where our chef shops weekly. Fresh produce, cheese, and seasonal flowers.',
    link: null,
  },
]
