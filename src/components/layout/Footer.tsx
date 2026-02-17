import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-white text-2xl mb-4">Golden Tee</h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              A boutique retreat where design meets story. Every corner, a chapter.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-stone-400">
                <MapPin size={15} className="mt-0.5 shrink-0 text-amber-500" />
                <span>42 Rue de la Paix, Paris, France 75001</span>
              </li>
              <li>
                <a
                  href="tel:+33123456789"
                  className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors"
                >
                  <Phone size={15} className="shrink-0 text-amber-500" />
                  +33 1 23 45 67 89
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@maisonelara.com"
                  className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors"
                >
                  <Mail size={15} className="shrink-0 text-amber-500" />
                  hello@maisonelara.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Rooms & Suites', href: '/rooms' },
                { label: 'The Experience', href: '/experience' },
                { label: 'Amenities', href: '/amenities' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Location', href: '/location' },
                { label: 'About the Hotel', href: '/about' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-stone-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Legal */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Follow Us
            </h4>
            <div className="flex gap-4 mb-8">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:border-amber-500 hover:text-amber-500 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <Link
              href="/privacy-policy"
              className="text-xs text-stone-500 hover:text-stone-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-stone-600">
          <p>© {new Date().getFullYear()} Golden Tee. All rights reserved.</p>
          <p>Crafted with care in Paris.</p>
        </div>
      </div>
    </footer>
  )
}
