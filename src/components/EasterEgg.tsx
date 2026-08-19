import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export default function EasterEgg() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let buffer: string[] = []
    function onKeyDown(e: KeyboardEvent) {
      buffer = [...buffer, e.key].slice(-CODE.length)
      if (buffer.length === CODE.length && buffer.every((k, i) => k === CODE[i])) {
        setOpen(true)
        buffer = []
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="mono w-full max-w-lg rounded-xl border border-signal/30 bg-ink-raised p-6 text-sm leading-relaxed"
          >
            <p className="text-signal mb-3">$ driftline --debug</p>
            <p className="text-fog">{'>'} anomaly source: human, not model</p>
            <p className="text-fog">{'>'} drift score: nostalgic</p>
            <p className="text-fog">{'>'} status: you found it. hi.</p>
            <p className="text-paper mt-4">
              If you're reading this in the console instead — close enough,
              same energy. Thanks for actually looking.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="focus-ring mt-5 text-xs text-fog hover:text-paper border border-line rounded-full px-3 py-1.5"
            >
              esc to close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
