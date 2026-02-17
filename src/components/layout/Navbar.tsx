'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useAnalytics } from '@/lib/useAnalytics'

const navLinks = [
  { label: 'Rooms', href: '/rooms' },
  { label: 'Experience', href: '/experience' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Location', href: '/location' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { trackBookClick } = useAnalytics()

  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const solidBg = !isHome || scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidBg ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`font-serif text-xl tracking-wide transition-colors ${
            solidBg ? 'text-stone-900' : 'text-white'
          }`}
        >
          Golden Tee
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                  pathname === href
                    ? 'text-amber-600'
                    : solidBg
                      ? 'text-stone-600 hover:text-stone-900'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-amber-500 transition-all duration-300 ${
                    pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          onClick={() => trackBookClick('navbar_desktop')}
          className="hidden md:inline-flex items-center px-5 py-2 text-sm font-medium rounded-full border transition-all duration-200 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white"
        >
          Book Now
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className={`md:hidden transition-colors ${solidBg ? 'text-stone-800' : 'text-white'}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-white border-t border-stone-100`}
      >
        <ul className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block py-3 text-sm font-medium border-b border-stone-100 transition-colors ${
                  pathname === href ? 'text-amber-600' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link
              href="/contact"
              onClick={() => trackBookClick('navbar_mobile')}
              className="block text-center py-3 rounded-full bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
            >
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
