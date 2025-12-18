import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EF4444",
      },
    },
  },
  plugins: [
    typography, // require এর বদলে ভেরিয়েবল ব্যবহার
    daisyui,    // require এর বদলে ভেরিয়েবল ব্যবহার
  ],
  daisyui: {
    themes: ["light"],
  },
}