import { z } from 'zod'
import { BUDGET_BANDS, TIMELINES, ALL_SERVICE_SLUGS } from './site'

/**
 * One schema, used on the client (react-hook-form resolver) AND on the server
 * (/api/lead). Never validate only in the browser — bots do not run your JS.
 */

const budgetValues = BUDGET_BANDS.map((b) => b.value) as [string, ...string[]]
const timelineValues = TIMELINES.map((t) => t.value) as [string, ...string[]]
const serviceValues = ALL_SERVICE_SLUGS as unknown as [string, ...string[]]

/** Digits with common separators and an optional leading +. Letters fail. */
const phoneField = z
  .string()
  .trim()
  .regex(/^\+?[0-9][0-9\s\-().]{6,19}$/, 'Please enter a valid phone number')
  .refine((value) => value.replace(/\D/g, '').length >= 7, 'Please enter a valid phone number')
  .optional()
  .or(z.literal(''))

/** Tier 1 — low friction. 3 fields. Blueprint §4.8. */
export const leadTier1Schema = z.object({
  tier: z.literal('quick'),
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  email: z.string().trim().toLowerCase().email('Please enter a valid email'),
  phone: phoneField,
  // Honeypot: real users never fill this. Validated PERMISSIVELY on purpose —
  // if zod rejects it we return 422 and the bot learns it was caught. The
  // route checks the field itself and returns 200 so the bot thinks it worked.
  website_url: z.string().max(2000).optional(),
  consent: z.boolean().optional().default(false),
})

/** Tier 2 — qualified. Budget is REQUIRED; it is your cheapest lead filter. */
export const leadTier2Schema = z.object({
  tier: z.literal('brief'),
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  email: z.string().trim().toLowerCase().email('Please enter a valid email'),
  phone: phoneField,
  company: z.string().trim().max(160).optional().or(z.literal('')),
  service: z.enum(serviceValues, { errorMap: () => ({ message: 'Pick the closest service' }) }),
  budgetBand: z.enum(budgetValues, { errorMap: () => ({ message: 'Please select a budget range' }) }),
  timeline: z.enum(timelineValues).optional(),
  message: z.string().trim().min(10, 'Tell us a little about the project').max(4000),
  website_url: z.string().max(2000).optional(),
  consent: z.boolean().optional().default(false),
})

export const leadSchema = z.discriminatedUnion('tier', [leadTier1Schema, leadTier2Schema])

export type LeadTier1 = z.infer<typeof leadTier1Schema>
export type LeadTier2 = z.infer<typeof leadTier2Schema>
export type LeadInput = z.infer<typeof leadSchema>

/** Attribution captured client-side and posted alongside the form. */
export const attributionSchema = z.object({
  landingPage: z.string().max(2000).optional(),
  referrer: z.string().max(2000).optional(),
  utm: z
    .object({
      source: z.string().max(200).optional(),
      medium: z.string().max(200).optional(),
      campaign: z.string().max(200).optional(),
      content: z.string().max(200).optional(),
      term: z.string().max(200).optional(),
    })
    .optional(),
  turnstileToken: z.string().max(4000).optional(),
})

export const leadRequestSchema = z.intersection(leadSchema, attributionSchema)
export type LeadRequest = z.infer<typeof leadRequestSchema>

/** Derive the lead source from UTM data. Blueprint §6.5. */
export function deriveSource(utm?: { source?: string; medium?: string }, referrer?: string) {
  const s = (utm?.source ?? '').toLowerCase()
  if (s.includes('facebook') || s.includes('meta') || s.includes('ig')) return 'meta'
  if (s.includes('bark')) return 'bark'
  if (s.includes('linkedin')) return 'linkedin'
  if (utm?.medium === 'cpc' || utm?.medium === 'paid') return 'meta'
  if (referrer && !referrer.includes('labtechcrew.com')) {
    if (referrer.includes('google.')) return 'organic'
    return 'referral'
  }
  if (!referrer) return 'direct'
  return 'organic'
}
