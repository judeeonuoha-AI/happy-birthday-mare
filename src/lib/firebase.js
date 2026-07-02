import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// ---- FIREBASE CONFIG ----
// These values come from environment variables (see .env.example) so the
// project stays configurable without editing code. They are safe to expose
// in the client bundle - Firebase web config is not a secret, access is
// controlled by Firestore Security Rules instead. See README.md for the
// full setup walkthrough.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// True once every required config value has actually been filled in. Lets
// the rest of the app detect an unconfigured Firebase project and show a
// helpful message instead of crashing.
export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => typeof value === 'string' && value.length > 0
)

export const db = isFirebaseConfigured ? getFirestore(initializeApp(firebaseConfig)) : null
