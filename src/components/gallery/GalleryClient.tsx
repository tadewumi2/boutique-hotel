'use client'

import { useState, useMemo } from 'react'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import GalleryFilter from '@/components/gallery/GalleryFilter'
import GalleryLightbox from '@/components/gallery/GalleryLightbox'
import { galleryCategories, filterByCategory } from '@/lib/gallery'
import type { GalleryImage, GalleryCategory } from '@/lib/gallery'

type Props = {
  images: GalleryImage[]
}

export default function GalleryClient({ images }: Props) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(() => filterByCategory(images, activeCategory), [images, activeCategory])

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: images.length }
    images.forEach((img) => {
      c[img.category] = (c[img.category] ?? 0) + 1
    })
    return c
  }, [images])

  return (
    <>
      <main className="pt-24">
        {/* Page header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 mb-3">
            Gallery
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h1 className="font-serif text-5xl lg:text-6xl text-stone-900 leading-tight">
              See the Hotel
              <br />
              <em className="italic text-stone-400">As It Really Is</em>
            </h1>
            <p className="text-stone-500 text-sm max-w-sm leading-relaxed">
              Every image is unfiltered and unretouched. What you see is exactly what awaits you.
            </p>
          </div>

          {/* Filter tabs */}
          <GalleryFilter
            categories={galleryCategories}
            active={activeCategory}
            onChange={(cat) => {
              setActiveCategory(cat)
              setLightboxIndex(null)
            }}
            counts={counts}
          />
        </div>

        {/* Image count */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-6">
          <p className="text-xs text-stone-400">
            Showing {filtered.length} {filtered.length === 1 ? 'image' : 'images'}
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
          <GalleryGrid images={filtered} onOpen={(i) => setLightboxIndex(i)} />
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filtered}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
