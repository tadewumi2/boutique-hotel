import type { Metadata } from 'next'
import { getExperiences, nearbyPlaces } from '@/lib/experiences'
import ExperienceCard from '@/components/experience/ExperienceCard'
import NearbySection from '@/components/experience/NearbySection'
import ExperienceCta from '@/components/experience/ExperienceCta'

export const metadata: Metadata = {
  title: 'The Experience — Golden Tee',
  description:
    'Discover the full Golden Tee experience — from private dining and gallery walks to rooftop wellness and curated Parisian itineraries.',
}

export default async function ExperiencePage() {
  const experiences = await getExperiences()

  // Group by category, preserving order from CMS
  const categoryMap = new Map<string, typeof experiences>()
  for (const exp of experiences) {
    if (!categoryMap.has(exp.category)) categoryMap.set(exp.category, [])
    categoryMap.get(exp.category)!.push(exp)
  }
  const categories = Array.from(categoryMap.entries())

  // Category heading labels
  const categoryHeadings: Record<string, string> = {
    'Food & Wine': 'Taste the City',
    Culture: 'Live the Culture',
    Wellness: 'Restore Yourself',
    Exploration: 'Find Your Paris',
  }

  return (
    <main className="pt-24">
      {/* Page hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 mb-3">
          The Experience
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <h1 className="font-serif text-5xl lg:text-6xl text-stone-900 leading-tight">
            More Than a Stay.
            <br />
            <em className="italic text-stone-500">A Way of Being.</em>
          </h1>
          <p className="text-stone-600 text-base leading-relaxed max-w-md">
            We believe a great hotel stay is not about the amenities list. It&apos;s about the moments —
            planned and unplanned — that stay with you long after you&apos;ve checked out.
          </p>
        </div>
      </div>

      {/* Sticky category nav */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-sm border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-6 overflow-x-auto py-3 scrollbar-none">
            {categories.map(([cat]) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                className="text-sm font-medium text-stone-600 hover:text-amber-700 whitespace-nowrap transition-colors pb-1 border-b-2 border-transparent hover:border-amber-500"
              >
                {cat}
              </a>
            ))}
            <a
              href="#nearby"
              className="text-sm font-medium text-stone-600 hover:text-amber-700 whitespace-nowrap transition-colors pb-1 border-b-2 border-transparent hover:border-amber-500"
            >
              Neighbourhood
            </a>
          </div>
        </div>
      </div>

      {/* Experience sections — US-2E5 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 space-y-24">
        {categories.length > 0 ? (
          categories.map(([cat, exps]) => {
            const anchor = cat.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')
            return (
              <section key={cat} id={anchor} className="scroll-mt-28">
                <div className="mb-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 mb-2">
                    {cat}
                  </p>
                  <h2 className="font-serif text-3xl text-stone-900">
                    {categoryHeadings[cat] ?? cat}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exps.map((exp) => (
                    <ExperienceCard key={exp.slug} exp={exp} />
                  ))}
                </div>
              </section>
            )
          })
        ) : (
          <p className="text-center text-stone-500 py-20 text-sm tracking-widest uppercase">
            No experiences published yet.
          </p>
        )}
      </div>

      {/* Nearby — static data, no CMS needed */}
      <NearbySection places={nearbyPlaces} />

      <ExperienceCta />
    </main>
  )
}
