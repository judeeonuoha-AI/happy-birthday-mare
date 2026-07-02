export default function Footer({ onAdminClick }) {
  return (
    <footer className="relative z-10 border-t border-sunflower-light/40 bg-white/40 py-10 text-center backdrop-blur-sm">
      <p className="font-body text-sm text-stone-500">
        Made with love for Mare, my Rare Sunflower 🌻
      </p>

      {/*
        Hidden admin affordance: a tiny, low-contrast dot that visitors are
        unlikely to notice or click. It opens the admin controls (clear all
        wishes) without needing a login.
      */}
      <button
        type="button"
        onClick={onAdminClick}
        aria-label="Admin options"
        className="mx-auto mt-4 block h-2 w-2 rounded-full bg-stone-300/50 transition-colors hover:bg-stone-400"
      />
    </footer>
  )
}
