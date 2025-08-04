/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,js,jsx,tsx}", // adjust based on your project
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#64748B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
