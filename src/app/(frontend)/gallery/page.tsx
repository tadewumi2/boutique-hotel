import type { Metadata } from 'next'
import { getGalleryImages } from '@/lib/gallery'
import GalleryClient from '@/components/gallery/GalleryClient'

export const metadata: Metadata = {
  title: 'Gallery — Golden Tee',
  description:
    'Browse rooms, dining, wellness, and the Golden Tee experience through our curated gallery.',
}

// Force dynamic rendering for CMS-driven content
export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return <GalleryClient images={images} />
}
