/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  // Layout and look live in src/app.css tokens and component styles.
  // Tailwind is kept for its reset and a few utilities (sr-only).
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {}
  },
  plugins: []
};
