import { motion } from 'framer-motion'

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 inset-x-0 z-40 border-b border-line/60 backdrop-blur-md bg-ink/70"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 focus-ring rounded">
          <span className="relative w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-signal" />
            <span className="absolute inset-0 rounded-full bg-signal animate-ping opacity-60" />
          </span>
          <span className="font-semibold tracking-tight text-[17px]">driftline</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-fog">
          <a href="#product" className="hover:text-paper transition-colors focus-ring rounded">Product</a>
          <a href="#pipeline" className="hover:text-paper transition-colors focus-ring rounded">How it works</a>
          <a href="#honest" className="hover:text-paper transition-colors focus-ring rounded">Approach</a>
        </nav>

        <a
          href="#start"
          className="text-sm font-medium px-4 py-2 rounded-full bg-paper text-ink hover:bg-signal transition-colors focus-ring"
        >
          Get early access
        </a>
      </div>
    </motion.header>
  )
}
