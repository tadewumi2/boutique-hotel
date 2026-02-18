import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

// US-C7 — trackable CTA, visible on desktop and mobile
export default function ExperienceCta() {
  return (
    <section className="py-20 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700 mb-4">
          Ready to Experience It?
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-5">
          Every experience is
          <br />
          <em className="italic text-amber-700">made to order</em>
        </h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed mb-10">
          Tell us what you&apos;re looking for and our team will craft something that fits perfectly
          around your stay.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            data-analytics="experience-cta-book"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-medium text-sm transition-all duration-200 group"
          >
            Book an Experience
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            data-analytics="experience-cta-enquire"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-stone-300 hover:border-stone-400 text-stone-700 font-medium text-sm transition-all duration-200"
          >
            <Mail size={15} />
            Send an Enquiry
          </Link>
        </div>
      </div>
    </section>
  )
}
