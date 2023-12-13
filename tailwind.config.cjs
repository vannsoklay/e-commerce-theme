/** @type {import('tailwindcss').Config} */
import theme from "./themes/static.json";

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      ...theme,
    },
  },
  plugins: [require("daisyui")],
};
