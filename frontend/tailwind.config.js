/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        secondary: "#50E3C2",
        background: "#F4F6F9",
        accent: "#F5A623",
        neutral : "#8E8E93",
        success: "#7ED321",
        warning: "#FF6F61"
      }
    },
  },
  plugins: [],
}