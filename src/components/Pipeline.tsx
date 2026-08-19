import { motion } from 'framer-motion'

const STEPS = [
  {
    label: 'Ingest',
    title: 'Predictions and inputs stream in',
    body: 'A lightweight SDK or webhook logs every prediction your model makes, plus the input features behind it — no changes to your inference code.',
  },
  {
    label: 'Compare',
    title: 'Compared against training-time distributions',
    body: "Driftline keeps a statistical fingerprint of the data your model was trained on, and continuously measures how far live traffic has moved from it.",
  },
  {
    label: 'Explain',
    title: 'You get the why, not just the alert',
    body: 'When drift crosses your threshold, Driftline points to the specific features driving it — so the fix starts in minutes, not after a support queue.',
  },
]

export default function Pipeline() {
  return (
    <section id="pipeline" className="px-5 sm:px-8 py-24 sm:py-32 border-t border-line">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl mb-16">
          <p className="mono text-xs tracking-[0.2em] text-signal uppercase mb-4">How it works</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
            Three steps between "it works on my laptop" and knowing it still works today.
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-line" />
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative"
              >
                <div className="relative z-10 w-3 h-3 rounded-full bg-signal mb-6 ring-4 ring-ink" />
                <p className="mono text-xs text-fog uppercase tracking-widest mb-2">{step.label}</p>
                <h3 className="font-display text-xl mb-2.5">{step.title}</h3>
                <p className="text-fog leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
