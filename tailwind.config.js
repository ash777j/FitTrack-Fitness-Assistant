/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#121212',
          secondary: '#1E1E1E',
          tertiary: '#2D2D2D'
        },
        neon: {
          blue: '#00FFFF',
          green: '#39FF14'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#CCCCCC',
          muted: '#999999'
        },
        metallic: {
          light: '#AAAAAA',
          medium: '#666666',
          dark: '#333333'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00FFFF, 0 0 10px #00FFFF',
        'neon-green': '0 0 5px #39FF14, 0 0 10px #39FF14'
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
