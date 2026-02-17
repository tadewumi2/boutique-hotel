import { usePlausible } from 'next-plausible'

type AnalyticsEvents = {
  book_click: { location?: string }
  contact_submit: never
  room_view: { slug: string; name: string }
}

export function useAnalytics() {
  const plausible = usePlausible<AnalyticsEvents>()

  return {
    trackBookClick: (location?: string) => plausible('book_click', { props: { location } }),

    trackContactSubmit: () => plausible('contact_submit'),

    trackRoomView: (slug: string, name: string) =>
      plausible('room_view', { props: { slug, name } }),
  }
}
