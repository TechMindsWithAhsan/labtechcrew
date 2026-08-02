import { SITE } from '../site'

/**
 * ⚠️ STARTING DRAFTS. NOT LEGAL ADVICE. NOT READY TO PUBLISH.
 *
 * Every `[TODO]` must be resolved and a US attorney must review these before
 * launch. You collect personal data through the contact form, you intend to
 * run a Meta Pixel and GA4, you serve users in the US and Canada, and you are
 * forming a Texas LLC. That combination engages: state privacy law (CCPA/CPRA
 * and the newer state acts), Canadian PIPEDA, and the FTC's rules on
 * endorsements and testimonials.
 *
 * These drafts exist so you go into that review with something concrete,
 * which makes it faster and cheaper — not so you can skip it.
 */

export type LegalSection = {
  heading: string
  body: string[]
  bullets?: string[]
}

export type LegalDoc = {
  slug: string
  title: string
  description: string
  updated: string
  sections: LegalSection[]
}

const ENTITY = `${SITE.legalName} ("LabTechCrew", "we", "us")`

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    description:
      'How LabTechCrew collects, uses, stores and deletes personal information, and the rights you have over it.',
    updated: 'Pending legal review — this policy is not yet in force',
    sections: [
      {
        heading: 'Who we are',
        body: [
          `${ENTITY} is ${SITE.jurisdiction}. Our engineering team operates from ${SITE.engineering.city}, ${SITE.engineering.country}, which means personal information you give us may be accessed from outside the United States and Canada. We say this plainly because you are entitled to know it before you fill in a form.`,
          `Questions, requests or complaints: ${SITE.contact.email}.`,
        ],
      },
      {
        heading: 'What we collect',
        body: ['We collect only what we need to answer you and to run this website.'],
        bullets: [
          'Information you give us: name, email address, phone number, company name, project description, budget range and timeline, submitted through our contact forms.',
          'Technical information collected automatically: IP address, browser type and version, pages viewed, referring page, and the marketing parameters (utm_source, utm_medium and similar) attached to the link you arrived on.',
          'Cookies and similar technologies, only where you have consented — see our Cookie Policy.',
          'We do not knowingly collect information from anyone under 16, and this site is not directed at children.',
        ],
      },
      {
        heading: 'Why we collect it',
        body: ['Each purpose below has a lawful basis and we do not use your information for anything else.'],
        bullets: [
          'To reply to your enquiry and prepare a proposal — our legitimate interest in responding to a request you made.',
          'To keep a record of the enquiry and any resulting contract — legitimate interest and, where a contract exists, contractual necessity.',
          'To measure how this website performs and how our advertising performs — only with your consent.',
          'To send occasional relevant updates — only if you tick the box, and every message has an unsubscribe link.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: [
          'We do not sell personal information, and we do not share it for cross-context behavioural advertising as those terms are defined under California law.',
          'We use a small number of service providers who process information on our behalf under contract:',
        ],
        bullets: [
          'Vercel Inc. (United States) — website hosting and delivery',
          'MongoDB, Inc. / MongoDB Atlas (United States) — enquiry storage',
          'Resend (United States) — transactional email delivery',
          'Google Analytics 4 (Google LLC), only where you have given consent',
          'Cloudflare, Inc. (United States) — bot protection on our forms',
          'Professional advisers, and law enforcement or regulators where we are legally required to disclose.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'Enquiries that do not become projects: 24 months, then deleted.',
          'Client records: for the duration of the engagement and for seven years afterwards, to meet tax and contractual record-keeping obligations.',
          'Analytics data: as configured in the analytics tool, and not longer than 26 months.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Depending on where you live, you may have some or all of the following rights. We honour them for everyone regardless of location, because operating two standards is harder than operating one.',
        ],
        bullets: [
          'Access — ask for a copy of the personal information we hold about you.',
          'Correction — ask us to fix information that is wrong or incomplete.',
          'Deletion — ask us to delete your information, subject to any legal obligation to retain it.',
          'Objection and restriction — ask us to stop or limit certain processing.',
          'Portability — receive your information in a portable format.',
          'Withdraw consent — at any time, without affecting anything done before you withdrew it.',
          'Non-discrimination — we will not treat you differently for exercising any of these rights.',
        ],
      },
      {
        heading: 'How to exercise your rights',
        body: [
          `Email ${SITE.contact.email} with what you want. We will confirm your identity — we will not send someone else's data to whoever asks — and respond within 30 days, or tell you why we need longer.`,
        ],
      },
      {
        heading: 'International transfers',
        body: [
          `Personal information collected through this site may be accessed by our team in ${SITE.engineering.country}. Where required, transfers are made under appropriate safeguards. [TODO — attorney to specify the mechanism: standard contractual clauses or the applicable equivalent.]`,
        ],
      },
      {
        heading: 'Security',
        body: [
          'Data is encrypted in transit and at rest, access is limited to people who need it for their work, and our forms are protected against automated abuse. No system is perfectly secure, and we will not pretend otherwise. If a breach affects your information we will notify you and the relevant regulator as required by law.',
        ],
      },
      {
        heading: 'Changes',
        body: [
          'If we change this policy materially we will update the date at the top and, where the change affects you, tell you directly.',
        ],
      },
    ],
  },

  {
    slug: 'terms',
    title: 'Terms of Service',
    description: 'The terms that apply to your use of the LabTechCrew website.',
    updated: 'Pending legal review — this policy is not yet in force',
    sections: [
      {
        heading: 'These terms cover the website only',
        body: [
          `These terms govern your use of labtechcrew.com. If you engage ${ENTITY} for services, that work is governed by a separate master services agreement and statement of work, which take precedence over anything on this page.`,
        ],
      },
      {
        heading: 'What is on this site',
        body: [
          'We try to keep everything here accurate and current, but this is a marketing website. Prices shown are indicative ranges, not quotations. A quotation is a written scope with a fixed price and dates, issued to you and signed by both parties. Nothing on this website is an offer capable of acceptance.',
        ],
      },
      {
        heading: 'Our intellectual property',
        body: [
          'The content, design, code and brand assets on this site belong to us or our licensors. You may read and share it. You may not copy it wholesale to build a competing site, which — given the industry — is worth saying out loud.',
        ],
      },
      {
        heading: 'Your intellectual property in our work',
        body: [
          'When you engage us, work product created for you belongs to you from the moment it is created, as set out in the master services agreement. Not on delivery, and not on final payment.',
        ],
      },
      {
        heading: 'Third-party names and marks',
        body: [
          'Product names, logos and technology names referenced on this site belong to their respective owners. Referring to them describes what we work with and does not imply partnership, endorsement, certification or affiliation of any kind.',
        ],
      },
      {
        heading: 'Links to other sites',
        body: [
          'Where we link to another website, including our own products and our clients\' sites, we are not responsible for its content or its practices. Their terms and privacy policies apply there.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          '[TODO — attorney to draft. Standard limitation for a services business, drafted to be enforceable under Texas law and not to overreach against consumers.]',
        ],
      },
      {
        heading: 'Governing law',
        body: [
          `These terms are governed by the laws of the State of Texas, United States, and the courts of Texas have exclusive jurisdiction. [TODO — attorney to confirm the venue clause and any required consumer carve-outs for Canadian users.]`,
        ],
      },
    ],
  },

  {
    slug: 'cookies',
    title: 'Cookie Policy',
    description: 'What cookies this site sets, why, and how to control them.',
    updated: 'Pending legal review — this policy is not yet in force',
    sections: [
      {
        heading: 'The short version',
        body: [
          'This site works fully without any optional cookies. Nothing is set for analytics or advertising until you accept, and declining costs you nothing — every page and the contact form work either way.',
        ],
      },
      {
        heading: 'Strictly necessary',
        body: [
          'A small amount of local storage remembers your cookie choice so we do not ask again on every page. Our bot-protection provider may set a short-lived token when you submit a form. These cannot be switched off, because without them the site cannot function safely.',
        ],
      },
      {
        heading: 'Analytics — only with consent',
        body: [
          'If you accept, Google Analytics 4, operated by Google LLC (United States) sets cookies that tell us which pages people read and where they leave. We use this to fix the site, not to identify you.',
        ],
      },
      {
        heading: 'Advertising — only with consent',
        body: [
          'If you accept, Meta Platforms, Inc. and Google LLC (United States) sets cookies that let us see whether an ad led to an enquiry and stop showing ads to people who have already contacted us. This is measurement, not a profile we sell.',
        ],
      },
      {
        heading: 'Changing your mind',
        body: [
          'Clear this site\'s data in your browser and the consent banner will appear again on your next visit. You can also block cookies entirely in your browser settings; the site will still work.',
        ],
      },
      {
        heading: 'Consent mode',
        body: [
          'Before you choose, all analytics and advertising storage is set to denied by default. Tags load in that state and only receive consent if you grant it. This is implemented in the site code, not just described here.',
        ],
      },
    ],
  },
]

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.slug === slug)
}
