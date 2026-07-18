/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette from the pitch deck: deep leaf green + muted gold.
        leaf: {
          50: '#eef6f1',
          400: '#3f7d5f',
          500: '#2c6a4f',
          600: '#1e4d38',
          700: '#14342a',
        },
        gold: {
          400: '#c9a84c',
          500: '#b3923c',
          // Darker gold for text on white — the 400/500 shades fall below
          // the WCAG AA 4.5:1 contrast ratio on light backgrounds.
          600: '#8a6d24',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
