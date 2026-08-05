/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep fintech dark background
        ink: {
          DEFAULT: '#05070B',
          900: '#05070B',
          800: '#0A0E16',
          700: '#0F141F',
          600: '#161C28',
          500: '#1E2533'
        },

        // Neon blue system
        primary: {
          DEFAULT: '#2EA7FF',
          50:  '#E6F4FF',
          100: '#CDEBFF',
          200: '#9BD7FF',
          300: '#69C2FF',
          400: '#4AB8FF',
          500: '#2EA7FF',
          600: '#1488E0',
          700: '#0F69B0',
          800: '#0B4F86'
        },

        secondary: {
          DEFAULT: '#64C9FF',
          soft: '#A5DBFF'
        },

        glow: {
          DEFAULT: 'rgba(46,167,255,0.35)',
          strong: 'rgba(46,167,255,0.55)',
          soft:   'rgba(46,167,255,0.15)'
        },

        surface: {
          DEFAULT: 'rgba(255,255,255,0.05)',
          high:    'rgba(255,255,255,0.08)',
          low:     'rgba(255,255,255,0.03)'
        },

        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255,255,255,0.65)',
          muted:    'rgba(255,255,255,0.45)',
          subtle:   'rgba(255,255,255,0.30)'
        },

        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          high:    'rgba(255,255,255,0.14)',
          glow:    'rgba(46,167,255,0.40)'
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
        tight:    '-0.02em',
        wide:     '0.04em',
        wider:    '0.08em'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      boxShadow: {
        glass:
          'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.55)',
        glow:
          '0 0 40px rgba(46,167,255,0.35), 0 0 80px rgba(46,167,255,0.15)',
        glowStrong:
          '0 0 60px rgba(46,167,255,0.55), 0 0 120px rgba(46,167,255,0.20)',
        glowSoft:
          '0 0 30px rgba(46,167,255,0.20)',
        lift:
          '0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)'
      },
      keyframes: {
        'float-slow':  { '0%,100%': { transform: 'translateY(0px)' },    '50%': { transform: 'translateY(-14px)' } },
        'float-medium':{ '0%,100%': { transform: 'translateY(0px)' },    '50%': { transform: 'translateY(-22px)' } },
        'float-fast':  { '0%,100%': { transform: 'translateY(0px)' },    '50%': { transform: 'translateY(-8px)' } },
        'spin-slow':   { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        'pulse-glow':  {
          '0%,100%': { opacity: 1, filter: 'drop-shadow(0 0 20px rgba(46,167,255,0.45))' },
          '50%':     { opacity: 0.85, filter: 'drop-shadow(0 0 50px rgba(46,167,255,0.75))' }
        },
        'gradient-shift': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' }
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'orb-drift': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(40px,-30px) scale(1.05)' },
          '66%':     { transform: 'translate(-30px,30px) scale(0.95)' }
        },
        'fade-up': {
          '0%':   { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'ripple': {
          '0%':   { transform: 'scale(0)', opacity: 0.5 },
          '100%': { transform: 'scale(4)', opacity: 0 }
        }
      },
      animation: {
        'float-slow':    'float-slow 8s ease-in-out infinite',
        'float-medium':  'float-medium 6s ease-in-out infinite',
        'float-fast':    'float-fast 4s ease-in-out infinite',
        'spin-slow':     'spin-slow 30s linear infinite',
        'pulse-glow':    'pulse-glow 3s ease-in-out infinite',
        'gradient-shift':'gradient-shift 8s ease infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'orb-drift':     'orb-drift 18s ease-in-out infinite',
        'fade-up':       'fade-up 0.6s ease-out both',
        'fade-in':       'fade-in 0.6s ease-out both'
      }
    },
  },
  plugins: [],
};