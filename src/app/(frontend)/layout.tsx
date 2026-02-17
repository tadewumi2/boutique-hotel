import type { Metadata } from 'next'
import Script from 'next/script'
import '../globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Golden Tee — Boutique Hotel Paris',
    template: '%s | Golden Tee',
  },
  description: 'An intimate boutique retreat in the heart of Paris.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <Script
          defer
          data-domain="localhost"
          data-api="http://localhost:8001/api/event"
          src="http://localhost:8001/js/script.local.outbound-links.js"
        />
      </body>
    </html>
  )
}
