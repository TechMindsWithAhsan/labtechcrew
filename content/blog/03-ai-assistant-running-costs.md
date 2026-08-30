---
title: "What it actually costs to run an AI assistant"
slug: ai-assistant-running-costs
description: "Per-conversation economics with real figures, not a vendor pricing page."
draft: false
---

# What it actually costs to run an AI assistant

Every AI vendor's pricing page tells you what the API costs per million tokens. Almost none of them tell you what that means for an actual business — what a real conversation costs, what a month of real usage costs, and where the money quietly goes that nobody budgets for. Here's the real breakdown, based on what we've actually built and run.

## The token math, in plain terms

AI models charge per "token" — roughly ¾ of a word. You pay separately for tokens going in (your prompt, plus any context/documents the assistant reads) and tokens coming out (the response).

A cheap, capable model runs roughly $0.10–$0.40 per million input tokens and $0.40–$1.60 per million output tokens. A more capable model can run 5–10x that. For most business chatbot use cases — answering questions, qualifying leads — the cheap tier is enough; you don't need your top-tier flagship model to answer "what are your hours."

## What a single conversation actually costs

The numbers in this section are an illustrative walkthrough — we're using example volumes and current public API list prices to show how the math works, not our own production figures. The point is the method, not the specific dollar amount.

Say a typical support or lead-qualification exchange runs a few hundred tokens each way — a user message, a system prompt, some retrieved context, and a response. Doing the math on those rough counts at public API rates:

- Average input per exchange (system prompt + context + user message): a few hundred tokens
- Average output per exchange: a few hundred tokens
- Cost per exchange: a small fraction of a cent

Multiply that by a handful of exchanges in a conversation, and a full conversation costs fractions of a penny on a cost-efficient model. That's the number vendors don't put on their pricing page, because it depends entirely on how much context you're feeding the model — which is a design decision, not a fixed cost.

## Where the real cost hides

The token price is the visible cost. Here's what actually drives the bill up or down in a real deployment:

**Context size.** A RAG system (like the one behind QuranRI) retrieves relevant source documents before answering. The more context retrieved per query, the more input tokens you pay for — every time, on every conversation. Smart retrieval (pulling only the most relevant few paragraphs, not entire documents) is a meaningful cost lever, not just an accuracy one.

**Conversation length.** Multi-turn conversations resend the prior conversation history as context on every new message, unless you're managing that carefully. A 10-message conversation isn't 10x the cost of a 1-message one — it's closer to 50x, because each new message re-sends everything before it.

**Caching.** Most providers now offer prompt caching — a steep discount (up to 90%) on input tokens that are identical across requests, like a system prompt or a document that doesn't change. Structuring your prompts so the stable parts come first and get cached is one of the highest-leverage cost optimizations available, and most teams don't do it.

**Evaluation and monitoring.** Running an assistant well means periodically testing it against a set of known questions to catch drift or bad answers — this is its own token cost, separate from live traffic, and it's easy to forget when budgeting.

## What this means for your budget

For a small business chatbot handling a few hundred conversations a month, the math on public API rates works out to modest monthly costs — not the thousands a vendor's enterprise pricing tier might suggest. The number scales with usage, not with a flat subscription, which means a slow month costs you almost nothing and a viral month costs you proportionally more, not a surprise overage fee.

The bigger cost, in our experience, isn't the API bill — it's the engineering time to design retrieval and context properly so you're not paying to re-send the same documents on every message. That's a one-time cost with a permanent payoff, and it's the part most off-the-shelf chatbot tools don't let you touch at all.
