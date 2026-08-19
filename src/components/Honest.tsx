import { motion } from 'framer-motion'

export default function Honest() {
  return (
    <section id="honest" className="px-5 sm:px-8 py-24 sm:py-32 border-t border-line">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mono text-xs tracking-[0.2em] text-signal uppercase mb-4">Where we're at</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight mb-5">
            Driftline is pre-launch. Here's exactly what that means.
          </h2>
          <p className="text-fog text-lg leading-relaxed">
            We're not going to invent customer logos or a user count to look
            further along than we are. Everything above this line is a real,
            working interaction — built on sample data, clearly labeled as
            such. What's below is the honest state of the project.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-line bg-ink-raised/60 p-6 sm:p-8 space-y-5"
        >
          <div className="flex items-start gap-3">
            <span className="mono text-xs text-signal mt-1">01</span>
            <p className="text-paper/90 leading-relaxed">
              Core drift-detection logic works against sample and synthetic
              data today. Live SDK ingestion is in development.
            </p>
          </div>
          <div className="h-px bg-line" />
          <div className="flex items-start gap-3">
            <span className="mono text-xs text-signal mt-1">02</span>
            <p className="text-paper/90 leading-relaxed">
              No customers yet — you'd be evaluating this alongside our
              earliest design partners, not joining a waitlist behind
              thousands of people.
            </p>
          </div>
          <div className="h-px bg-line" />
          <div className="flex items-start gap-3">
            <span className="mono text-xs text-signal mt-1">03</span>
            <p className="text-paper/90 leading-relaxed">
              Early access means a real conversation about your model stack
              first — not an instant account.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
