import Image from 'next/image'
import type { GalleryImage } from '@/lib/gallery'

type Props = {
  images: GalleryImage[]
  onOpen: (index: number) => void
}

export default function GalleryGrid({ images, onOpen }: Props) {
  if (images.length === 0) {
    return (
      <div className="text-center py-24 text-stone-400">
        <p className="font-serif text-2xl mb-2">No images in this category</p>
        <p className="text-sm">Try selecting a different filter</p>
      </div>
    )
  }

  return (
    // CSS columns — natural masonry without JS library — US-E2, E8
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {images.map((img, i) => {
        // Derive aspect ratio class from width/height hint
        const ratio = img.width / img.height
        const aspectClass =
          ratio >= 1.6
            ? 'aspect-video'
            : ratio >= 1.2
              ? 'aspect-[4/3]'
              : ratio < 0.85
                ? 'aspect-[3/4]'
                : 'aspect-square'

        return (
          <button
            key={img.id}
            onClick={() => onOpen(i)}
            className="group relative w-full overflow-hidden rounded-xl block break-inside-avoid focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={img.alt} // US-E9 accessible label
          >
            <div className={`relative ${aspectClass} w-full overflow-hidden`}>
              <Image
                src={img.src}
                alt={img.alt} // US-E9 alt text
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy" // US-E8 lazy loading
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
                {img.caption && (
                  <p className="text-white text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {img.caption}
                  </p>
                )}
              </div>
              {/* Category tag */}
              <span className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider text-white bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {img.category}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
