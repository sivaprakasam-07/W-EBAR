/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d81f26", // KFC Red
        dark: "#121212",
        glass: "rgba(255, 255, 255, 0.2)"
      },
      backdropBlur: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      }
    },
  },
  plugins: [],
};
