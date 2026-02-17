'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/lib/useAnalytics'

export default function RoomViewTracker({ slug, name }: { slug: string; name: string }) {
  const { trackRoomView } = useAnalytics()

  useEffect(() => {
    trackRoomView(slug, name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return null
}
