import type { Metadata } from 'next'
import { getAmenities, groupAmenities } from '@/lib/amenities'
import AmenitiesClient from '@/components/amenities/AmenitiesClient'

export const metadata: Metadata = {
  title: 'Amenities — Golden Tee',
  description:
    'Discover everything included in your stay at Golden Tee — from in-room comforts to property facilities and guest services.',
}

// Force dynamic rendering for CMS-driven content
export const dynamic = 'force-dynamic'

export default async function AmenitiesPage() {
  const amenities = await getAmenities()
  const groups = groupAmenities(amenities)

  return <AmenitiesClient groups={groups} />
}
