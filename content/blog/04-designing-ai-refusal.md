---
title: "Designing what an AI must refuse to answer"
slug: designing-ai-refusal
description: "The part of the build that took longest on QuranRI, and why it matters more than the model."
draft: false
---

Anyone can wire a chat box to a model. That's an afternoon of work with today's tools. What took eight months on QuranRI wasn't the answering — it was the refusing. This is the part of an AI build that almost never makes it into a vendor's pitch deck, because it's not a feature you can screenshot. It's a boundary, and boundaries are only visible when they hold.

## Why refusal is the hard problem, not the model

A language model, left to its own defaults, will attempt to answer almost anything you ask it, confidently, fluently, and sometimes wrong. That's fine for a lot of use cases. It is not fine when the subject is a child's education in a religious text, where "confidently wrong" isn't a bad support ticket, it's a real harm to someone who trusted the answer.

The actual engineering challenge isn't "make the AI smart enough to answer correctly." It's "make the AI know, reliably, which questions it should not attempt to answer at all, and hand those to a human instead."

## What QuranRI will not do, by design

QuranRI does not issue legal, medical, psychological, financial or religious rulings; that boundary is published in its terms of service, in writing. In practice, this means a student can ask "what does this verse say about justice?" and get a sourced answer, but asking "is what I'm doing halal?" triggers a refusal. The system explains what different scholarly positions say where its sources cover them, but it does not issue a ruling. The line between "explaining" and "ruling" is the single hardest boundary to draw, because the same underlying request for a ruling can be phrased dozens of ways.

This isn't a single keyword filter. A keyword filter catches "what is the ruling on X" but misses "so if I did X, would that be wrong", the same underlying request for a ruling, asked differently. The real challenge is intent classification: understanding what a person is actually asking for, not just pattern-matching on the words they used. That requires thinking about the shape of the request — is this asking for information, or is it asking for a judgment? — and building classification that holds up across the many ways a real person phrases the same underlying question. Keyword matching is a starting point; reliable intent detection is the actual engineering work.

## Retrieval with a source, not memory

The other half of the trust problem: even for questions QuranRI *does* answer, the answer has to be traceable. Every response is built from an indexed source corpus with the specific reference attached, not generated from the model's general training knowledge, which can be subtly wrong or entirely fabricated in ways that sound just as confident as a correct answer.

This matters because a wrong answer that comes with a citation is checkable. A wrong answer that sounds authoritative and has no source is just as convincing and impossible to verify. The citation isn't a nice-to-have UI element, it's the actual safety mechanism. If the system can't point to where an answer came from, it shouldn't be answering.

## The handoff to a human

When a student is ready (assessed through placement testing and qualified for one-to-one instruction), the system hands them to a human teacher at VIqra. The handoff is a structured signal: the system has identified that this person has reached the point where a human teacher is the right next step, and that context needs to travel with them, not as a cold "contact us" redirect, but as a warm introduction where the teacher already knows what the student has been working on and why they're ready for the next stage.

The handoff exists because refusal alone isn't a complete answer to "I don't know": a system that just says "I can't help with that" and stops has failed the person who asked, even if it avoided giving a wrong answer. The refusal has to lead somewhere.

## Why this took longer than the answering

Building a system that answers well is, at this point, a largely solved engineering problem: good retrieval, a capable model, decent prompt design gets you most of the way there quickly. Building a system that knows the shape of its own limits, reliably, across the many ways a real person might phrase a question that crosses that line — that's the part that doesn't have a library you can import. It has to be designed, tested against real edge cases, and audited, specifically for the population using it.

The testing work is iterative and never truly finished. You build a refusal rule, then you try to phrase the same request five different ways and see if the rule holds on all of them. You find the cases where a legitimate educational question gets caught by a refusal that was designed for a ruling request, and you tune the boundary. You find the cases where a ruling request slips through because it was phrased as a hypothetical, and you tighten it. Each cycle surfaces edge cases the previous design didn't account for, and for a system serving children in a sensitive domain, that cycle has to be thorough, not fast.

## Why this is the actual product

Anyone can build the version of QuranRI that answers questions. What makes it something a religious education institution could actually put in front of children is the version that knows what not to answer, and says so, every time, without exception. That refusal boundary, written down, tested, and audited for PIPEDA, GDPR and COPPA expectations rather than retrofitted after the fact, is the actual deliverable. The chat interface is just how you reach it.

If you're building an AI assistant for a domain where a wrong answer has real consequences (healthcare information, financial guidance, anything involving minors), the refusal design is where your build time should go first, not last.
