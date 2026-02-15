import type { CollectionConfig } from 'payload'

// Dedicated gallery collection — separate from general Media uploads.
// Gives editors control over what appears publicly, in what order,
// and with which category label.
export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    read: () => true, // visible gallery items are public
  },
  admin: {
    useAsTitle: 'title',
    // US-2C6 — useful columns in list view
    defaultColumns: ['image', 'title', 'category', 'order', 'isVisible'],
    description: 'Manage public gallery images — visibility, order, and captions.',
  },
  // No drafts needed — visibility is controlled by isVisible toggle instead
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Internal label shown in CMS list. Not shown on site.' },
    },

    // ── Image — US-2C1 ────────────────────────────────────────────────────────
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    // ── Alt text — US-2C2 (alt text lives on Media, caption here) ────────────
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption shown in the lightbox on the gallery page.',
      },
    },

    // ── Category — matches frontend filter tabs ───────────────────────────────
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'Exterior',
      options: [
        { label: 'Rooms', value: 'Rooms' },
        { label: 'Dining', value: 'Dining' },
        { label: 'Wellness', value: 'Wellness' },
        { label: 'Exterior', value: 'Exterior' },
        { label: 'Experience', value: 'Experience' },
      ],
    },

    // ── Visibility — US-2C3 ───────────────────────────────────────────────────
    {
      name: 'isVisible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to hide this image from the public gallery.',
      },
    },

    // ── Display order — US-2C4 ────────────────────────────────────────────────
    {
      name: 'order',
      type: 'number',
      defaultValue: 99,
      admin: {
        position: 'sidebar',
        description: 'Display order. Lower number = shown first.',
      },
    },

    // ── Room link — US-2C5 (optional relationship) ────────────────────────────
    {
      name: 'room',
      type: 'relationship',
      relationTo: 'rooms',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Optionally link this image to a specific room.',
      },
    },
  ],
}
