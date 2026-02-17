import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rooms & Suites',
  description: 'Browse all rooms and suites at Golden Tee.',
}

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
