export type GalleryCategory = 'All' | 'Rooms' | 'Dining' | 'Wellness' | 'Exterior' | 'Experience'

export type GalleryImage = {
  id: string
  src: string
  alt: string
  caption?: string
  category: Exclude<GalleryCategory, 'All'>
  width: number // aspect ratio hint — actual px not required
  height: number
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: '/images/hero.jpg',
    alt: 'Maison Elara hotel exterior at dusk',
    caption: 'The hotel facade — a restored 19th-century Haussmann building.',
    category: 'Exterior',
    width: 16,
    height: 9,
  },
  {
    id: 'g2',
    src: '/images/room-classic.jpg',
    alt: 'Classic Room with courtyard view',
    caption: 'Classic Room — natural light and hand-selected textiles.',
    category: 'Rooms',
    width: 3,
    height: 4,
  },
  {
    id: 'g3',
    src: '/images/room-deluxe.jpg',
    alt: 'Deluxe Suite sitting area with city view',
    caption: 'Deluxe Suite — a separate sitting area with original Parisian artwork.',
    category: 'Rooms',
    width: 3,
    height: 4,
  },
  {
    id: 'g4',
    src: '/images/room-penthouse.jpg',
    alt: 'Penthouse rooftop terrace with panoramic view',
    caption: 'The Penthouse terrace — Paris at your feet.',
    category: 'Rooms',
    width: 16,
    height: 9,
  },
  {
    id: 'g5',
    src: '/images/exp-wine.jpg',
    alt: 'Private dining setup with wine and candlelight',
    caption: 'Private dining — seasonal menus crafted by our resident chef.',
    category: 'Dining',
    width: 4,
    height: 3,
  },
  {
    id: 'g6',
    src: '/images/story-lobby.jpg',
    alt: 'Hotel lobby in warm afternoon light',
    caption: 'The lobby — where every stay begins.',
    category: 'Exterior',
    width: 4,
    height: 3,
  },
  {
    id: 'g7',
    src: '/images/exp-wellness.jpg',
    alt: 'Rooftop yoga session at sunrise',
    caption: 'Morning wellness — sunrise yoga on the rooftop terrace.',
    category: 'Wellness',
    width: 16,
    height: 9,
  },
  {
    id: 'g8',
    src: '/images/exp-gallery.jpg',
    alt: 'Private gallery walk in Le Marais',
    caption: 'Gallery walks — art as discovery, not obligation.',
    category: 'Experience',
    width: 4,
    height: 3,
  },
  {
    id: 'g9',
    src: '/images/story-paris.jpg',
    alt: 'Parisian street near the hotel at golden hour',
    caption: 'The neighbourhood — steps from Palais Royal.',
    category: 'Exterior',
    width: 4,
    height: 3,
  },
  {
    id: 'g10',
    src: '/images/room-junior.jpg',
    alt: 'Junior Suite with parquet flooring',
    caption: 'Junior Suite — original parquet floors and linen upholstery.',
    category: 'Rooms',
    width: 3,
    height: 4,
  },
  {
    id: 'g11',
    src: '/images/exp-wine-2.jpg',
    alt: 'Courtyard dining in the evening',
    caption: 'Courtyard dining — warm evenings in the garden.',
    category: 'Dining',
    width: 4,
    height: 3,
  },
  {
    id: 'g12',
    src: '/images/exp-wellness-2.jpg',
    alt: 'Wellness spa treatment room',
    caption: 'The spa — restoration by appointment.',
    category: 'Wellness',
    width: 4,
    height: 3,
  },
]

export const galleryCategories: GalleryCategory[] = [
  'All',
  'Rooms',
  'Dining',
  'Wellness',
  'Exterior',
  'Experience',
]

export function getImagesByCategory(category: GalleryCategory): GalleryImage[] {
  if (category === 'All') return galleryImages
  return galleryImages.filter((img) => img.category === category)
}
