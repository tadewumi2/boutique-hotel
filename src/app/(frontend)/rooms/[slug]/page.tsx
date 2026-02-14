import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Users, BedDouble, Maximize2, Eye, Check } from 'lucide-react'
import { getRoomBySlug, getAllRoomSlugs, rooms } from '@/lib/rooms'
import RoomGallery from '@/components/rooms/RoomGallery'
import RoomCta from '@/components/rooms/RoomCta'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

// Generate static paths — US-B9
export async function generateStaticParams() {
  return getAllRoomSlugs().map((slug) => ({ slug }))
}

// Dynamic metadata — SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const room = getRoomBySlug(slug)
  if (!room) return {}
  return {
    title: room.name,
    description: room.shortDescription,
    openGraph: { images: [room.images[0]] },
  }
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params
  const room = getRoomBySlug(slug)
  if (!room) notFound()

  // Prev / Next navigation — US-B8
  const idx = rooms.findIndex((r) => r.slug === slug)
  const prev = rooms[idx - 1] ?? null
  const next = rooms[idx + 1] ?? null

  return (
    <main className="pt-24 pb-32 lg:pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Breadcrumb — US-B8 */}
        <nav className="flex items-center gap-2 text-xs text-stone-400 pt-8 pb-6">
          <Link href="/" className="hover:text-stone-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/rooms" className="hover:text-stone-600 transition-colors">
            Rooms &amp; Suites
          </Link>
          <span>/</span>
          <span className="text-stone-600">{room.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left column — main content */}
          <div className="lg:col-span-2">
            {/* Gallery — US-B5 */}
            <RoomGallery images={room.images} name={room.name} />

            {/* Room header */}
            <div className="mt-8 mb-6">
              <h1 className="font-serif text-4xl text-stone-900 mb-3">{room.name}</h1>
              <p className="text-stone-500 leading-relaxed">{room.fullDescription}</p>
            </div>

            {/* Key info — US-B6 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-stone-50 rounded-2xl mb-8">
              {[
                { icon: Users, label: 'Guests', value: `${room.occupancy} guests` },
                { icon: BedDouble, label: 'Bed', value: room.bedType },
                { icon: Maximize2, label: 'Size', value: `${room.size} m²` },
                { icon: Eye, label: 'View', value: room.view },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <Icon size={20} className="text-amber-500 mx-auto mb-2" />
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-stone-800">{value}</p>
                </div>
              ))}
            </div>

            {/* Amenities — US-B4 */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl text-stone-900 mb-5">Room Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {room.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 text-sm text-stone-600">
                    <Check size={14} className="text-amber-500 shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Prev / Next navigation — US-B8 */}
            <div className="flex justify-between items-center pt-8 border-t border-stone-200">
              {prev ? (
                <Link
                  href={`/rooms/${prev.slug}`}
                  className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors group"
                >
                  <ChevronLeft
                    size={16}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                  <span>
                    <span className="block text-xs text-stone-400">Previous</span>
                    {prev.name}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              <Link
                href="/rooms"
                className="text-xs text-stone-400 hover:text-stone-600 transition-colors uppercase tracking-wider"
              >
                All Rooms
              </Link>

              {next ? (
                <Link
                  href={`/rooms/${next.slug}`}
                  className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors group text-right"
                >
                  <span>
                    <span className="block text-xs text-stone-400">Next</span>
                    {next.name}
                  </span>
                  <ChevronRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* Right column — CTA sidebar — US-B7 */}
          <div className="lg:col-span-1">
            <RoomCta roomName={room.name} priceFrom={room.priceFrom} />
          </div>
        </div>
      </div>
    </main>
  )
}
