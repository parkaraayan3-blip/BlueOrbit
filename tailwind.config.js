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
          navy: '#001E40',
          blue: '#3A5F94',
          surface: '#F9F9FE',
          slate: '#1A1C1F',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Geist', 'sans-serif'],
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
