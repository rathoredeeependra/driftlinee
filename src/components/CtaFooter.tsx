import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import DriftWave from './DriftWave'

export default function CtaFooter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section id="start" className="px-5 sm:px-8 py-24 sm:py-32 border-t border-line relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 opacity-30 pointer-events-none">
        <DriftWave width={1200} height={160} seed={17} />
      </div>

      <div className="mx-auto max-w-2xl text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-semibold text-3xl sm:text-5xl tracking-tight mb-5"
        >
          Know before your metrics do.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-fog text-lg mb-8"
        >
          Leave your email and we'll reach out to talk about your model
          stack — this is a real form, not a spinner that goes nowhere.
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mono text-sm text-signal border border-signal/30 bg-signal/10 rounded-full px-6 py-3 inline-block"
          >
            got it — we'll be in touch at {email}
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="focus-ring flex-1 rounded-full bg-ink-raised border border-line px-5 py-3 text-sm placeholder:text-fog/70"
            />
            <button
              type="submit"
              className="focus-ring shrink-0 rounded-full bg-signal text-ink font-medium px-6 py-3 hover:brightness-110 transition"
            >
              Request access
            </button>
          </motion.form>
        )}
      </div>

      <div className="mx-auto max-w-6xl mt-24 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-fog">
        <span>driftline — a project concept, built for a frontend challenge.</span>
        <span className="mono opacity-40 select-none">↑ ↑ ↓ ↓ ← → ← → b a</span>
      </div>
    </section>
  )
}
