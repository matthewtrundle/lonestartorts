import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Texas Sunset Palette - Rich, warm, sophisticated
        sunset: {
          50: '#FFF8F3',
          100: '#FEECD9',
          200: '#FDD4A3',
          300: '#FBAC5D',
          400: '#F97F2B',
          500: '#F15A0E',
          600: '#E04207',
          700: '#B93309',
          800: '#942A0F',
          900: '#792510',
          950: '#411005',
        },
        // Masa & Corn Tones - Earthy, authentic, premium
        masa: {
          50: '#FAF8F5',
          100: '#F3EDDF',
          200: '#E8DCC2',
          300: '#D9C299',
          400: '#C5A06E',
          500: '#B58650',
          600: '#A06E42',
          700: '#855738',
          800: '#6E4833',
          900: '#5C3D2D',
          950: '#332016',
        },
        // Charred & Smoke - Deep, sophisticated contrast
        charcoal: {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#6D6D6D',
          600: '#5D5D5D',
          700: '#4F4F4F',
          800: '#3D3D3D',
          900: '#2D2D2D',
          950: '#1A1A1A',
        },
        // Lime & Cilantro Accents - Fresh, vibrant touches
        lime: {
          50: '#F7FEE7',
          100: '#ECFCC5',
          200: '#D9F99D',
          300: '#BEF264',
          400: '#A3E635',
          500: '#84CC16',
          600: '#65A30D',
          700: '#4D7C0F',
          800: '#3F6212',
          900: '#365314',
        },
        // Cream & Paper - Light, premium backgrounds
        cream: {
          50: '#FEFDFB',
          100: '#FDF9F3',
          200: '#FAF5EA',
          300: '#F6EDDA',
          400: '#F0DFC1',
          500: '#E8CCA5',
          600: '#DDB184',
          700: '#C8926A',
          800: '#A67557',
          900: '#86614A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Refined typography scale with fluid sizing
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.03em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.02em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.03em' }],
        '5xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        '6xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.045em' }],
        '7xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '8xl': ['8rem', { lineHeight: '0.95', letterSpacing: '-0.055em' }],
        '9xl': ['10rem', { lineHeight: '0.9', letterSpacing: '-0.06em' }],
        'giant': ['14rem', { lineHeight: '0.85', letterSpacing: '-0.065em' }],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'mega': '0.25em',
      },
      lineHeight: {
        'tight': '0.9',
        'snug': '1.1',
        'normal': '1.5',
        'relaxed': '1.75',
        'loose': '2',
      },
      spacing: {
        // Golden ratio inspired spacing
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '44': '11rem',
        '52': '13rem',
        '60': '15rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      animation: {
        // Sophisticated animations
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-up': 'fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1)',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-up': 'slideUp 1s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-down': 'slideDown 1s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-left': 'slideLeft 1s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-right': 'slideRight 1s cubic-bezier(0.22, 1, 0.36, 1)',
        'rotate-in': 'rotateIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'blur-in': 'blurIn 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'grain': 'grain 8s steps(10) infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        slideLeft: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideRight: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        rotateIn: {
          '0%': {
            transform: 'rotate(-180deg) scale(0.5)',
            opacity: '0',
          },
          '100%': {
            transform: 'rotate(0) scale(1)',
            opacity: '1',
          },
        },
        blurIn: {
          '0%': {
            filter: 'blur(20px)',
            opacity: '0',
          },
          '100%': {
            filter: 'blur(0)',
            opacity: '1',
          },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 5px rgba(241, 90, 14, 0.5), 0 0 20px rgba(241, 90, 14, 0.3)',
          },
          '100%': {
            boxShadow: '0 0 20px rgba(241, 90, 14, 0.8), 0 0 40px rgba(241, 90, 14, 0.5)',
          },
        },
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      backgroundImage: {
        // Artistic gradients
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-at-t': 'radial-gradient(at top, var(--tw-gradient-stops))',
        'gradient-radial-at-b': 'radial-gradient(at bottom, var(--tw-gradient-stops))',
        'gradient-radial-at-l': 'radial-gradient(at left, var(--tw-gradient-stops))',
        'gradient-radial-at-r': 'radial-gradient(at right, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'sunset-gradient': 'linear-gradient(135deg, #F15A0E 0%, #F97F2B 25%, #FBAC5D 50%, #FDD4A3 75%, #FEECD9 100%)',
        'masa-gradient': 'linear-gradient(135deg, #B58650 0%, #C5A06E 25%, #D9C299 50%, #E8DCC2 75%, #F3EDDF 100%)',
        'smoke-gradient': 'linear-gradient(180deg, rgba(26, 26, 26, 0.9) 0%, rgba(45, 45, 45, 0.6) 50%, rgba(0, 0, 0, 0) 100%)',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)',
        'large': '0 20px 50px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.1)',
        'xl': '0 25px 60px rgba(0, 0, 0, 0.35), 0 15px 30px rgba(0, 0, 0, 0.15)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'inner-medium': 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.1)',
        'sunset': '0 20px 60px -15px rgba(241, 90, 14, 0.5)',
        'masa': '0 20px 60px -15px rgba(181, 134, 80, 0.4)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;