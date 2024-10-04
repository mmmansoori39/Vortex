/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in-out': 'fadeInOut 2s ease-in-out infinite', 
      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: '0' },   // Start and end invisible
          '50%': { opacity: '1' },        // Middle of the animation, fully visible
        },
      },
    },
  },
  plugins: [],
};
