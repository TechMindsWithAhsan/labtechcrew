---
title: "Designing what an AI must refuse to answer"
slug: designing-ai-refusal
description: "The part of the build that took longest on QuranRI, and why it matters more than the model."
---

# Designing what an AI must refuse to answer

Anyone can wire a chat box to a model. That's an afternoon of work with today's tools. What took eight months on QuranRI wasn't the answering — it was the refusing. This is the part of an AI build that almost never makes it into a vendor's pitch deck, because it's not a feature you can screenshot. It's a boundary, and boundaries are only visible when they hold.

## Why refusal is the hard problem, not the model

A language model, left to its own defaults, will attempt to answer almost anything you ask it — confidently, fluently, and sometimes wrong. That's fine for a lot of use cases. It is not fine when the subject is a child's education in a religious text, where "confidently wrong" isn't a bad support ticket, it's a real harm to someone who trusted the answer.

The actual engineering challenge isn't "make the AI smart enough to answer correctly." It's "make the AI know, reliably, which questions it should not attempt to answer at all — and hand those to a human instead."

## What QuranRI will not do, by design

[Fill in real specifics here if you can share them without exposing anything sensitive: what are the actual categories of refusal? Your homepage already states it refuses to issue legal, medical, financial or religious rulings — expand on what that looks like in practice. For example: does it decline to issue a fatwa-style ruling but still explain what different scholarly positions say? Where exactly is the line between "explaining" and "ruling"?]

This isn't a single keyword filter. A keyword filter catches "what is the ruling on X" but misses "so if I did X, would that be wrong" — the same underlying request for a ruling, asked differently. [If you built something more sophisticated than keyword matching — e.g., classifying the *intent* of a question regardless of phrasing — explain that approach here, at whatever level of detail you're comfortable sharing.]

## Retrieval with a source, not memory

The other half of the trust problem: even for questions QuranRI *does* answer, the answer has to be traceable. Every response is built from an indexed source corpus with the specific reference attached — not generated from the model's general training knowledge, which can be subtly wrong or entirely fabricated in ways that sound just as confident as a correct answer.

This matters because a wrong answer that comes with a citation is checkable. A wrong answer that sounds authoritative and has no source is just as convincing and impossible to verify. The citation isn't a nice-to-have UI element — it's the actual safety mechanism. If the system can't point to where an answer came from, it shouldn't be answering.

## The handoff to a human

[Fill in: what actually triggers the handoff to a human teacher? Is it purely the refusal categories above, or are there other signals — a student expressing distress, a question repeated multiple times suggesting confusion, an edge case the system isn't confident about? Describe the actual handoff mechanism — is it a flag to a teacher dashboard, a direct message, something else?]

The handoff exists because refusal alone isn't a complete answer to "I don't know" — a system that just says "I can't help with that" and stops has failed the person who asked, even if it avoided giving a wrong answer. The refusal has to lead somewhere.

## Why this took longer than the answering

Building a system that answers well is, at this point, a largely solved engineering problem — good retrieval, a capable model, decent prompt design gets you most of the way there quickly. Building a system that knows the shape of its own limits, reliably, across the many ways a real person might phrase a question that crosses that line — that's the part that doesn't have a library you can import. It has to be designed, tested against real edge cases, and audited, specifically for the population using it.

[If you have any specific numbers here — how many test cases you ran the refusal logic against, how many iterations it took, any specific failure mode you caught and fixed during testing — this is exactly the kind of concrete detail that makes this post credible instead of just a well-written opinion piece.]

## Why this is the actual product

Anyone can build the version of QuranRI that answers questions. What makes it something a religious education institution could actually put in front of children is the version that knows what not to answer, and says so, every time, without exception. That refusal boundary — written down, tested, and audited for PIPEDA, GDPR and COPPA expectations rather than retrofitted after the fact — is the actual deliverable. The chat interface is just how you reach it.

If you're building an AI assistant for a domain where a wrong answer has real consequences — healthcare information, financial guidance, anything involving minors — the refusal design is where your build time should go first, not last.

---

*[NOTE FOR AHSAN: This one leans most heavily on real specifics you have direct knowledge of from building QuranRI. The bracketed sections are where your actual design decisions go — even a few real specifics here will make this the most distinctive post of the four, since "how we built a refusal system" isn't something most competitors can write about honestly at all.]*
