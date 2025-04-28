// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1) Tell Tailwind where to find your classes:
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  // 2) Enable class-based dark mode
  darkMode: 'class',
  theme: {
    extend: {
      // any custom theming here
    },
  },
  plugins: [
    // e.g. require('@tailwindcss/forms'),
  ],
}
