import type { Metadata } from 'next'
import { experiences, nearbyPlaces } from '@/lib/experiences'
import ExperienceCard from '@/components/experience/ExperienceCard'
import NearbySection from '@/components/experience/NearbySection'
import ExperienceCta from '@/components/experience/ExperienceCta'

export const metadata: Metadata = {
  title: 'The Experience',
  description:
    'Discover the full Maison Elara experience — from private dining and gallery walks to rooftop wellness and curated Parisian itineraries.',
}

// Group experiences by category for section anchors — US-C2
const categories = Array.from(new Set(experiences.map((e) => e.category)))

export default function ExperiencePage() {
  return (
    <main className="pt-24">
      {/* Page hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 mb-3">
          The Experience
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <h1 className="font-serif text-5xl lg:text-6xl text-stone-900 leading-tight">
            More Than a Stay.
            <br />
            <em className="italic text-stone-400">A Way of Being.</em>
          </h1>
          <p className="text-stone-500 text-base leading-relaxed max-w-md">
            We believe a great hotel stay is not about the amenities list. It's about the moments —
            planned and unplanned — that stay with you long after you've checked out.
          </p>
        </div>
      </div>

      {/* Section anchors nav — US-C2 */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-sm border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-6 overflow-x-auto py-3 scrollbar-none">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${experiences.find((e) => e.category === cat)?.anchor}`}
                className="text-sm font-medium text-stone-500 hover:text-amber-600 whitespace-nowrap transition-colors pb-1 border-b-2 border-transparent hover:border-amber-500"
              >
                {cat}
              </a>
            ))}
            <a
              href="#nearby"
              className="text-sm font-medium text-stone-500 hover:text-amber-600 whitespace-nowrap transition-colors pb-1 border-b-2 border-transparent hover:border-amber-500"
            >
              Neighbourhood
            </a>
          </div>
        </div>
      </div>

      {/* Experience sections — US-C1, C2 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 space-y-24">
        {categories.map((cat) => {
          const catExperiences = experiences.filter((e) => e.category === cat)
          const anchor = catExperiences[0]?.anchor
          return (
            <section key={cat} id={anchor} className="scroll-mt-28">
              {/* Category heading */}
              <div className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 mb-2">
                  {cat}
                </p>
                <h2 className="font-serif text-3xl text-stone-900">
                  {cat === 'Food & Wine' && 'Taste the City'}
                  {cat === 'Culture' && 'Live the Culture'}
                  {cat === 'Wellness' && 'Restore Yourself'}
                  {cat === 'Exploration' && 'Find Your Paris'}
                </h2>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {catExperiences.map((exp) => (
                  <ExperienceCard key={exp.slug} exp={exp} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Nearby section — US-C5 */}
      <NearbySection places={nearbyPlaces} />

      {/* CTA — US-C7 */}
      <ExperienceCta />
    </main>
  )
}
