import mongoose, { Schema, type InferSchemaType } from 'mongoose'
import { BUDGET_BANDS } from '../site'

/**
 * Lead model — blueprint §6.5.
 *
 * `firstResponseAt` is the single most important field in this schema.
 * Time-to-first-response is the one internal metric that predicts revenue,
 * and on Bark it is decisive: up to five professionals receive the same lead
 * and one older than ~30 minutes has already been called by several of them.
 */

const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    website: { type: String, trim: true },

    tier: { type: String, enum: ['quick', 'brief', 'call'], required: true },
    service: { type: String },
    budgetBand: {
      type: String,
      enum: BUDGET_BANDS.map((b) => b.value),
    },
    timeline: { type: String, enum: ['asap', '1-3mo', '3-6mo', 'exploring'] },
    message: { type: String },

    source: {
      type: String,
      enum: ['organic', 'meta', 'bark', 'linkedin', 'referral', 'direct'],
      default: 'direct',
      index: true,
    },
    utm: {
      source: String,
      medium: String,
      campaign: String,
      content: String,
      term: String,
    },
    landingPage: String,
    referrer: String,

    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'],
      default: 'new',
      index: true,
    },
    /** Set the moment a human replies. Report on it weekly. Target: < 5 min. */
    firstResponseAt: Date,
    ownerId: String,

    /** Required for GDPR/CCPA and for any future email marketing. */
    consent: {
      marketing: { type: Boolean, default: false },
      at: Date,
    },

    /** Spam scoring only. Disclose in the privacy policy. */
    ip: String,
    userAgent: String,
  },
  { timestamps: true },
)

leadSchema.index({ createdAt: -1 })
leadSchema.index({ status: 1, createdAt: -1 })

export type Lead = InferSchemaType<typeof leadSchema>

export const LeadModel =
  (mongoose.models.Lead as mongoose.Model<Lead>) ?? mongoose.model<Lead>('Lead', leadSchema)
