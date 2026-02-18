import Link from 'next/link'
import { ArrowRight, Coffee, Wifi, UtensilsCrossed, Car, Dumbbell, Sparkles } from 'lucide-react'

const amenities = [
  { icon: Coffee, label: 'Morning Breakfast', desc: 'Locally sourced, served daily' },
  { icon: Wifi, label: 'High-Speed Wi-Fi', desc: 'Throughout the hotel' },
  { icon: UtensilsCrossed, label: 'In-Room Dining', desc: 'Available 7am – 11pm' },
  { icon: Car, label: 'Valet Parking', desc: 'On request, 24 hours' },
  { icon: Dumbbell, label: 'Fitness Studio', desc: 'Open daily, 6am – 10pm' },
  { icon: Sparkles, label: 'Wellness Spa', desc: 'Treatments & massages' },
]

export default function AmenitiesTeaser() {
  return (
    <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 mb-3">
            Amenities
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight">
            Everything You Need,
            <br />
            <em className="italic text-stone-600">Nothing You Don&apos;t</em>
          </h2>
        </div>
        <Link
          href="/amenities"
          className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-700 transition-colors group shrink-0"
        >
          See All Amenities
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenities.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex items-start gap-4 p-6 rounded-xl bg-stone-100 hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <Icon size={18} className="text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 mb-0.5">{label}</h3>
              <p className="text-xs text-stone-600">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
