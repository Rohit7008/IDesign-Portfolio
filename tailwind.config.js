/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1A1A1A',
        'secondary': '#D4AF37',
        'beige': '#F5F5DC',
        'ivory': '#FFFFF0',
        'offwhite': '#FAF9F6',
        gold: {
          DEFAULT: '#D4AF37',
          50: '#F7F1DC',
          100: '#F2E7C7',
          200: '#EAD59E',
          300: '#E1C275',
          400: '#D9B04C',
          500: '#D4AF37',
          600: '#B08F23',
          700: '#826A1A',
          800: '#544511',
          900: '#262008',
          950: '#120F04'
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 