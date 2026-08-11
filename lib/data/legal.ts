import { SITE } from '../site'

/**
 * Privacy Policy, Terms of Service and Cookie Policy.
 *
 * Reviewed and approved by a licensed US attorney, in force as of August 7,
 * 2026. Material changes to any of these documents need legal re-review
 * before they ship, and the `updated` string must change with them.
 *
 * Context the review covered, so future editors know the shape of the problem:
 * the contact form collects personal data, the site runs a Meta Pixel and
 * GA4, it serves users in the US and Canada, and the entity is a Texas LLC.
 * That combination engages state privacy law (CCPA/CPRA and the newer state
 * acts), Canadian PIPEDA, and the FTC's rules on endorsements and
 * testimonials.
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
    updated: 'August 7, 2026',
    sections: [
      {
        heading: 'Who we are',
        body: [
          `${ENTITY} is ${SITE.jurisdiction}, and we serve clients across the ${SITE.markets.join(' and ')}. Some of the people and service providers who deliver our work operate outside the United States and Canada, so personal information you give us may be accessed from outside those countries. We say this plainly because you are entitled to know it before you fill in a form.`,
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
          'We do not sell personal information, and we do not share it for cross-context behavioral advertising as those terms are defined under California law.',
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
          'Depending on where you live, you may have some or all of the following rights. We honor them for everyone regardless of location, because operating two standards is harder than operating one.',
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
          `Personal information collected through this site may be accessed by our team and our service providers from outside the United States and Canada. Where required, transfers are made under appropriate safeguards.`,
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

  /* ==========================================================================
   * TERMS OF SERVICE — reviewed and approved by a licensed US attorney,
   * in force as of August 7, 2026. The first section states that plainly.
   * Material changes need legal re-review before they ship.
   *
   * The numbers in clauses 2, 3 and 6 (net terms, late fee, review window,
   * revision rounds, dispute period) were confirmed in that review as
   * ordinary market defaults.
   *
   * WHY EVERY CLAUSE READS THE WAY IT DOES: the practical purpose of this
   * document is to answer a billing dispute or a chargeback representment with
   * documents rather than assertions. So each clause names the artifact it
   * creates — a written approval, a delivery record, an acceptance — and
   * clause 7 lists what is retained. A term that generates no record is a term
   * that cannot be proved.
   * ======================================================================= */
  {
    slug: 'terms',
    title: 'Terms of Service',
    description:
      'The terms governing LabTechCrew engagements: phased scope and approval, staged payment, acceptance, IP transfer on final payment, refunds, billing disputes and Texas governing law.',
    /* Renders after the words "Last updated", so it has to read as a phrase. */
    updated: 'August 7, 2026',
    sections: [
      {
        heading: 'This document is in force',
        body: [
          'These terms have been reviewed and approved by a licensed US attorney and are in force as of August 7, 2026. They set the default position on which we engage.',
          'We publish them in full on purpose. A buyer deciding whether to send us money is better served by seeing the exact terms we operate under before any commitment is made, and a fuller document lets you check every clause rather than take our summary on trust.',
          `Where you engage us, the work is governed by the master services agreement and the statement of work you sign, and where a signed document differs from this page, the signed document controls. Questions about any of it: ${SITE.contact.email}.`,
        ],
      },
      {
        heading: 'In plain English — a summary, not the contract',
        body: [
          'This summary exists because dense legal text on a first visit is a wall rather than information. It is a good-faith paraphrase written for speed of reading. It has no legal effect: where it differs from the clauses below, or from an agreement you have signed, those control and this does not.',
        ],
        bullets: [
          'We work in phases. Each phase gets its own written scope and its own price, and nothing starts until you approve that in writing.',
          'You pay an advance to commence. After that, each phase is invoiced when it is finished — not up front.',
          'Every phase comes to you for review inside a defined window. Approving it means you accept that deliverable, and that is what makes it invoiceable.',
          'Two rounds of revisions per phase are included, inside the scope you approved. Anything outside it is a change order with its own price.',
          'You own the source code and the IP in full once final payment clears. Until then you hold a license to use and evaluate what has been delivered, and we hold title.',
          'The tools and libraries we already owned before your project stay ours — you get a permanent license to use them inside your deliverable.',
          'Work already delivered and accepted is not refundable. A phase you have paid for but we have not started is refundable in full.',
          'If a bill looks wrong, tell us in writing first and give us a short window to fix it before going to your card issuer. We keep the approvals, deliveries and acceptances on file, so most billing questions are answered by opening the file rather than by arguing.',
          'Confidentiality is mutual and we will sign an NDA before the first call.',
          'Either of us can end the engagement at the end of any phase, without penalty.',
          'Texas law, Texas courts, invoiced in USD.',
        ],
      },
      {
        heading: 'Who these terms are between',
        body: [
          `These terms are between you (the "Client") and ${ENTITY}, ${SITE.jurisdiction}. They govern your use of labtechcrew.com and, where you engage us for services, they set the framework for that engagement.`,
          'Each engagement is documented in a master services agreement ("MSA") and a statement of work ("SOW") for each phase. Where a signed MSA or SOW differs from this page, the signed document controls. This page is the default position, not the deal.',
          `We sell to businesses across the ${SITE.markets.join(' and ')}. These terms are written for business clients rather than consumers.`,
        ],
      },

      /* ---- The engagement ------------------------------------------------ */
      {
        heading: '1. Scope and phases',
        body: [
          'Work is performed in phases. Each phase is separately scoped, separately quoted and separately approved. A typical engagement runs discovery and scoping, UI/UX design, frontend build, backend build, then QA and launch — but the phases that apply to you are the ones named in your SOW.',
          'No phase begins until you have approved that phase\'s scope and price in writing. "In writing" includes email and electronic signature. A verbal go-ahead is not an approval and we will not start work on one, which protects you as much as us.',
          'Anything not described in the approved scope is out of scope. Where you want it added, we issue a written change order stating the additional price and any effect on the dates, and that change order needs the same written approval before the work starts.',
          'Each approval is retained as a dated record. If a question later arises about what was agreed and what it cost, the answer is a document rather than a recollection.',
        ],
      },
      {
        heading: '2. Payment',
        body: [
          'An advance is payable before work commences, in the amount stated in your SOW. We do not schedule or begin a phase before it clears.',
          'Each phase after that is invoiced on its completion — once it has been delivered for review and accepted under clause 3. Approving a phase constitutes your acceptance of that deliverable and authorizes the invoice for it.',
          'Invoices are payable within 14 days of the invoice date, in USD.',
          'Payment methods are those listed on our pricing page. Invoices above $10,000 are payable by ACH or wire transfer, because card processing fees at that size come out of the project budget.',
          'Overdue amounts carry a late fee of 1.5% per month, or the maximum rate permitted by applicable law if that is lower.',
          'If an invoice is more than 10 business days overdue we may pause work on written notice, and resume when the account is current. A pause moves the remaining dates in the SOW by at least its own length, because the people booked for your phase will have been booked elsewhere in the meantime.',
          'Fees exclude taxes and third-party costs — hosting, model usage, domains, app store fees, licensed fonts or stock. Those are either billed to accounts in your own name or passed through at cost with the receipt attached.',
        ],
      },
      {
        heading: '3. Acceptance, review windows and revisions',
        body: [
          'Each phase is delivered for your review together with a written statement of what was built and where to see it. The review window is 5 business days from delivery unless your SOW states otherwise.',
          'Inside that window you may either accept the phase in writing, or send us one consolidated list of items that fall within the approved scope and are not yet met. We correct those at no charge.',
          'Two rounds of revisions per phase are included, provided they are inside the approved scope. Further rounds, and anything outside the scope, are quoted as a change order under clause 1.',
          'If the window lapses with no written response, we send one written reminder. If a further 5 business days pass with no response, the phase is deemed accepted and becomes invoiceable. This is not a trap: an un-reviewed phase blocks every phase behind it and the people booked for them, and the reminder exists so that deemed acceptance can never be a surprise.',
          'The delivery, the reminder and the acceptance are each retained with their dates, which is what makes "you approved this" a matter of record rather than of memory.',
        ],
      },
      {
        heading: '4. Intellectual property',
        body: [
          'We retain title to the work product until we receive final payment for the engagement in cleared funds. On receipt, full ownership of the source code, designs and other deliverables created specifically for you transfers to you, and we will confirm that transfer in writing on request.',
          'Until that point you hold a non-exclusive, non-transferable license to use, review and evaluate the delivered work. That license does not extend to production use, sublicensing, or having a third party develop the work further.',
          'Our pre-existing intellectual property — tools, libraries, frameworks, internal components, methods and know-how that we owned or developed before, or independently of, your engagement — remains ours. Where a deliverable includes any of it, you receive a perpetual, worldwide, non-exclusive, royalty-free license to use it as part of that deliverable. You do not receive ownership of it, and no agency can honestly offer otherwise: the same internal library cannot be assigned outright to every client.',
          'Third-party and open-source components remain under their own licenses. We will tell you which ones your build depends on and what those licenses require of you.',
          'Accounts opened in your name — repositories, cloud, domains, App Store Connect, Google Play — are yours throughout the engagement, independently of this clause and of anything owing.',
        ],
      },
      {
        heading: '5. Refunds',
        body: [
          'The advance is refundable in full if we have not commenced work. Once work has commenced it is applied against the first phase and is not refundable.',
          'Fees for a phase that has been delivered and accepted — including deemed acceptance under clause 3 — are not refundable. You hold the deliverable and the record of your approval of it.',
          'Fees for a phase that has been paid for but not started are refundable in full.',
          'If the engagement ends mid-phase under clause 12, we invoice for the work performed to that point, refund the balance, and issue a written statement of what was done and what it cost.',
          'Nothing in this clause limits a refund we are required by law to give, or any remedy you have for a failure on our side.',
        ],
      },
      {
        heading: '6. Billing disputes and card chargebacks',
        body: [
          'If you believe an invoice is wrong, tell us in writing within 10 business days of the invoice date, identifying the item disputed and why. We will respond within 5 business days and work to resolve it within 15 business days of your notice.',
          'You agree to use that process, or to let those 15 business days pass, before initiating a chargeback or card dispute. Almost every billing dispute in this business is a disagreement about scope, and a chargeback raised without notice costs both sides fees and weeks over something a phone call resolves.',
          'This clause does not, and cannot, waive any right you have under law or under your card issuer\'s rules. It is an agreement about the order of operations, not a bar on your remedies.',
          'Undisputed amounts on a disputed invoice remain payable when due.',
          'Where a dispute is escalated, we respond with the record described in clause 7 — the approved scope, the price you approved, the delivery, and your acceptance — in date order.',
        ],
      },
      {
        heading: '7. The records we keep',
        body: [
          'For each engagement we retain the signed MSA and every SOW; every written approval of a scope and a price; every change order; delivery records including staging URLs, release notes and the written statement issued with each phase; every acceptance and every deemed-acceptance reminder; every invoice and payment record; and the correspondence in which the work was agreed.',
          'We keep them for a straightforward reason. A billing question is answered by producing the approval, the delivery and the acceptance, rather than by two parties describing the same six weeks differently. That is as much your protection as ours: the same file that evidences our invoice evidences what we committed to build.',
          'These records are handled under clause 9 and under our Privacy Policy, and are retained for the periods stated in that policy.',
        ],
      },
      {
        heading: '8. What we need from you',
        body: [
          'The dates in a SOW assume the things below. Where they are late, dates move — and we will tell you in writing what moved and by how much at the time, not at the end.',
        ],
        bullets: [
          'Written feedback inside the review windows in clause 3.',
          'Access we need to do the work: accounts, environments, credentials, APIs and test data.',
          'One named person with authority to approve, and consolidated feedback from that person. Conflicting instructions from several people is the most common cause of a phase running over.',
          'Content you are supplying — copy, images, product data, logos — by the dates in the SOW, and with the rights to use it. You confirm that anything you give us is yours to give, and that our using it as directed will not infringe anyone else\'s rights.',
          'Where a delay on your side leaves a booked team idle for more than 10 business days, we may re-quote the remaining phases.',
        ],
      },
      {
        heading: '9. Confidentiality',
        body: [
          'Each of us will keep the other\'s confidential information confidential, use it only for the engagement, and disclose it only to people who need it for the work and are under equivalent obligations.',
          'This is mutual and it is not conditional on the size of the project. We will sign your NDA, or send ours, before the first call.',
          'It does not cover information that is already public, was already known to the receiving party, is independently developed without reference to the disclosure, or must be disclosed by law — and in that last case we will tell you first wherever we are permitted to.',
          'Confidentiality survives the engagement with no expiry date.',
        ],
      },
      {
        heading: '10. Warranties, and what we do not warrant',
        body: [
          'We warrant that we will perform the services with reasonable skill and care; that for 30 days after acceptance the deliverables will materially conform to the approved scope; and that we have the right to grant what clause 4 grants.',
          'A defect reported inside that 30-day window is fixed at no charge. A defect means a failure to meet the approved scope. A change of mind about the scope is not a defect — it is a change order, and we will say which one we think it is in writing rather than absorbing the difference silently.',
          'We do not warrant that software will be uninterrupted or error-free, that third-party services will stay available or keep their current pricing, or any particular commercial outcome — traffic, rankings, conversions or revenue. Those depend on your market and your operations as much as on the build.',
        ],
      },
      {
        heading: '11. Limitation of liability',
        body: [
          'To the maximum extent permitted by law, neither party is liable to the other for indirect, incidental, special, punitive or consequential loss, or for loss of profit, revenue, data, business or goodwill, however arising.',
          'Our total aggregate liability arising out of or relating to an engagement is limited to the total fees actually paid by you under the SOW giving rise to the claim.',
          'These limits do not apply to fraud, wilful misconduct, or any liability that cannot be limited or excluded by law.',
        ],
      },
      {
        heading: '12. Termination',
        body: [
          'Either party may end the engagement at the end of any phase, on written notice, without cause and without penalty. That exit is deliberate and it is stated on our site: a client who cannot leave is a client who stops telling you the truth about the work.',
          'Either party may terminate immediately, on written notice, for a material breach that is not cured within 15 business days of written notice of it. Non-payment is a material breach.',
          'On termination you pay for work performed and accepted to that point, and we deliver what has been paid for. Where that payment is the final payment of the engagement, ownership transfers under clause 4 exactly as it would at a planned completion, and handover includes the code, designs, documents and accounts.',
          'Clauses 4, 7, 9, 11, 13 and 14 survive termination.',
        ],
      },
      {
        heading: '13. Governing law and venue',
        body: [
          'These terms, and any engagement under them, are governed by the laws of the State of Texas, United States, without regard to its conflict-of-laws rules. The state and federal courts located in Texas have exclusive jurisdiction, and both parties consent to that venue.',
          'The United Nations Convention on Contracts for the International Sale of Goods does not apply.',
        ],
      },
      {
        heading: '14. Changes, notices and general',
        body: [
          'We may update the website terms below; the version in force is the one published on this page on the date you use the site. The terms of a signed MSA or SOW change only by written agreement between both parties.',
          `Notices under an engagement are given in writing to ${SITE.contact.email} and to the address published on this site, and to the contacts named in your SOW.`,
          'If any clause is held unenforceable, the rest stands. A failure to enforce a term is not a waiver of it. Neither party may assign an engagement without the other\'s written consent, except to a successor of substantially the whole of its business.',
          'The MSA, the SOWs and these terms are the entire agreement between us on their subject matter, and supersede earlier proposals and discussions.',
        ],
      },

      /* ---- Website-only terms -------------------------------------------- */
      {
        heading: 'Website terms — what is on this site',
        body: [
          'We try to keep everything here accurate and current, but this is a marketing website. Prices shown are indicative ranges, published so you can decide whether we are in your range before spending an afternoon on a call. They are not quotations.',
          'A quotation is a written scope with a fixed price and dates, issued to you and signed by both parties. Nothing on this website is an offer capable of acceptance, and no contract is formed by browsing the site or submitting the contact form.',
        ],
      },
      {
        heading: 'Website terms — our intellectual property',
        body: [
          'The content, design, code and brand assets on this site belong to us or our licensors. You may read and share it. You may not copy it wholesale to build a competing site, which — given the industry — is worth saying out loud.',
        ],
      },
      {
        heading: 'Website terms — third-party names, marks and links',
        body: [
          'Product names, logos and technology names referenced on this site belong to their respective owners. Referring to them describes what we work with and does not imply partnership, endorsement, certification or affiliation of any kind.',
          'Where we link to another website, including our own products and our clients\' sites, we are not responsible for its content or its practices. Their terms and privacy policies apply there.',
        ],
      },
    ],
  },

  {
    slug: 'cookies',
    title: 'Cookie Policy',
    description: 'What cookies this site sets, why, and how to control them.',
    updated: 'August 7, 2026',
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
