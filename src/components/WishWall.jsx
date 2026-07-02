import { AnimatePresence, motion } from 'framer-motion'
import WishCard from './WishCard'

export default function WishWall({ wishes, latestWishId, loading = false }) {
  return (
    <section id="wish-wall" className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-semibold text-stone-800 sm:text-4xl">
          Birthday Wishes Wall
        </h2>
        <p className="mt-3 font-body text-stone-500">
          Every message from the people who love Mare, gathered in one place.
        </p>

        <motion.div
          layout
          className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-sunflower/40 bg-white/70 px-4 py-1.5 font-body text-sm font-medium text-sunflower-deep shadow-sm"
        >
          🌻 <span>{wishes.length}</span> {wishes.length === 1 ? 'wish' : 'wishes'} and counting
        </motion.div>
      </div>

      {loading ? (
        <p className="text-center font-body text-stone-400">Loading wishes...</p>
      ) : wishes.length === 0 ? (
        <p className="text-center font-body text-stone-400">
          No wishes yet — be the first to leave one above!
        </p>
      ) : (
        <motion.ul
          layout
          className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3"
        >
          <AnimatePresence initial={false}>
            {wishes.map((wish) => (
              <WishCard key={wish.id} wish={wish} isNew={wish.id === latestWishId} />
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </section>
  )
}
