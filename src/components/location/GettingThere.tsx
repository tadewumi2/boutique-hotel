import { Car, Train, Plane, Footprints, Clock, type LucideIcon } from 'lucide-react'
import type { TravelMethod } from '@/lib/location'

const iconMap: Record<string, LucideIcon> = { Car, Train, Plane, Footprints }

export default function GettingThere({ methods }: { methods: TravelMethod[] }) {
  return (
    <section id="getting-here" className="scroll-mt-28">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 mb-3">
        Getting Here
      </p>
      {/* US-F9 — semantic H2 */}
      <h2 className="font-serif text-3xl text-stone-900 mb-10">Every Route to Our Door</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {methods.map((method) => {
          const Icon = iconMap[method.icon] ?? Car
          return (
            <div
              key={method.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 hover:border-stone-300 hover:shadow-sm transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-amber-600" aria-hidden="true" />
                </div>
                <div>
                  {/* US-F9 — semantic H3 */}
                  <h3 className="text-sm font-semibold text-stone-900">{method.title}</h3>
                  {method.duration && (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock size={11} className="text-stone-400" aria-hidden="true" />
                      <span className="text-xs text-stone-400">{method.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Steps */}
              <ol className="space-y-2.5">
                {method.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-stone-500 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-400 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )
        })}
      </div>
    </section>
  )
}
