/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-orbit': {
          navy: '#102C57',
          blue: '#1A4D94',
          surface: '#F8F5F0',
          slate: '#19315A',
          border: '#E2DCD0',
          'warm-white': '#EBE4D5',
          'warm-beige': '#D8CCB5',
          gold: '#C5A059',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        heading: ['Geist', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'soft': '0.25rem',
      },
      boxShadow: {
        'luxury': '0 10px 30px rgba(0,0,0,.1), 0 30px 60px rgba(0,0,0,.08)',
      }
    },
  },
  plugins: [],
}
