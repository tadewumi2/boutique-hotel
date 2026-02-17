'use client'

import PlausibleProvider from 'next-plausible'

export default function Plausible({ children }: { children: React.ReactNode }) {
  return (
    <PlausibleProvider
      domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN!}
      customDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_URL!}
      selfHosted
      trackLocalhost
      trackOutboundLinks
    >
      {children}
    </PlausibleProvider>
  )
}
