/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
  background: {
    primary: '#0A0A0A',
    secondary: '#111111',
    tertiary: '#1B1B1B'                           
  },

  primary: {
    DEFAULT: '#E6392E',
    dark: '#B71C1C',
    light: '#FF5C4D'
  },

  accent: {
    white: '#FFFFFF',
    gray: '#A1A1AA'
  },

  glass: {
    light: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.12)'
  }
},
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      boxShadow:{
   soft:'0 15px 40px rgba(0,0,0,.35)',
   card:'0 8px 30px rgba(0,0,0,.45)',
   glow:'0 0 40px rgba(230,57,46,.30)'
},
      animation: {
        'pulse-neon': 'pulse-neon 2s infinite',
        'fade-in': 'fade-in 0.5s ease-in-out'
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 }
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    },
  },
  plugins: [],
};
