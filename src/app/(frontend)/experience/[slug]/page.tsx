import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Clock, BadgeInfo, CalendarCheck, Check, ArrowRight } from 'lucide-react'
import { getExperienceBySlug, getAllExperienceSlugs } from '@/lib/experiences'
import SeasonalBadge from '@/components/experience/SeasonalBadge'
import ExperienceCta from '@/components/experience/ExperienceCta'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllExperienceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const exp = getExperienceBySlug(slug)
  if (!exp) return {}
  return {
    title: exp.title,
    description: exp.description,
    openGraph: { images: [exp.image] },
  }
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params
  const exp = getExperienceBySlug(slug)
  if (!exp) notFound()

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-400 pt-8 pb-8">
          <Link href="/" className="hover:text-stone-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/experience" className="hover:text-stone-600 transition-colors">
            Experience
          </Link>
          <span>/</span>
          <span className="text-stone-600">{exp.title}</span>
        </nav>

        {/* Hero image — US-C8 */}
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-10">
          <Image
            src={exp.image}
            alt={exp.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
              {exp.category}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="font-serif text-4xl text-stone-900">{exp.title}</h1>
              <SeasonalBadge season={exp.season} />
            </div>
            <p className="text-amber-600 font-medium italic text-lg mb-6">{exp.tagline}</p>
            <p className="text-stone-500 leading-relaxed mb-8">{exp.fullDescription}</p>

            {/* Features */}
            <h2 className="font-serif text-xl text-stone-900 mb-4">What's Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
              {exp.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-stone-600">
                  <Check size={14} className="text-amber-500 shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* Gallery — US-C4 */}
            {exp.gallery && exp.gallery.length > 1 && (
              <div className="grid grid-cols-2 gap-3 mb-10">
                {exp.gallery.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={img}
                      alt={`${exp.title} — ${i + 2}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Back link */}
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 transition-colors group"
            >
              <ChevronLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              Back to All Experiences
            </Link>
          </div>

          {/* Sidebar — key details + CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
              <h3 className="font-serif text-xl text-stone-900 mb-5">Details</h3>

              <div className="flex flex-col gap-4 mb-6">
                {exp.hours && (
                  <div className="flex items-start gap-3">
                    <Clock size={15} className="text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">
                        Hours
                      </p>
                      <p className="text-sm text-stone-700">{exp.hours}</p>
                    </div>
                  </div>
                )}
                {exp.pricingNote && (
                  <div className="flex items-start gap-3">
                    <BadgeInfo size={15} className="text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">
                        Pricing
                      </p>
                      <p className="text-sm text-stone-700">{exp.pricingNote}</p>
                    </div>
                  </div>
                )}
                {exp.reservationNote && (
                  <div className="flex items-start gap-3">
                    <CalendarCheck size={15} className="text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">
                        Reservations
                      </p>
                      <p className="text-sm text-stone-700">{exp.reservationNote}</p>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                data-analytics="experience-detail-cta"
                className="flex items-center justify-between w-full px-5 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-white font-medium text-sm transition-colors group"
              >
                Book This Experience
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA — US-C7 */}
      <div className="mt-20 border-t border-stone-100">
        <ExperienceCta />
      </div>
    </main>
  )
}
