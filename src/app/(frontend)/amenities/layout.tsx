import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Amenities',
  description:
    'Discover everything included in your stay at Golden Tee — from in-room comforts to property-wide services and guest experiences.',
}

export default function AmenitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
