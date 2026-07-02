import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

// Fires a warm, sunflower-and-blush coloured confetti burst from the
// centre of the form when a wish is successfully submitted.
function celebrate() {
  const colors = ['#F7C948', '#E8A93B', '#F4A9B4', '#A9C09C', '#FFFBF2']
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 38,
    origin: { y: 0.6 },
    colors,
  })
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 60,
    origin: { x: 0, y: 0.7 },
    colors,
  })
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 60,
    origin: { x: 1, y: 0.7 },
    colors,
  })
}

const MAX_MESSAGE_LENGTH = 400

export default function WishForm({ onAddWish, formRef }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()
    const nextErrors = {}
    if (!trimmedName) nextErrors.name = 'Please share your name.'
    if (!trimmedMessage) nextErrors.message = 'Please write a birthday wish.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setSubmitting(true)
    try {
      await onAddWish(trimmedName, trimmedMessage)
      setName('')
      setMessage('')
      setErrors({})
      setShowSuccess(true)
      celebrate()

      // Hide the success banner after a few seconds so the form stays tidy.
      window.setTimeout(() => setShowSuccess(false), 4500)
    } catch {
      setErrors({ form: 'Something went wrong sending your wish. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      ref={formRef}
      id="wish-form"
      className="relative z-10 mx-auto max-w-2xl px-6 py-16 sm:py-20"
    >
      <div className="rounded-3xl border border-sunflower-light/50 bg-white/70 p-6 shadow-card backdrop-blur-sm sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-semibold text-stone-800 sm:text-4xl">
            Leave Your Birthday Wish
          </h2>
          <p className="mt-3 font-body text-stone-500">
            Add your name and a heartfelt message to Mare&rsquo;s wishes wall.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="wish-name" className="mb-1.5 block font-body text-sm font-medium text-stone-600">
              Your name
            </label>
            <input
              id="wish-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Amaka"
              maxLength={60}
              className={`focus-sunflower w-full rounded-xl border bg-white/90 px-4 py-3 font-body text-stone-700 placeholder:text-stone-400 transition-colors ${
                errors.name ? 'border-blush-deep' : 'border-sunflower-light'
              }`}
            />
            {errors.name && <p className="mt-1.5 text-sm text-blush-deep">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="wish-message" className="mb-1.5 block font-body text-sm font-medium text-stone-600">
              Your birthday wish
            </label>
            <textarea
              id="wish-message"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
              placeholder="Write something from the heart..."
              rows={4}
              className={`focus-sunflower w-full resize-none rounded-xl border bg-white/90 px-4 py-3 font-body text-stone-700 placeholder:text-stone-400 transition-colors ${
                errors.message ? 'border-blush-deep' : 'border-sunflower-light'
              }`}
            />
            <div className="mt-1.5 flex items-center justify-between">
              {errors.message ? (
                <p className="text-sm text-blush-deep">{errors.message}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-stone-400">
                {message.length}/{MAX_MESSAGE_LENGTH}
              </span>
            </div>
          </div>

          {errors.form && <p className="text-sm text-blush-deep">{errors.form}</p>}

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={submitting ? {} : { scale: 1.02 }}
            whileTap={submitting ? {} : { scale: 0.98 }}
            className="focus-sunflower w-full rounded-xl bg-gradient-to-r from-sunflower to-blush-deep px-6 py-3.5 font-body text-base font-semibold text-white shadow-soft transition-shadow hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Sending...' : 'Send My Wish 🌻'}
          </motion.button>
        </form>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-5 overflow-hidden"
            >
              <div className="flex items-center gap-2 rounded-xl border border-sage/50 bg-sage-light/70 px-4 py-3 font-body text-sm font-medium text-sage-deep">
                <span aria-hidden="true">💛</span>
                Your birthday wish has been added with love.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
