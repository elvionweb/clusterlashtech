/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F6EFE7',
        sand: '#EADFD1',
        espresso: '#1E1613',
        mocha: '#3A2B24',
        gold: { 300: '#DDBB86', 400: '#CDA264', 500: '#B98A4B', 600: '#9A6F36' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: { marquee: 'marquee 34s linear infinite', float: 'float 6s ease-in-out infinite' },
    },
  },
  plugins: [],
}
