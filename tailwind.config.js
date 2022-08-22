/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "exit-up": "exit-up 2s ease-out forwards",
      },
      keyframes: {
        "exit-up": {
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
