import mongoose from 'mongoose'

/**
 * MongoDB connection with a global cache.
 *
 * Serverless functions cold-start constantly; without this cache you open a
 * new connection per invocation and exhaust the Atlas connection limit under
 * any real ad traffic.
 *
 * NOTE: nothing that renders a page should call this. All marketing pages are
 * statically generated (blueprint §7.3) — the DB is for leads and for
 * build-time content only.
 */

const MONGODB_URI = process.env.MONGODB_URI

type Cached = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: Cached | undefined
}

const cached: Cached = global._mongoose ?? { conn: null, promise: null }
global._mongoose = cached

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env.local.')
  }
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export const isDatabaseConfigured = Boolean(MONGODB_URI)
