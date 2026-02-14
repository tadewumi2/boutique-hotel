import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'season', '_status'],
    description: 'Manage hotel experiences — dining, culture, wellness, etc.',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Food & Wine', value: 'Food & Wine' },
        { label: 'Culture', value: 'Culture' },
        { label: 'Wellness', value: 'Wellness' },
        { label: 'Exploration', value: 'Exploration' },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'Short italic line shown under the title.' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'Used on cards. Keep under 160 characters.' },
    },
    {
      name: 'fullDescription',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'season',
      type: 'select',
      required: true,
      defaultValue: 'year-round',
      options: [
        { label: 'Year-Round', value: 'year-round' },
        { label: 'Summer', value: 'summer' },
        { label: 'Winter', value: 'winter' },
        { label: 'Spring & Summer', value: 'spring' },
        { label: 'Autumn', value: 'autumn' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'details',
      type: 'group',
      label: 'Booking Details',
      fields: [
        { name: 'hours', type: 'text' },
        { name: 'pricingNote', type: 'text' },
        { name: 'reservationNote', type: 'text' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
  ],
}
