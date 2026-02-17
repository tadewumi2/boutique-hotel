import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// US-A6: CTA appears again in later sections
export default function CtaBanner() {
  return (
    <section className="py-24 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700 mb-5">
          Ready to Arrive?
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-tight mb-6">
          Your Stay at
          <br />
          <em className="italic text-amber-700">Golden Tee</em> Awaits
        </h2>
        <p className="text-stone-600 text-base max-w-xl mx-auto leading-relaxed mb-10">
          Reserve your room, enquire about a private experience, or simply say hello. We're here to
          make your visit unforgettable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-medium text-sm transition-all duration-200 hover:gap-3"
          >
            Book Your Stay
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-stone-300 hover:border-stone-400 text-stone-700 hover:text-stone-900 font-medium text-sm transition-all duration-200"
          >
            View Rooms
          </Link>
        </div>
      </div>
    </section>
  )
}
