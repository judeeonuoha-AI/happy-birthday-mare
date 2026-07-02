/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // ---- EDIT COLOURS HERE ----
      // This is the palette used across the whole site. Tweak these hex
      // values to change the site's colour theme everywhere at once.
      colors: {
        cream: '#FFFBF2',
        champagne: '#F7ECD9',
        sunflower: {
          light: '#FFE38F',
          DEFAULT: '#F7C948',
          gold: '#E8A93B',
          deep: '#C9821A',
        },
        blush: {
          light: '#FDE6E8',
          DEFAULT: '#F4A9B4',
          deep: '#E88A9A',
        },
        sage: {
          light: '#E5EDDD',
          DEFAULT: '#A9C09C',
          deep: '#7C9C6F',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        hand: ['"Dancing Script"', 'cursive'],
        body: ['"Quicksand"', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-110vh) rotate(360deg)', opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.85) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '90%': { opacity: '0.9' },
          '100%': { transform: 'translateY(110vh) translateX(40px) rotate(300deg)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        drift: 'drift 6s ease-in-out infinite',
        glow: 'glow 3.5s ease-in-out infinite',
        popIn: 'popIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        petalFall: 'petalFall 12s linear infinite',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(201, 130, 26, 0.25)',
        card: '0 8px 30px -8px rgba(120, 90, 40, 0.18)',
      },
    },
  },
  plugins: [],
}
