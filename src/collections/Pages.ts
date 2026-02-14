import type { CollectionConfig } from 'payload'

// US-2A2, 2A3 — editable page content with simple blocks
// US-2A4, 2A5 — draft/publish workflow via versions
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Manage website pages and their content sections.',
  },
  // US-2A4, 2A5 — enables Draft / Published status + Publish button in admin
  versions: {
    drafts: true,
  },
  fields: [
    // ── Identity ─────────────────────────────────────────────────────────────
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
      admin: {
        position: 'sidebar',
        description: 'e.g. "about" → /about. Lowercase, hyphens only.',
      },
    },

    // ── Simple content blocks — US-2A3 ───────────────────────────────────────
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Content Sections',
      blocks: [
        // 1. Section Title
        {
          slug: 'sectionTitle',
          labels: { singular: 'Section Title', plural: 'Section Titles' },
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              admin: { description: 'Small label above the heading (optional)' },
            },
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'subheading',
              type: 'textarea',
            },
            {
              name: 'align',
              type: 'select',
              defaultValue: 'left',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
              ],
            },
          ],
        },

        // 2. Text Block
        {
          slug: 'textBlock',
          labels: { singular: 'Text Block', plural: 'Text Blocks' },
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
          ],
        },

        // 3. Image Block
        {
          slug: 'imageBlock',
          labels: { singular: 'Image', plural: 'Images' },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
            },
            {
              name: 'size',
              type: 'select',
              defaultValue: 'full',
              options: [
                { label: 'Full Width', value: 'full' },
                { label: 'Medium', value: 'medium' },
              ],
            },
          ],
        },
      ],
    },

    // ── SEO sidebar ───────────────────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: { description: 'Overrides page title in browser tab.' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: { description: 'Keep under 160 characters.' },
        },
      ],
    },
  ],
}
