import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'

import { Pages } from './collections/Pages'
import { Rooms } from './collections/Rooms'
import { Experiences } from './collections/Experiences'
import { Media } from './collections/Media'
import { Amenities } from './collections/Amenities'
import { Gallery } from './collections/Gallery'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  sharp,
  // ── Admin panel — US-2A1 ──────────────────────────────────────────────────
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Golden Tee CMS',
    },
  },

  // ── Collections ───────────────────────────────────────────────────────────
  collections: [
    Pages,
    Rooms,
    Experiences,
    Media,
    Gallery,
    Amenities,
    // Built-in users collection for admin login
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [
        { name: 'name', type: 'text' },
        {
          name: 'role',
          type: 'select',
          defaultValue: 'editor',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
          ],
          admin: { position: 'sidebar' },
        },
      ],
    },
  ],

  // ── Rich text editor ──────────────────────────────────────────────────────
  editor: lexicalEditor({}),

  // ── Database — PostgreSQL ─────────────────────────────────────────────────
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI as string },
  }),

  // ── Vercel Blob storage for media uploads ─────────────────────────────────
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN as string,
    }),
  ],

  // ── Secret ────────────────────────────────────────────────────────────────
  secret: process.env.PAYLOAD_SECRET as string,

  // ── TypeScript output ─────────────────────────────────────────────────────
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
