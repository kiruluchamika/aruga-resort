/** @type {import('tailwindcss').Config} */
// Palette sampled from the ARUGA RESORT logo:
//   cream background #F7F1DB · wordmark cocoa #491D04 · wave teal #277170
//   sun gold #DBA640 · mask terracotta #CA3123
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF5',
          // Exactly the logo's background cream, so the logo sits seamlessly on it
          100: '#F7F1DB',
          200: '#F0E6C8',
        },
        sand: {
          50: '#F8F2E6',
          100: '#F2E9D6',
          200: '#E9DCC2',
          300: '#DAC6A2',
          400: '#C7AD80',
        },
        cocoa: {
          50: '#F8F0EA',
          100: '#EFDFD2',
          200: '#DEC0A8',
          300: '#C59A7B',
          400: '#A47352',
          500: '#845535',
          600: '#6A3F23',
          700: '#552F18',
          800: '#432719',
          900: '#341C0F',
          950: '#221208',
        },
        ocean: {
          50: '#EAF5F4',
          100: '#D1EAE8',
          200: '#A5D4D1',
          300: '#72B8B4',
          400: '#43999A',
          500: '#247D80',
          600: '#1F6E6E',
          700: '#1A5A5B',
          800: '#164A4A',
          900: '#123C3C',
        },
        gold: {
          50: '#FCF6E7',
          100: '#F8EAC6',
          200: '#F1D794',
          300: '#E8C265',
          400: '#DFB04E',
          500: '#D5A33E',
          600: '#B9862A',
          700: '#946821',
          800: '#71501C',
          900: '#5A4019',
        },
        terracotta: {
          400: '#D6573A',
          500: '#C4442A',
          600: '#B94B2B',
          700: '#963A22',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      scale: {
        102: '1.02',
        108: '1.08',
      },
      keyframes: {
        sheen: {
          '0%': { transform: 'translateX(-120%)' },
          '60%, 100%': { transform: 'translateX(220%)' },
        },
      },
      animation: {
        sheen: 'sheen 4.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
