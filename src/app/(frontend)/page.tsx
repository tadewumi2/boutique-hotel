import Hero from '@/components/home/Hero'
import RoomsPreview from '@/components/home/RoomsPreview'
import StorySection from '@/components/home/StorySection'
import ExperienceHighlights from '@/components/home/ExperienceHighlights'
import AmenitiesTeaser from '@/components/home/AmenitiesTeaser'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata = {
  title: 'Golden Tee — Boutique Hotel Paris',
  description:
    'An intimate boutique retreat in the heart of Paris. Thoughtfully designed rooms, curated experiences, and a warmth you will carry home.',
  openGraph: {
    title: 'Golden Tee — Boutique Hotel Paris',
    description: 'An intimate boutique retreat in the heart of Paris.',
    images: ['/images/og.png'],
  },
}

export default function HomePage() {
  return (
    <main>
      {/* US-A1, US-A6 — Hero with primary CTA */}
      <Hero />

      {/* US-A2 — Rooms preview */}
      <RoomsPreview />

      {/* US-A3 — Storytelling sections */}
      <StorySection />

      {/* US-A2, US-A3 — Experience highlights */}
      <ExperienceHighlights />

      {/* US-A2 — Amenities teaser */}
      <AmenitiesTeaser />

      {/* US-A6 — Secondary CTA */}
      <CtaBanner />
    </main>
  )
}
