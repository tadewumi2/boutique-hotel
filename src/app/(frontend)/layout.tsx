import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Maison Elara — Boutique Hotel Paris',
    template: '%s | Maison Elara',
  },
  description: 'An intimate boutique retreat in the heart of Paris.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
