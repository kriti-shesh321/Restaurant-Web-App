import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Baskervville SC"', 'serif'],
        text1: ['"Red Rose"', 'sans-serif'],
      },
      colors: {
        maroon: '#9d1d1f',
        cream: '#FBF2E5',
      },
      animation: {
        'scale-up': 'scaleUp 0.5s ease-in-out',
      },
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
}

