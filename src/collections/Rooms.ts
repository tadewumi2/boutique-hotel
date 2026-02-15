import type { CollectionConfig } from 'payload'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  access: {
    read: () => true, // published rooms are public — same pattern as Media
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'bedType', 'priceFrom', '_status'],
    description: 'Manage room types, images, and details.',
  },
  versions: {
    drafts: true, // US-2A4, 2A5
  },
  fields: [
    // ── Core ─────────────────────────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: { description: 'Used on room cards. Keep under 120 characters.' },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      required: true,
    },

    // ── Key specs ────────────────────────────────────────────────────────────
    {
      name: 'specs',
      type: 'group',
      label: 'Room Specs',
      fields: [
        { name: 'size', type: 'text', required: true, admin: { description: 'e.g. 22' } },
        { name: 'occupancy', type: 'number', required: true },
        {
          name: 'bedType',
          type: 'text',
          required: true,
          admin: { description: 'e.g. King, Queen' },
        },
        {
          name: 'view',
          type: 'text',
          required: true,
          admin: { description: 'e.g. Courtyard, City' },
        },
        {
          name: 'priceFrom',
          type: 'number',
          required: true,
          admin: { description: 'Nightly rate in EUR' },
        },
      ],
    },

    // ── Images ───────────────────────────────────────────────────────────────
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false, // optional until media is seeded
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // ── Features & amenities ─────────────────────────────────────────────────
    {
      name: 'features',
      type: 'array',
      label: 'Highlight Features',
      admin: { description: 'Short labels shown on cards (e.g. "City View")' },
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
    {
      name: 'amenities',
      type: 'array',
      label: 'Room Amenities',
      admin: { description: 'Full list shown on room detail page' },
      fields: [{ name: 'amenity', type: 'text', required: true }],
    },

    // ── Flags ────────────────────────────────────────────────────────────────
    {
      name: 'popular',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show "Popular" badge on card' },
    },

    // ── US-2B4 — display order ────────────────────────────────────────────────
    {
      name: 'order',
      type: 'number',
      defaultValue: 99,
      admin: {
        position: 'sidebar',
        description: 'Display order on Rooms page. Lower number = shown first.',
      },
    },
  ],
}
