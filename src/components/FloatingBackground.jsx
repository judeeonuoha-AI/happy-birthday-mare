import { useMemo } from 'react'

// Tiny inline icons so we don't need an extra icon-font dependency.
function PetalIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
      <ellipse cx="12" cy="12" rx="6" ry="11" />
    </svg>
  )
}

function HeartIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
      <path d="M12 21s-7.5-4.6-10-9.1C0.4 8.5 2 5 5.6 5 8 5 9.7 6.6 12 9c2.3-2.4 4-4 6.4-4 3.6 0 5.2 3.5 3.6 6.9C19.5 16.4 12 21 12 21z" />
    </svg>
  )
}

// A decorative, non-interactive layer of softly floating sunflower petals
// and hearts. Purely cosmetic - aria-hidden so screen readers skip it.
export default function FloatingBackground({ density = 14 }) {
  const items = useMemo(() => {
    return Array.from({ length: density }, (_, i) => {
      const isHeart = i % 3 === 0
      return {
        id: i,
        isHeart,
        left: Math.random() * 100,
        size: 12 + Math.random() * 16,
        duration: 9 + Math.random() * 10,
        delay: Math.random() * 12,
        drift: Math.random() > 0.5,
      }
    })
  }, [density])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute top-0 ${item.drift ? 'animate-drift' : ''}`}
          style={{
            left: `${item.left}%`,
            animation: `petalFall ${item.duration}s linear ${item.delay}s infinite`,
          }}
        >
          {item.isHeart ? (
            <HeartIcon
              className="text-blush/70 drop-shadow-sm"
              style={{ width: item.size, height: item.size }}
            />
          ) : (
            <PetalIcon
              className="text-sunflower/70 drop-shadow-sm"
              style={{ width: item.size, height: item.size }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
