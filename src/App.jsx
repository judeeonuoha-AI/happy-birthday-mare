import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import useWishes from './hooks/useWishes'
import { isFirebaseConfigured } from './lib/firebase'
import FloatingBackground from './components/FloatingBackground'
import MusicToggle from './components/MusicToggle'
import AdminControls from './components/AdminControls'
import FirebaseSetupNotice from './components/FirebaseSetupNotice'
import SendWishPage from './pages/SendWishPage'
import WishesWallPage from './pages/WishesWallPage'

export default function App() {
  const { wishes, loading, addWish, clearAllWishes, resetToSampleWishes } = useWishes()
  const [latestWishId, setLatestWishId] = useState(null)
  const [adminOpen, setAdminOpen] = useState(false)

  async function handleAddWish(name, message) {
    const newWish = await addWish(name, message)
    setLatestWishId(newWish.id)
    return newWish
  }

  return (
    <HashRouter>
      <div className="relative min-h-screen overflow-x-hidden">
        <FloatingBackground />

        {!isFirebaseConfigured && <FirebaseSetupNotice />}

        <Routes>
          <Route
            path="/"
            element={<SendWishPage onAddWish={handleAddWish} onAdminClick={() => setAdminOpen(true)} />}
          />
          <Route
            path="/wishes"
            element={
              <WishesWallPage
                wishes={wishes}
                loading={loading}
                latestWishId={latestWishId}
                onAdminClick={() => setAdminOpen(true)}
              />
            }
          />
        </Routes>

        <MusicToggle />

        <AdminControls
          open={adminOpen}
          onClose={() => setAdminOpen(false)}
          onClearAll={clearAllWishes}
          onResetSamples={resetToSampleWishes}
        />
      </div>
    </HashRouter>
  )
}
