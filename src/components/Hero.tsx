import { motion } from 'framer-motion'
import DriftWave from './DriftWave'

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 sm:pt-40 pb-20 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mono text-xs tracking-[0.2em] text-signal uppercase mb-6 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-signal inline-block" />
          Model observability, live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display font-semibold leading-[1.05] tracking-tight text-[2.6rem] sm:text-6xl lg:text-7xl max-w-4xl"
        >
          See the moment your model
          <br className="hidden sm:block" />
          starts <span className="text-signal">lying</span> to you.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-7 text-lg sm:text-xl text-fog max-w-xl leading-relaxed"
        >
          Driftline watches your production model's predictions and input
          data in real time, and flags the exact moment they drift from what
          it learned in training — before it shows up in your business
          metrics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#start"
            className="px-6 py-3 rounded-full bg-signal text-ink font-medium hover:brightness-110 transition focus-ring"
          >
            Get early access
          </a>
          <a
            href="#product"
            className="px-6 py-3 rounded-full border border-line text-paper hover:border-signal/60 transition focus-ring"
          >
            See it watch a model drift
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-16 rounded-2xl border border-line bg-ink-raised/60 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="mono text-xs text-fog uppercase tracking-widest">
              live · prediction distribution · checkout-fraud-v3
            </span>
            <span className="mono text-xs text-amber flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber inline-block" />
              drift detected 04:12 UTC
            </span>
          </div>
          <DriftWave width={1000} height={140} spike seed={3} />
        </motion.div>
      </div>
    </section>
  )
}
