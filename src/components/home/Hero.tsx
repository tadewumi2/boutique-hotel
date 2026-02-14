import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero.jpg"
        alt="Maison Elara hotel interior — a warm, sun-lit lobby with editorial design"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 mb-5">
          Paris · Boutique Hotel
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
          Where Every Detail
          <br />
          <em className="italic text-amber-300">Tells a Story</em>
        </h1>
        <p className="text-base md:text-lg text-white/75 max-w-xl mx-auto mb-10 leading-relaxed">
          An intimate retreat in the heart of Paris. Thoughtfully designed rooms, curated
          experiences, and a warmth you'll carry home.
        </p>

        {/* CTAs — US-A1 + US-A6 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-white font-medium text-sm transition-all duration-200 hover:gap-3"
          >
            Book Your Stay
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/50 hover:border-white text-white font-medium text-sm transition-all duration-200 hover:bg-white/10"
          >
            Explore Rooms
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/30 animate-pulse" />
      </div>
    </section>
  )
}
