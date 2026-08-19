# DECISIONS.md

## 1. Why this approach over the obvious alternative?

The obvious alternative was a generic "AI dashboard" or chatbot landing
page — hero, three feature cards, testimonials, pricing. I rejected that
structure because the brief specifically grades on taste and on showing the
product, not describing it, and a chatbot/dashboard cliché doesn't give a
homepage anything distinctive to show. I picked model-drift observability
because it has a literal, honest visual: a waveform that can actually spike
when something goes wrong. That let the "product showcase" section be a real
interaction (pick a model, inject an anomaly, watch the drift score and
alert react) instead of a static screenshot standing in for one. It also
maps cleanly onto the AI/Technology Intern responsibilities — model
optimization, testing, automation — without forcing every AI buzzword onto
one page.

## 2. One trade-off made under the time limit, and what I'd do with a real week

**Trade-off:** the "live" data in the product panel is synthetic —
deterministic pseudo-random waveforms and hand-set drift numbers per demo
model, not a real streaming pipeline. That's disclosed directly on the page
("This panel runs on sample data — no live models are connected") rather
than hidden, per the challenge's honesty rule. Dark mode is also the only
mode; I decided a fully considered dark theme was worth more than a rushed
light/dark toggle, given the brief explicitly penalizes a half-finished
toggle more than having no toggle at all.

**With a real week**, I'd build an actual ingestion path: a small SDK that
logs prediction/feature pairs from a real (even toy) model, a lightweight
service computing population-stability-index or KL-divergence between
training and live distributions, and would swap the deterministic waveform
generator for a chart driven by that real output. I'd also add a proper
alerting integration (email/Slack webhook) instead of the client-side toggle
that currently stands in for "an alert fires."

## 3. Where AI tools were used, and what I personally verified or changed afterward

I used Claude to scaffold the React/Vite/Tailwind/Framer Motion project,
generate the component structure, and draft the initial copy and visual
token system (colors, type pairing, the waveform-as-signature-element idea).
I verified the production build compiles cleanly (`npm run build`, zero
TypeScript errors), checked that every custom Tailwind v4 theme color
(`bg-ink-raised`, `text-fog`, `bg-signal`, etc.) actually compiled to real
CSS rules rather than silently failing to apply, and read through each
component to confirm I could explain every prop, animation, and state
transition line-by-line in a follow-up call. I also rewrote or cut copy that
read as generic marketing language ("Revolutionize your AI stack") in favor
of statements specific to what the product actually does.
