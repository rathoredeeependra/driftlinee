import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DriftWave from './DriftWave'

interface Model {
  id: string
  name: string
  baseline: number
  seed: number
  features: { name: string; drift: number }[]
}

const MODELS: Model[] = [
  {
    id: 'fraud',
    name: 'checkout-fraud-v3',
    baseline: 4,
    seed: 3,
    features: [
      { name: 'transaction_amount', drift: 12 },
      { name: 'device_fingerprint', drift: 41 },
      { name: 'time_since_last_order', drift: 8 },
    ],
  },
  {
    id: 'churn',
    name: 'churn-predictor-v2',
    baseline: 2,
    seed: 11,
    features: [
      { name: 'session_frequency', drift: 6 },
      { name: 'support_tickets', drift: 9 },
      { name: 'plan_tier', drift: 3 },
    ],
  },
  {
    id: 'pricing',
    name: 'pricing-engine-v1',
    baseline: 3,
    seed: 21,
    features: [
      { name: 'competitor_price', drift: 18 },
      { name: 'demand_index', drift: 7 },
      { name: 'inventory_level', drift: 5 },
    ],
  },
]

function GaugeRing({ value }: { value: number }) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(value, 100) / 100
  const isAlert = value >= 25

  return (
    <div className="relative w-28 h-28 shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={radius} stroke="var(--color-line)" strokeWidth="7" fill="none" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          stroke={isAlert ? 'var(--color-amber)' : 'var(--color-signal)'}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="mono text-xl font-medium">{value}%</span>
        <span className="mono text-[10px] text-fog">drift score</span>
      </div>
    </div>
  )
}

export default function ModelHealthPanel() {
  const [activeId, setActiveId] = useState(MODELS[0].id)
  const [anomaly, setAnomaly] = useState(false)
  const active = MODELS.find((m) => m.id === activeId)!
  const score = anomaly ? Math.min(active.baseline + 34, 96) : active.baseline

  function selectModel(id: string) {
    setActiveId(id)
    setAnomaly(false)
  }

  return (
    <section id="product" className="px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl mb-12">
          <p className="mono text-xs tracking-[0.2em] text-signal uppercase mb-4">Model health</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
            One panel, every model that's live in production.
          </h2>
          <p className="mt-4 text-fog text-lg leading-relaxed">
            Pick a model below, then inject a synthetic anomaly to see how
            Driftline's drift score and alerting react. This panel runs on
            sample data — no live models are connected.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-ink-raised/60 overflow-hidden">
          <div className="grid lg:grid-cols-[240px_1fr]">
            {/* Model list */}
            <div className="border-b lg:border-b-0 lg:border-r border-line p-3 flex lg:flex-col gap-1.5 overflow-x-auto">
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => selectModel(m.id)}
                  className={`focus-ring shrink-0 text-left rounded-lg px-4 py-3 mono text-sm transition-colors whitespace-nowrap lg:whitespace-normal ${
                    activeId === m.id
                      ? 'bg-signal/10 text-signal border border-signal/30'
                      : 'text-fog hover:text-paper hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>

            {/* Detail */}
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId + anomaly}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                    <GaugeRing value={score} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            anomaly ? 'bg-amber' : 'bg-signal'
                          }`}
                        />
                        <span className="text-sm text-fog">
                          {anomaly ? 'Alert fired — drift above threshold' : 'Within expected range'}
                        </span>
                      </div>
                      <p className="font-display text-lg">{active.name}</p>
                      <p className="mono text-xs text-fog mt-1">sample data · updated just now</p>
                    </div>
                    <button
                      onClick={() => setAnomaly((a) => !a)}
                      className={`focus-ring shrink-0 text-sm px-4 py-2.5 rounded-full border transition-colors ${
                        anomaly
                          ? 'border-amber/50 text-amber bg-amber/10'
                          : 'border-line text-paper hover:border-signal/50'
                      }`}
                    >
                      {anomaly ? 'Clear anomaly' : 'Inject synthetic anomaly'}
                    </button>
                  </div>

                  <div className="rounded-xl border border-line bg-ink p-4 sm:p-5 mb-6">
                    <p className="mono text-[11px] text-fog uppercase tracking-widest mb-3">
                      prediction distribution · last 14 days
                    </p>
                    <DriftWave width={900} height={100} spike={anomaly} seed={active.seed} />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    {active.features.map((f) => {
                      const value = anomaly && f.drift === Math.max(...active.features.map((x) => x.drift))
                        ? Math.min(f.drift + 38, 97)
                        : f.drift
                      return (
                        <div key={f.name} className="rounded-lg border border-line p-3.5">
                          <p className="mono text-[11px] text-fog mb-2 truncate">{f.name}</p>
                          <div className="h-1.5 rounded-full bg-line overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${value > 30 ? 'bg-amber' : 'bg-signal'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 0.6 }}
                            />
                          </div>
                          <p className="mono text-[11px] text-fog mt-1.5">{value}% feature drift</p>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
