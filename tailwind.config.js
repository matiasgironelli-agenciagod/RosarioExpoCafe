/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            dark: '#204532',
            light: '#d5dabd',
          },
          brown: {
            dark: '#865433',
          },
          cream: '#fff0de',
        }
      },
      boxShadow: {
        'brutal-sm': '1.5px 1.5px 0px 0px rgba(32, 69, 50, 0.25)',
        'brutal': '3px 3px 0px 0px rgba(32, 69, 50, 0.25)',
        'brutal-lg': '4px 4px 0px 0px rgba(32, 69, 50, 0.25)',
        'brutal-xl': '6px 6px 0px 0px rgba(32, 69, 50, 0.2)',
      }
    },
  },
  plugins: [],
}
