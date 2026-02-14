import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import type { neighborhoodHighlights } from '@/lib/location'

type Highlight = (typeof neighborhoodHighlights)[number]

export default function NeighborhoodSection({ highlights }: { highlights: Highlight[] }) {
  return (
    <section id="neighbourhood" className="scroll-mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src="/images/story-paris.jpg"
            alt="The neighbourhood around Maison Elara at golden hour"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Editorial text — US-F5 */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 mb-3">
            The Neighbourhood
          </p>
          <h2 className="font-serif text-3xl text-stone-900 mb-5">
            The 1st Arrondissement —<br />
            <em className="italic text-stone-400">Paris at Its Most Itself</em>
          </h2>
          <p className="text-stone-500 leading-relaxed mb-4">
            To stay in the 1st is to be at the very centre of Paris's long story. This is where the
            city began — on the Île de la Cité, a short walk east — and where it has never stopped
            reinventing itself.
          </p>
          <p className="text-stone-500 leading-relaxed">
            Mornings here smell of fresh bread and espresso. Afternoons are for wandering colonnaded
            galleries and quiet gardens. Evenings bring candlelit bistros and long conversations.
            The neighbourhood is not a backdrop to your stay. It is the stay.
          </p>
        </div>
      </div>

      {/* Highlight cards — US-F3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {highlights.map((h) => (
          <div
            key={h.id}
            className="bg-stone-50 rounded-xl border border-stone-200 p-5 hover:bg-white hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-sm font-semibold text-stone-900">{h.name}</h3>
                <span className="text-xs text-amber-600 font-medium">{h.type}</span>
              </div>
              {h.link && (
                <a
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Learn more about ${h.name} (opens in new tab)`}
                  className="text-stone-300 hover:text-amber-500 transition-colors mt-0.5 shrink-0"
                  data-analytics="location-highlight-link"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">{h.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
