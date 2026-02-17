import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const highlights = [
  {
    tag: 'Food & Wine',
    title: 'Private Tasting Evenings',
    desc: 'Curated wine and cheese sessions with local sommeliers, held in our intimate courtyard.',
    image: '/images/exp-wine.jpg',
  },
  {
    tag: 'Culture',
    title: 'Gallery Walks',
    desc: 'Private guided tours through Le Marais galleries, tailored to your taste.',
    image: '/images/exp-gallery.jpg',
  },
  {
    tag: 'Wellness',
    title: 'Morning Rituals',
    desc: 'Sunrise yoga on the rooftop terrace, followed by a light seasonal breakfast.',
    image: '/images/exp-wellness.jpg',
  },
]

export default function ExperienceHighlights() {
  return (
    <section className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500 mb-3">
              The Experience
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              More Than a Stay.
              <br />
              <em className="italic text-stone-400">A Memory in the Making</em>
            </h2>
          </div>
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-300 transition-colors group shrink-0"
          >
            Explore Experiences
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div key={item.title} className="group">
              <div className="relative aspect-[3/2] overflow-hidden rounded-xl mb-5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-widest text-amber-500 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-serif text-xl text-white mb-2">{item.title}</h3>
              <p className="text-sm text-stone-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
