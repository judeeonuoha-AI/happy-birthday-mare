import { motion } from 'framer-motion'
import WishWall from '../components/WishWall'
import SpecialMessage from '../components/SpecialMessage'
import Footer from '../components/Footer'
import PageNavLink from '../components/PageNavLink'

// The private-ish page meant for Mare: everyone's birthday wishes plus the
// personal handwritten note. Not linked to loudly from the send-a-wish
// page's main flow, so it stays a nice surprise for her to browse.
export default function WishesWallPage({ wishes, loading, latestWishId, onAdminClick }) {
  return (
    <>
      <PageNavLink to="/">Leave a Wish 💌</PageNavLink>

      <main className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="px-6 pt-20 pb-4 text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-sunflower/40 bg-white/60 px-4 py-1.5 text-sm font-medium tracking-wide text-sunflower-deep shadow-sm backdrop-blur">
            🌻 For Mare, with love
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-stone-800 sm:text-5xl">
            Your Birthday Wishes
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-stone-600">
            Every message the people who love you have left for your special day.
          </p>
        </motion.div>

        <WishWall wishes={wishes} loading={loading} latestWishId={latestWishId} />
        <SpecialMessage />
      </main>

      <Footer onAdminClick={onAdminClick} />
    </>
  )
}
