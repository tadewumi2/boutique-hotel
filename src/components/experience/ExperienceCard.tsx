import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, BadgeInfo } from 'lucide-react'
import SeasonalBadge from './SeasonalBadge'
import type { Experience } from '@/lib/experiences'

export default function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={exp.image}
          alt={exp.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category pill */}
        <span className="absolute top-4 left-4 bg-black/50 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
          {exp.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-serif text-xl text-stone-900">{exp.title}</h3>
          <SeasonalBadge season={exp.season} />
        </div>

        <p className="text-sm text-amber-600 font-medium italic mb-3">{exp.tagline}</p>
        <p className="text-sm text-stone-500 leading-relaxed mb-5 line-clamp-2">
          {exp.description}
        </p>

        {/* Meta info */}
        <div className="flex flex-col gap-2 mb-5">
          {exp.hours && (
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Clock size={12} className="shrink-0 text-amber-500" />
              {exp.hours}
            </div>
          )}
          {exp.pricingNote && (
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <BadgeInfo size={12} className="shrink-0 text-amber-500" />
              {exp.pricingNote}
            </div>
          )}
        </div>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {exp.features.slice(0, 3).map((f) => (
            <span key={f} className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>

        <Link
          href={`/experience/${exp.slug}`}
          className="flex items-center justify-between w-full px-5 py-3 rounded-full bg-stone-900 hover:bg-amber-500 text-white text-sm font-medium transition-colors duration-200 group/btn"
        >
          Learn More
          <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
