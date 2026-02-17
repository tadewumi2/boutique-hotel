import type { GalleryCategory } from '@/lib/gallery'

type Props = {
  categories: GalleryCategory[]
  active: GalleryCategory
  onChange: (cat: GalleryCategory) => void
  counts: Record<string, number>
}

export default function GalleryFilter({ categories, active, onChange, counts }: Props) {
  return (
    <div role="tablist" aria-label="Filter gallery by category" className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            active === cat
              ? 'bg-stone-900 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          {cat}
          <span className={`ml-1.5 text-xs ${active === cat ? 'text-white/60' : 'text-stone-500'}`}>
            ({counts[cat] ?? 0})
          </span>
        </button>
      ))}
    </div>
  )
}
