/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      transparent: "transparent",
      primary: "#edb946",
      secondary: "#234D95",
      black:"#000",
      text: "#0a162b",
      gray: "#7D7D7D",
      "gray-border": "#CECECE",
      white: "#ffffff",
      price: "#B12603",
      warning: "#E13C45",
      background: {
        white: "#ffffff",
        blue: "#5A88D8",
        "blue-light": "#BDCFEF",
      },
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  variants: {
    display: ["group-hover"],
  },
  plugins: [],
};
