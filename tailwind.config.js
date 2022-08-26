/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-out": "fade-out 0.2s ease-out forwards",
        "fade-in": "fade-in 0.2s ease-out forwards",
        "fade-out-up": "fade-out-up 2s ease-out forwards",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
        "spinning-sky": "spinning-sky 30s infinite",
      },
      keyframes: {
        "fade-out": {
          from: { opacity: 100, display: "block" },
          to: {
            opacity: 0,
            display: "none",
          },
        },
        "fade-in": {
          from: {
            opacity: 0,
            display: "none",
          },
          to: {
            opacity: 100,
            display: "block",
          },
        },
        up: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-5rem)" },
        },
        down: {
          from: {
            transform: "translateY(-2rem)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        "fade-out-up": {
          from: { transform: "translateY(0)", opacity: 100, display: "block" },
          to: { transform: "translateY(-5rem)", opacity: 0, display: "none" },
        },
        "fade-in-down": {
          from: {
            transform: "translateY(-5rem)",
            opacity: 0,
            display: "none",
          },
          to: {
            transform: "translateY(0)",
            opacity: 100,
            display: "block",
          },
        },
        "spinning-sky": {
          from: {
            "background-position": "0% 100%",
          },
          to: {
            "background-position": "100% 0%",
          },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
