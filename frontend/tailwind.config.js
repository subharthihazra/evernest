/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.{html,js}"],
  darkMode: ["class"],
  theme: {
    extend: {
      keyframes: {
        enterFromRight: {
          from: { opacity: 0, transform: "translateX(200px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        enterFromLeft: {
          from: { opacity: 0, transform: "translateX(-200px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        exitToRight: {
          from: { opacity: 1, transform: "translateX(0)" },
          to: { opacity: 0, transform: "translateX(200px)" },
        },
        exitToLeft: {
          from: { opacity: 1, transform: "translateX(0)" },
          to: { opacity: 0, transform: "translateX(-200px)" },
        },
        getIn: {
          from: {
            opacity: 0,
            transform: "rotateX(-10deg) translateY(-50%) scaleY(0.9)",
          },
          to: {
            opacity: 1,
            transform: "rotateX(0deg) translateY(0%) scaleY(1)",
          },
        },
        getOut: {
          from: {
            opacity: 1,
            transform: "rotateX(0deg) translateY(0%) scaleY(1)",
          },
          to: {
            opacity: 0,
            transform: "rotateX(-10deg) translateY(-50%) scaleY(0.95)",
          },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        getIn: "getIn 200ms ease",
        getOut: "getOut 200ms ease",
        fadeIn: "fadeIn 200ms ease",
        fadeOut: "fadeOut 200ms ease",
        enterFromLeft: "enterFromLeft 250ms ease",
        enterFromRight: "enterFromRight 250ms ease",
        exitToLeft: "exitToLeft 250ms ease",
        exitToRight: "exitToRight 250ms ease",
      },
    },
  },
  plugins: [],
};

// I added 'public' latter (exp)