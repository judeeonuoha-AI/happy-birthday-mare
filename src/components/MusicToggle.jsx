import { useRef, useState } from 'react'

// Soft background music toggle. Never autoplays - music only starts after
// the visitor explicitly clicks the button, per browser autoplay policies
// and good UX.
//
// To enable music: drop an mp3 file at `public/music.mp3` (see README for
// details). If no file is present, the button simply does nothing when
// clicked and fails silently.
export default function MusicToggle() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  function toggleMusic() {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.volume = 0.35
      audio.play().then(
        () => setIsPlaying(true),
        () => setIsPlaying(false) // e.g. public/music.mp3 not provided yet
      )
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="none" />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        className="focus-sunflower fixed bottom-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-sunflower-light bg-white/90 text-lg shadow-soft backdrop-blur transition-transform hover:scale-105"
      >
        {isPlaying ? '🔊' : '🔈'}
      </button>
    </>
  )
}
