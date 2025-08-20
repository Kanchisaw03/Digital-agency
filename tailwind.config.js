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
  safelist: [
    // Blue colors
    'bg-blue-500', 'bg-blue-600', 'hover:bg-blue-600', 'hover:bg-blue-700',
    'text-blue-600', 'text-blue-700', 'border-blue-500', 'border-blue-600',
    'from-blue-500', 'to-blue-600', 'hover:from-blue-600', 'hover:to-blue-700',
    'hover:bg-blue-100', 'dark:hover:bg-blue-900/20', 'dark:text-blue-400', 'dark:hover:border-blue-400',
    
    // Orange colors
    'bg-orange-500', 'bg-orange-600', 'hover:bg-orange-600', 'hover:bg-orange-700',
    'text-orange-600', 'text-orange-700', 'border-orange-500', 'border-orange-600',
    'from-orange-500', 'to-orange-600', 'hover:from-orange-600', 'hover:to-orange-700',
    'hover:bg-orange-100', 'dark:hover:bg-orange-900/20', 'dark:text-orange-400', 'dark:hover:border-orange-400',
    
    // Pink colors
    'bg-pink-500', 'bg-pink-600', 'hover:bg-pink-600', 'hover:bg-pink-700',
    'text-pink-600', 'text-pink-700', 'border-pink-500', 'border-pink-600',
    'from-pink-500', 'to-pink-600', 'hover:from-pink-600', 'hover:to-pink-700',
    'hover:bg-pink-100', 'dark:hover:bg-pink-900/20', 'dark:text-pink-400', 'dark:hover:border-pink-400',
    
    // Purple colors
    'bg-purple-500', 'bg-purple-600', 'hover:bg-purple-600', 'hover:bg-purple-700',
    'text-purple-600', 'text-purple-700', 'border-purple-500', 'border-purple-600',
    'from-purple-500', 'to-purple-600', 'hover:from-purple-600', 'hover:to-purple-700',
    'hover:bg-purple-100', 'dark:hover:bg-purple-900/20', 'dark:text-purple-400', 'dark:hover:border-purple-400',
  ],
}

