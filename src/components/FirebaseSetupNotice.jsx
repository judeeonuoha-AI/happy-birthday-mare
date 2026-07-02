// Shown only when Firebase env vars haven't been filled in yet (see
// .env.example / README.md). Lets the site owner know why wishes aren't
// saving/syncing yet, without visitors seeing a broken form silently fail.
export default function FirebaseSetupNotice() {
  return (
    <div className="relative z-30 border-b border-blush-deep/40 bg-blush-light px-4 py-2.5 text-center font-body text-sm text-blush-deep">
      ⚠️ Firebase isn&rsquo;t configured yet, so wishes won&rsquo;t be saved or shared across
      devices. See the <code className="rounded bg-white/60 px-1">README.md</code> setup guide.
    </div>
  )
}
