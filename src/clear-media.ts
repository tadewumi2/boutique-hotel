// @ts-nocheck
import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function clearMedia() {
  const payload = await getPayload({ config })

  console.log('🗑️  Clearing database to re-seed...\n')

  // Delete in order to respect foreign key constraints
  const collections = ['gallery', 'rooms', 'experiences', 'amenities', 'media']

  for (const collection of collections) {
    console.log(`\n📦 Clearing ${collection}...`)
    const { docs } = await payload.find({
      collection: collection as any,
      limit: 1000,
    })

    console.log(`   Found ${docs.length} items`)

    for (const doc of docs) {
      await payload.delete({
        collection: collection as any,
        id: doc.id,
      })
    }
    console.log(`   ✅ Cleared ${docs.length} ${collection} items`)
  }

  console.log('\n✅ Database cleared. Now run: pnpm seed')
  process.exit(0)
}

clearMedia().catch((err) => {
  console.error('❌ Clear failed:', err)
  process.exit(1)
})
