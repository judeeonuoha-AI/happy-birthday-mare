import { Link } from 'react-router-dom'

// A small, elegant pill link used to move between the "send a wish" page
// and the "wishes wall" page without cluttering either page's design.
export default function PageNavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="focus-sunflower fixed top-5 right-5 z-20 inline-flex items-center gap-1.5 rounded-full border border-sunflower-light bg-white/85 px-4 py-2 font-body text-sm font-medium text-sunflower-deep shadow-soft backdrop-blur transition-transform hover:scale-105"
    >
      {children}
    </Link>
  )
}
