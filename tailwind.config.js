/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Brand colours extracted from screenshots ──────────────
        // Dark navy (header, dark cards, dark mode bg)
        navy: {
          950: '#0d1b2e',
          900: '#112240',
          800: '#1a2f4a',
          700: '#1e3a5f',
          600: '#1e3f6e',
        },
        // Crimson/maroon (LOST card)
        crimson: {
          900: '#5c1a2e',
          800: '#7a1f3a',
          700: '#8b2040',
          600: '#9b2335',
          500: '#a52842',
        },
        // Teal (Submit Found Item button, AI chip accents)
        teal: {
          600: '#0d9488',
          500: '#14b8a6',
          400: '#2dd4bf',
        },
        // Off-white form background
        surface: '#f5f5f0',
        // Muted label text
        muted: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(0,0,0,0.10)',
        'card-dark': '0 2px 16px 0 rgba(0,0,0,0.40)',
      },
    },
  },
  plugins: [],
}
