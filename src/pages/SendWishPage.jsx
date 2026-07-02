import { useRef } from 'react'
import Hero from '../components/Hero'
import WishForm from '../components/WishForm'
import Footer from '../components/Footer'
import PageNavLink from '../components/PageNavLink'

// The page shared with friends & family: just the hero and the form to
// leave a wish. Deliberately does not show other people's wishes, so this
// link can be shared widely without spoiling the wall for Mare.
export default function SendWishPage({ onAddWish, onAdminClick }) {
  const formRef = useRef(null)

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <PageNavLink to="/wishes">View Wishes Wall 🌻</PageNavLink>

      <main className="relative">
        <Hero onLeaveWishClick={scrollToForm} />
        <WishForm formRef={formRef} onAddWish={onAddWish} />
      </main>

      <Footer onAdminClick={onAdminClick} />
    </>
  )
}
