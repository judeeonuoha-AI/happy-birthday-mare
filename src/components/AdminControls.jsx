import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// A lightweight confirmation panel for the hidden admin action in the
// footer. Lets the site owner clear all wishes (or restore the sample
// set) without any login - triggered only by the near-invisible dot in
// the footer, so regular visitors are unlikely to stumble onto it.
export default function AdminControls({ open, onClose, onClearAll, onResetSamples }) {
  const [pending, setPending] = useState(false)

  async function runAction(action) {
    setPending(true)
    try {
      await action()
    } finally {
      setPending(false)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 flex items-center justify-center bg-stone-900/40 px-6"
          onClick={pending ? undefined : onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h3 className="font-display text-xl font-semibold text-stone-800">Admin Options</h3>
            <p className="mt-2 font-body text-sm text-stone-500">
              These actions affect the shared wishes wall for everyone.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  if (confirm('Clear all birthday wishes? This cannot be undone.')) {
                    runAction(onClearAll)
                  }
                }}
                className="focus-sunflower rounded-xl bg-blush-deep px-4 py-2.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? 'Working...' : 'Clear all wishes'}
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => runAction(onResetSamples)}
                className="focus-sunflower rounded-xl border border-sunflower-light px-4 py-2.5 font-body text-sm font-semibold text-sunflower-deep transition-colors hover:bg-sunflower-light/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? 'Working...' : 'Restore sample wishes'}
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={onClose}
                className="focus-sunflower rounded-xl px-4 py-2.5 font-body text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
