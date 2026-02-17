import { getPayload } from 'payload'
import config from '@payload-config'
import RoomCard from '@/components/rooms/RoomCard'

// Always fetch fresh — no stale cache on CMS-driven pages
export const dynamic = 'force-dynamic'

export default async function RoomsPage() {
  const payload = await getPayload({ config })

  const { docs: rooms } = await payload.find({
    collection: 'rooms',
    where: { _status: { equals: 'published' } }, // US-2A5 — drafts not shown
    sort: 'order', // US-2B4 — respect editor-defined order
    depth: 1, // resolve media relations one level deep
  })

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 mb-3">
          Accommodations
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1 className="font-serif text-5xl text-stone-900 leading-tight">Rooms &amp; Suites</h1>
          <p className="text-stone-600 text-sm max-w-sm leading-relaxed">
            Each room is individually designed. No two are exactly alike — and that's entirely the
            point.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        {rooms.length === 0 ? (
          <div className="text-center py-24 text-stone-500">
            <p className="font-serif text-2xl mb-2">No rooms published yet</p>
            <p className="text-sm">Add rooms in the CMS to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room: any) => {
              // Normalise Payload shape → RoomCard shape
              const normalised = {
                slug: room.slug,
                name: room.name,
                shortDescription: room.shortDescription,
                fullDescription: '', // not needed on listing
                size: room.specs?.size ?? '',
                occupancy: room.specs?.occupancy ?? 2,
                bedType: room.specs?.bedType ?? '',
                view: room.specs?.view ?? '',
                priceFrom: room.specs?.priceFrom ?? 0,
                features: (room.features ?? []).map((f: any) => f.feature),
                amenities: [],
                images: [
                  typeof room.featuredImage === 'object' && room.featuredImage?.url
                    ? room.featuredImage.url
                    : `/api/media/file/${room.featuredImage}`,
                ],
                popular: room.popular ?? false,
              }
              return <RoomCard key={room.id} room={normalised} />
            })}
          </div>
        )}
      </div>
    </main>
  )
}
