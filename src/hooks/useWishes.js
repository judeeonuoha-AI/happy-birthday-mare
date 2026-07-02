import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../lib/firebase'
import sampleWishes from '../data/sampleWishes'

const wishesCollection = isFirebaseConfigured ? collection(db, 'wishes') : null
const wishesQuery = wishesCollection ? query(wishesCollection, orderBy('createdAt', 'desc')) : null

function toWish(docSnapshot) {
  const data = docSnapshot.data()
  return {
    id: docSnapshot.id,
    name: data.name,
    message: data.message,
    // createdAt is a Firestore server timestamp; it's briefly null on the
    // optimistic local write before the server round-trip confirms it.
    createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
  }
}

// Keeps the wish list in sync with a shared Firestore "wishes" collection in
// real time, so a wish submitted on one visitor's phone shows up on
// everyone else's screen (including the birthday celebrant's) without a
// refresh. Falls back to local, read-only sample data if Firebase hasn't
// been configured yet (see README.md for setup steps).
//
// Note: sample wishes are only ever added via the explicit "Restore sample
// wishes" admin action (resetToSampleWishes below) - never automatically
// when the collection is empty. An auto-seed-on-empty used to exist here,
// but any visitor with an older cached build (with different/no sample
// wishes baked in) could race a genuine "clear all" and silently repopulate
// the shared wall with stale data. Explicit-only avoids that entirely.
export default function useWishes() {
  const [wishes, setWishes] = useState(isFirebaseConfigured ? [] : sampleWishes)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured) return

    const unsubscribe = onSnapshot(wishesQuery, (snapshot) => {
      setLoading(false)
      setWishes(snapshot.docs.map(toWish))
    })

    return unsubscribe
  }, [])

  async function addWish(name, message) {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured yet - see README.md for setup steps.')
    }
    const docRef = await addDoc(wishesCollection, {
      name: name.trim(),
      message: message.trim(),
      createdAt: serverTimestamp(),
    })
    return { id: docRef.id, name: name.trim(), message: message.trim(), createdAt: new Date().toISOString() }
  }

  async function clearAllWishes() {
    if (!isFirebaseConfigured) return
    const snapshot = await getDocs(wishesCollection)
    await Promise.all(snapshot.docs.map((docSnapshot) => deleteDoc(docSnapshot.ref)))
  }

  async function resetToSampleWishes() {
    if (!isFirebaseConfigured) return
    await clearAllWishes()
    await Promise.all(
      sampleWishes.map((sample) =>
        addDoc(wishesCollection, {
          name: sample.name,
          message: sample.message,
          createdAt: serverTimestamp(),
        })
      )
    )
  }

  return { wishes, loading, addWish, clearAllWishes, resetToSampleWishes }
}
