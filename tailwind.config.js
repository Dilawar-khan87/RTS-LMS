/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        navyblue: "#0B3D91",
        skyblue: "#87CEEB",
      },
      animation: {
        "gradient-x": "gradientShift 8s ease infinite",
         "fade-in-down": "fadeInDown 0.5s ease-out",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
         fadeInDown: {
        "0%": { opacity: 0, transform: "translateY(-10px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
    },
  },
  plugins: [],
};
