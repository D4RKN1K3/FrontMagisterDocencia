/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      normal: ['Mooli', 'sans-serif'],
    },
    colors: {
      // Configuracion de la paleta de colores
      '1':'#22213F' ,
      '2' : '#678FCA',
      '3' : '#DEB01F',
      '4' : '#C9631F',
      '5' : '#CE9342',
      '6' : '#303880',
      '7' : '#446BA9',
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('@tailwindcss/forms'),
  ],
}

