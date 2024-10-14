/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scaleUp: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        scaleUp: "scaleUp 0.5s ease-in-out forwards",
      },
      objectPosition: {
        "bottom-right": "100% 100%",
      },
    },
  },
  plugins: [],
};
