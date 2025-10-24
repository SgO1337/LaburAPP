/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#006AEE',
          'deep-blue': '#0123E4',
          'light-1': '#71A7ED',
          'light-2': '#89B4F1',
        },
        background: '#f7f7f8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tight-heading': '-0.02em',
        'loose-label': '0.04em',
      },
    },
  },
  plugins: [],
};
