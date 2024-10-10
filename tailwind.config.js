/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const bgPositions = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode: 'selector',
  content: ["./layouts/**/*.html", "./layouts/*.html"],
  theme: {
    colors: {
      ...colors,
      'black': '#000000',
      'white': '#FFFFFF',
      'style': '#F4E28D',
      'transparent': 'transparent',
      'blue': '#091826',
      'off-white': '#F4F4F4',
      'warning': '#F59E0B'
    },
    backgroundPosition: {
      'top-center': 'top center',
      'bottom': 'bottom',
      'center': 'center',
      'left': 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      'right': 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      'top': 'top',
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #FFCF71, #2376DD)',
      },
    },
  },
  plugins: [],
};
