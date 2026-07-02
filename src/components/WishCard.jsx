import { motion } from 'framer-motion'

const ACCENTS = ['🌻', '💛', '💕', '🌿', '✨']

function pickAccent(seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash + seed.charCodeAt(i)) % ACCENTS.length
  return ACCENTS[hash]
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

export default function WishCard({ wish, isNew }) {
  const accent = pickAccent(wish.id)

  return (
    <motion.li
      layout
      initial={isNew ? { opacity: 0, scale: 0.85, y: 16 } : false}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative break-inside-avoid rounded-2xl border border-sunflower-light/60 bg-white/80 p-5 shadow-card backdrop-blur-sm transition-transform hover:-translate-y-1"
    >
      <span className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm">
        {accent}
      </span>

      <p className="font-body text-[15px] leading-relaxed text-stone-700">&ldquo;{wish.message}&rdquo;</p>

      <div className="mt-4 flex items-center justify-between border-t border-sunflower-light/40 pt-3">
        <p className="font-display text-sm font-semibold text-sunflower-deep">— {wish.name}</p>
        <p className="text-xs text-stone-400">{formatDate(wish.createdAt)}</p>
      </div>
    </motion.li>
  )
}
