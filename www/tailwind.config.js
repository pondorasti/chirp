const { fontFamily } = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-satoshi)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        "twitter-blue": "#1d9bf0",
        "twitter-red": "#f91880",
        "twitter-faded-red": "#f7e0eb",
        "twitter-gray": "#536471",
        gray: {
          ...colors.neutral,
        },
      },
    },
  },
  plugins: [],
}
