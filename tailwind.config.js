/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-out-up": "fade-out-up 2s ease-out forwards",
      },
      keyframes: {
        "fade-out-up": {
          from: { opacity: 100 },
          to: {
            transform: "translateY(-5rem)",
            opacity: 0,
            display: "none",
          },
        },
      },
    },
  },
  plugins: [],
};
