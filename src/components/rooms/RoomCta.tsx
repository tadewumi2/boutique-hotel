'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, X, Mail } from 'lucide-react'
import { useAnalytics } from '@/lib/useAnalytics'

export default function RoomCta({ roomName, priceFrom }: { roomName: string; priceFrom: number }) {
  const [modal, setModal] = useState(false)
  const { trackBookClick } = useAnalytics()

  return (
    <>
      {/* Sticky CTA bar — mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 px-6 py-4 flex gap-3">
        <button
          onClick={() => setModal(true)}
          className="flex-1 py-3 rounded-full border border-stone-300 text-stone-700 text-sm font-medium hover:border-stone-400 transition-colors"
        >
          Enquire
        </button>
        <Link
          href="/contact"
          onClick={() => trackBookClick('room_cta_mobile')}
          className="flex-1 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-900 text-sm font-medium text-center transition-colors"
        >
          Book Now
        </Link>
      </div>

      {/* Sidebar CTA card — desktop */}
      <div className="hidden lg:block sticky top-28 bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Starting from</p>
        <p className="font-serif text-4xl text-stone-900 mb-1">
          €{priceFrom}
          <span className="text-base font-sans font-normal text-stone-500">/night</span>
        </p>
        <p className="text-xs text-stone-500 mb-6">Includes breakfast for two</p>

        <Link
          href="/contact"
          onClick={() => trackBookClick('room_cta_desktop')}
          className="flex items-center justify-between w-full px-5 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-medium text-sm transition-colors mb-3 group"
        >
          Book Now
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <button
          onClick={() => setModal(true)}
          className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full border border-stone-200 hover:border-stone-300 text-stone-600 font-medium text-sm transition-colors"
        >
          <Mail size={14} />
          Enquire About This Room
        </button>

        <p className="text-xs text-stone-500 text-center mt-5 leading-relaxed">
          Free cancellation up to 48 hours before arrival
        </p>
      </div>

      {/* Enquiry modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-serif text-2xl text-stone-900">Enquire</h3>
                <p className="text-sm text-stone-500 mt-1">{roomName}</p>
              </div>
              <button
                onClick={() => setModal(false)}
                className="text-stone-500 hover:text-stone-600"
              >
                <X size={20} />
              </button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs font-medium text-stone-600 uppercase tracking-wider block mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 uppercase tracking-wider block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 uppercase tracking-wider block mb-1.5">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Dates, special requests..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-medium text-sm transition-colors mt-1"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
