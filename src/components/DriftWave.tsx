import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface DriftWaveProps {
  width?: number
  height?: number
  spike?: boolean
  color?: string
  className?: string
  seed?: number
}

// Deterministic pseudo-random generator so the same "model" always
// renders the same baseline waveform.
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function buildPath(seed: number, points: number, w: number, h: number, spike: boolean) {
  const rand = seededRandom(seed)
  const mid = h / 2
  const step = w / (points - 1)
  const spikeIndex = Math.floor(points * 0.72)
  const coords: [number, number][] = []

  for (let i = 0; i < points; i++) {
    const noise = (rand() - 0.5) * h * 0.28
    let y = mid + Math.sin(i * 0.55 + seed) * h * 0.12 + noise
    if (spike && Math.abs(i - spikeIndex) < 3) {
      const dist = Math.abs(i - spikeIndex)
      const magnitude = (3 - dist) / 3
      y -= h * 0.55 * magnitude
    }
    coords.push([i * step, y])
  }

  let d = `M ${coords[0][0]},${coords[0][1]}`
  for (let i = 1; i < coords.length; i++) {
    const [x0, y0] = coords[i - 1]
    const [x1, y1] = coords[i]
    const cx = (x0 + x1) / 2
    d += ` Q ${cx},${y0} ${x1},${y1}`
  }
  return { d, spikeX: coords[spikeIndex]?.[0] ?? 0, spikeY: coords[spikeIndex]?.[1] ?? mid }
}

export default function DriftWave({
  width = 600,
  height = 120,
  spike = false,
  color = 'var(--color-signal)',
  className = '',
  seed = 7,
}: DriftWaveProps) {
  const { d, spikeX, spikeY } = useMemo(
    () => buildPath(seed, 48, width, height, spike),
    [seed, width, height, spike]
  )

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={d}
        fill="none"
        stroke={spike ? 'var(--color-amber)' : color}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        key={spike ? 'spike' : 'normal'}
      />
      {spike && (
        <motion.circle
          cx={spikeX}
          cy={spikeY}
          r={4}
          fill="var(--color-amber)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: [0, 1.6, 1] }}
          transition={{ duration: 0.6, delay: 1 }}
        />
      )}
    </svg>
  )
}
