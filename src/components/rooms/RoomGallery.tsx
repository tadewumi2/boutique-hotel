'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type ImageItem = { url: string; alt: string }

export default function RoomGallery({ images, name }: { images: ImageItem[]; name: string }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setActive((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setActive((i) => (i === images.length - 1 ? 0 : i + 1))

  if (images.length === 0) return <div className="aspect-[16/9] rounded-2xl bg-stone-100" />

  const current = images[active]

  return (
    <>
      {/* Main gallery — US-B5 */}
      <div className="relative">
        {/* Featured image */}
        <div
          className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={current.url}
            alt={current.alt}
            fill
            priority={active === 0}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-opacity duration-300"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
          <span className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {active + 1} / {images.length}
          </span>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 mt-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative aspect-[4/3] flex-1 rounded-xl overflow-hidden transition-all duration-200 ${
                  i === active ? 'ring-2 ring-amber-500' : 'opacity-60 hover:opacity-90'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="120px"
                  className="object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox — US-B5 */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>
          <div
            className="relative w-full max-w-4xl aspect-[16/9]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.url}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  )
}
