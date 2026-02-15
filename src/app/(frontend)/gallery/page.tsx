import type { Metadata } from 'next'
import { getGalleryImages } from '@/lib/gallery'
import GalleryClient from '@/components/gallery/GalleryClient'

export const metadata: Metadata = {
  title: 'Gallery — Maison Elara',
  description:
    'Browse rooms, dining, wellness, and the Maison Elara experience through our curated gallery.',
}

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return <GalleryClient images={images} />
}
