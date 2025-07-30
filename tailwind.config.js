/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "ui-sans-serif", "system-ui"],
      },
      colors: {
        dark: "#121417",
        primary: {
          blue: "#3b82f6",
          green: "#22d3ee",
          violet: "#a78bfa",
        },
      },
      backgroundImage: {
        'gradient-to-br': 'linear-gradient(90deg, #3b82f6 0%, #22d3ee 50%, #a78bfa 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
}

