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
    },
  },
  plugins: [require("daisyui")],
}

