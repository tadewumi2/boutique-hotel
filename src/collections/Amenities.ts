import type { CollectionConfig } from 'payload'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  access: {
    read: () => true, // published amenities are public
  },
  admin: {
    useAsTitle: 'name',
    // US-2D6 — useful columns in list view
    defaultColumns: ['name', 'category', 'status', '_status', 'order'],
    description: 'Manage hotel amenities — grouped by category, ordered, and publishable.',
  },
  // US-2D1, 2D2, 2D3 — draft/publish support
  versions: {
    drafts: true,
  },
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    // ── US-2D4 — Category for grouping ────────────────────────────────────────
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'In-Room', value: 'in-room' },
        { label: 'Property', value: 'property' },
        { label: 'Guest Services', value: 'services' },
        { label: 'Accessibility & Connectivity', value: 'connectivity' },
      ],
      admin: {
        description: 'Used to group amenities into sections on the Amenities page.',
      },
    },

    // ── Pricing status (included / paid / on-request) ─────────────────────────
    // Named 'pricingStatus' to avoid collision with Payload's reserved '_status'
    // enum in PostgreSQL (both would generate 'enum_amenities_status')
    {
      name: 'pricingStatus',
      type: 'select',
      required: true,
      defaultValue: 'included',
      options: [
        { label: 'Included', value: 'included' },
        { label: 'Paid', value: 'paid' },
        { label: 'On Request', value: 'on-request' },
      ],
      label: 'Status',
      admin: {
        description: 'Whether this amenity is included, paid, or on request.',
      },
    },

    // ── Description (optional) — US-2D1 ──────────────────────────────────────
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short description shown on the amenities page.',
      },
    },

    // ── Icon name — matches lucide icon map in AmenityItem.tsx ────────────────
    {
      name: 'icon',
      type: 'text',
      defaultValue: 'Sparkles',
      admin: {
        description: 'Lucide icon name e.g. Wifi, Coffee, Sun, Dumbbell.',
      },
    },

    // ── Availability ──────────────────────────────────────────────────────────
    {
      name: 'availability',
      type: 'text',
      admin: {
        description: 'e.g. Daily 6am–10pm',
      },
    },

    // ── Season ────────────────────────────────────────────────────────────────
    {
      name: 'season',
      type: 'select',
      options: [
        { label: 'Year-Round', value: 'year-round' },
        { label: 'Summer', value: 'summer' },
        { label: 'Winter', value: 'winter' },
        { label: 'Seasonal', value: 'seasonal' },
      ],
    },

    // ── Note ──────────────────────────────────────────────────────────────────
    {
      name: 'note',
      type: 'text',
      admin: {
        description: 'Short extra note e.g. "By appointment only"',
      },
    },

    // ── Detail modal fields ───────────────────────────────────────────────────
    {
      name: 'hasDetail',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable a detail modal with image and extended description.',
      },
    },
    {
      name: 'detailImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => Boolean(data?.hasDetail),
        description: 'Image shown in the detail modal.',
      },
    },
    {
      name: 'detailDescription',
      type: 'textarea',
      admin: {
        condition: (data) => Boolean(data?.hasDetail),
        description: 'Extended description shown in the detail modal.',
      },
    },

    // ── US-2D5 — Display order ────────────────────────────────────────────────
    {
      name: 'order',
      type: 'number',
      defaultValue: 99,
      admin: {
        position: 'sidebar',
        description: 'Display order within its category. Lower = shown first.',
      },
    },
  ],
}
