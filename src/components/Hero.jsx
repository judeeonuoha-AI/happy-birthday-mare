import { motion } from 'framer-motion'

// Simple layered sunflower illustration built from SVG shapes so the hero
// doesn't depend on any external image assets.
function SunflowerIllustration({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <g className="animate-glow origin-center">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="40"
            rx="16"
            ry="34"
            fill="url(#petalGradient)"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
      </g>
      <circle cx="100" cy="100" r="34" fill="url(#centerGradient)" />
      <circle cx="100" cy="100" r="34" fill="none" stroke="#B5701A" strokeWidth="1.5" opacity="0.3" />
      <defs>
        <linearGradient id="petalGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE38F" />
          <stop offset="100%" stopColor="#E8A93B" />
        </linearGradient>
        <radialGradient id="centerGradient">
          <stop offset="0%" stopColor="#E8A93B" />
          <stop offset="100%" stopColor="#C9821A" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default function Hero({ onLeaveWishClick }) {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-16 text-center">
      {/* Decorative glowing sunflowers, tucked behind the content */}
      <SunflowerIllustration className="pointer-events-none absolute -top-10 -left-16 h-56 w-56 opacity-70 sm:h-72 sm:w-72" />
      <SunflowerIllustration className="pointer-events-none absolute -bottom-16 -right-14 h-64 w-64 opacity-60 sm:h-80 sm:w-80" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-sunflower/40 bg-white/60 px-4 py-1.5 text-sm font-medium tracking-wide text-sunflower-deep shadow-sm backdrop-blur">
          🌻 For the one and only Rare Sunflower
        </span>

        <h1 className="font-display text-4xl font-semibold leading-tight text-stone-800 sm:text-5xl md:text-6xl">
          Happy Birthday,{' '}
          <span className="bg-gradient-to-r from-sunflower-gold via-sunflower to-blush-deep bg-clip-text text-transparent">
            Mare
          </span>{' '}
          🌻
        </h1>

        <p className="mt-6 max-w-xl text-balance font-body text-lg text-stone-600 sm:text-xl">
          A little corner of love, memories, and birthday wishes made specially for you.
        </p>

        <motion.button
          type="button"
          onClick={onLeaveWishClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="focus-sunflower mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sunflower to-sunflower-gold px-8 py-3.5 font-body text-base font-semibold text-white shadow-soft transition-shadow hover:shadow-lg"
        >
          Leave a Birthday Wish
          <span aria-hidden="true">💌</span>
        </motion.button>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 z-10 text-stone-400"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        ↓
      </motion.div>
    </section>
  )
}
