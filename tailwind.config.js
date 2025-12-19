/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nether-dark': '#0a0a0a',
        'nether-purple': '#8b5cf6',
        'nether-cyan': '#06b6d4',
      },
    },
  },
  plugins: [],
}
