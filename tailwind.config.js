/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nba: {
          red: '#C8102E',
          blue: '#1D428A',
          silver: '#C4CED4',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}