import { motion } from 'framer-motion'

// ---- EDIT YOUR PERSONAL MESSAGE HERE ----
// This is the private, handwritten-style note to Mare. Replace the text
// below with whatever you want to say to her - it supports multiple
// paragraphs (just add more strings to the array).
const PERSONAL_MESSAGE = [
  "My love, happiest of birthdays to you.",
  "You are the warmest, most radiant person I know - my sunflower who somehow makes every ordinary day feel golden. I am so grateful for every laugh, every quiet evening, and every little moment we've shared.",
  "I hope this year brings you everything you deserve and more: joy, peace, growth, and love overflowing. Thank you for choosing me, for loving me the way you do, and for being exactly who you are.",
  "Happy birthday, Mare. Here's to us, and to many more of your birthdays by your side.",
]

const SIGNATURE = "President Mare's Fan Club"

export default function SpecialMessage() {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-semibold text-stone-800 sm:text-4xl">
          A Message From Me
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, rotate: -1, y: 20 }}
        whileInView={{ opacity: 1, rotate: -1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="paper-note relative rounded-2xl border border-champagne px-6 py-10 shadow-card sm:px-12 sm:py-14"
      >
        <span className="absolute -top-4 left-8 text-3xl" aria-hidden="true">🌻</span>
        <span className="absolute -bottom-4 right-8 text-3xl" aria-hidden="true">💛</span>

        <div className="space-y-5">
          {PERSONAL_MESSAGE.map((paragraph, i) => (
            <p key={i} className="font-hand text-2xl leading-relaxed text-stone-700 sm:text-3xl">
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mt-8 text-right font-hand text-3xl text-sunflower-deep sm:text-4xl">
          {SIGNATURE}
        </p>
      </motion.div>
    </section>
  )
}
