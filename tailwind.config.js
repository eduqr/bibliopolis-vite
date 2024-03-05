/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./**/*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bbPrimary: "#E45E2D",
        bbPrimaryTwo: "#5B3427",
        bbWhite: "#F2F3F4",
        ...colors,
      },
    },
  },
  plugins: [],
};
