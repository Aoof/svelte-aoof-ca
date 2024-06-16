/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#E0AFA0',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'red': '#ff5e57',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white': '#ffffff',
      'dark': '#282828', // dark is 40, 40, 40 in rgb and #282828 in hex
    },
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
      serif: ['Raleway', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}

