/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: "#edb946",
      secondary: "#234D95",
      black: "#0a162b",
      gray: "#7D7D7D",
      gray-border: "#CECECE",
      warning:"E13C45",
      background: {
        white: "ffffff",
        blue:"5A88D8",
        blue-light:"BDCFEF"
      },
    },
    fontSize: {
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      }
    }
  },
  plugins: [],
};
