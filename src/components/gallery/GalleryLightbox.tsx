'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryImage } from '@/lib/gallery'

type Props = {
  images: GalleryImage[]
  startIndex: number
  onClose: () => void
}

export default function GalleryLightbox({ images, startIndex, onClose }: Props) {
  const [idx, setIdx] = useState(startIndex)
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const prev = useCallback(
    () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length],
  )
  const next = useCallback(
    () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length],
  )

  // Keyboard navigation + ESC — US-E4, E3
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  // Focus trap — US-E9
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // Swipe gesture — US-E4
  const touchStartX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - (e.changedTouches[0]?.clientX ?? 0)
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  // Analytics — US-E10
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('gallery:open', {
          detail: { imageId: images[idx]?.id, index: idx },
        }),
      )
    }
  }, [idx, images])

  const img = images[idx]
  if (!img) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Index indicator — US-E4 */}
        <span className="text-white/50 text-sm font-medium">
          {idx + 1} / {images.length}
        </span>

        {/* Category tag */}
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 bg-white/10 px-3 py-1 rounded-full">
          {img.category}
        </span>

        {/* Close — US-E3 */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close lightbox"
          className="text-white/60 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main image */}
      <div
        className="relative w-full max-w-5xl px-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        style={{ height: 'calc(100vh - 140px)' }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-contain"
          priority
        />
      </div>

      {/* Prev arrow — US-E4 */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next arrow — US-E4 */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <ChevronRight size={22} />
      </button>

      {/* Caption — US-E5 */}
      {img.caption && (
        <div
          className="absolute bottom-0 left-0 right-0 px-6 py-5 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-white/70 text-sm max-w-xl mx-auto leading-relaxed">{img.caption}</p>
        </div>
      )}
    </div>
  )
}
