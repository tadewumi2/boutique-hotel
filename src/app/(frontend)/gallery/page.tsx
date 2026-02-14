'use client'

import { useState, useMemo } from 'react'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import GalleryFilter from '@/components/gallery/GalleryFilter'
import GalleryLightbox from '@/components/gallery/GalleryLightbox'
import { galleryImages, galleryCategories, getImagesByCategory } from '@/lib/gallery'
import type { GalleryCategory } from '@/lib/gallery'

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Filtered image list — US-E6
  const filtered = useMemo(() => getImagesByCategory(activeCategory), [activeCategory])

  // Category counts for filter badges
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: galleryImages.length }
    galleryImages.forEach((img) => {
      c[img.category] = (c[img.category] ?? 0) + 1
    })
    return c
  }, [])

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

          {/* Filter tabs — US-E6 */}
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

        {/* Grid — US-E1, E2, E8, E9 */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
          <GalleryGrid images={filtered} onOpen={(i) => setLightboxIndex(i)} />
        </div>
      </main>

      {/* Lightbox — US-E3, E4, E5 */}
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
