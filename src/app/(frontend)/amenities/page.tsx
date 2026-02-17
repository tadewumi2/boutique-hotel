import type { Metadata } from 'next'
import { getAmenities, groupAmenities } from '@/lib/amenities'
import AmenitiesClient from '@/components/amenities/AmenitiesClient'

export const metadata: Metadata = {
  title: 'Amenities — Golden Tee',
  description:
    'Discover everything included in your stay at Golden Tee — from in-room comforts to property facilities and guest services.',
}

export default async function AmenitiesPage() {
  const amenities = await getAmenities()
  const groups = groupAmenities(amenities)

  return <AmenitiesClient groups={groups} />
}
