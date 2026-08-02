import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Web Vitals beacon sink.
 *
 * Core Web Vitals are p75 metrics. If you route these to GA4 you get a MEAN,
 * and means hide exactly the tail that CrUX scores you on. Store the raw
 * `id`-tagged samples and compute percentiles yourself.
 *
 * Also: field data in PageSpeed Insights is a 28-day rolling window. Day 0
 * after a fix shows zero change; day 14 is directional; day 28 is the first
 * date the number reflects only the new experience. Set that expectation with
 * clients before you ship, not after.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    // TODO: write to MongoDB or your analytics sink.
    if (process.env.NODE_ENV !== 'production') {
      console.log('[vitals]', body)
    }
  } catch {
    // Beacons are fire-and-forget. Never fail loudly.
  }
  return new NextResponse(null, { status: 204 })
}
