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
        'blue-primary': '#243c5a',
        'blue-secondary': '#243c5a',
        'red-primary': '#243c5a',
        'yellow-primary': '#243c5a',
        'grey-primary': '#243c5a',
        'black-primary': '#243c5a',
      }
    },
  },
  plugins: [require("daisyui")],
}
