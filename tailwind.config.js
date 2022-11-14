/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue-primary': '#4382EE',
        'blue-secondary': '#71A8FA',
        'red-primary': '#F25858',
        'yellow-primary': '#EDC808',
        'grey-primary': '#243c5a',
        'black-primary': '#453B2A',
      }
    },
  },
  plugins: [require("daisyui")],
}
