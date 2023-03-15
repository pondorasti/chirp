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
        "twitter-brand-blue": "#1DA1F2",
        "twitter-blue": "#1D9BF0",
        "twitter-faded-blue": "#E4EEF7",
        "twitter-red": "#F91880",
        "twitter-faded-red": "#F7E0EB",
        "twitter-green": "#00BA7C",
        "twitter-faded-green": "#DEF1EB",
        "twitter-gray": "#536471",
        gray: {
          ...colors.neutral,
        },
      },
    },
    screens: {
      // ideal tweet size = 384px width + 20px padding
      sm: "640px",
      xl: "1152px",
      "3xl": "1536px",
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
}
