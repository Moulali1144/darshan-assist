/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  '#FFF8EC',
          100: '#FFEFD0',
          200: '#FFD98A',
          300: '#FFC94D',
          400: '#FFB320',
          500: '#F59E0B',
          600: '#C8860A',
          700: '#9B6200',
          800: '#6B4200',
          900: '#3D2400',
        },
        crimson: {
          50:  '#FFF0F0',
          100: '#FFD6D6',
          200: '#FFB3B3',
          300: '#FF8080',
          400: '#E53E3E',
          500: '#C53030',
          600: '#9B1C1C',
          700: '#7F1D1D',
          800: '#5A1010',
          900: '#3D0000',
        },
        temple: {
          gold:   '#D4A017',
          deep:   '#8B0000',
          saffron:'#FF6B35',
          cream:  '#FFF8E7',
          stone:  '#9B8B6E',
        },
      },
      fontFamily: {
        sans:     ['Inter', 'system-ui', 'sans-serif'],
        heading:  ['Poppins', 'system-ui', 'sans-serif'],
        display:  ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card':   '0 4px 24px rgba(0,0,0,0.08)',
        'card-dark': '0 4px 24px rgba(0,0,0,0.4)',
        'glow':   '0 0 20px rgba(200,134,10,0.3)',
        'glow-lg':'0 0 40px rgba(200,134,10,0.2)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'slide-in':   'slideIn 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
        'countdown':  'countdown 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(200,134,10,0.3)' },
          '50%':      { boxShadow: '0 0 30px rgba(200,134,10,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      backgroundImage: {
        'gradient-saffron': 'linear-gradient(135deg, #C8860A 0%, #F59E0B 50%, #FFD98A 100%)',
        'gradient-temple':  'linear-gradient(135deg, #8B0000 0%, #C53030 100%)',
        'gradient-dark':    'linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%)',
        'gradient-card':    'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
    },
  },
  plugins: [],
};
