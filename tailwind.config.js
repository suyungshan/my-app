export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "769px",
    },
    colors: {
      transparent: "transparent",
      primary: {
        dark: "#BA4408",
        DEFAULT: "#DB5009",
        light: "#E5680A",
        lighter: "#FED6BE",
        lightest: "#FFF6F0",
      },
      secondary: {
        dark: "#4D9B2C",
        DEFAULT: "#5CB531",
        light: "#88C92F",
        lighter: "#F1F8EE",
      },
      success: {
        dark: "#0c5226",
        DEFAULT: "#4caf50",
        light: "#e8f5e9",
      },
      warning: {
        dark: "#845623",
        DEFAULT: "#ffc107",
        light: "#fff8e1",
      },
      danger: {
        dark: "#701317",
        DEFAULT: "#f44336",
        light: "#ffebee",
      },
      info: {
        dark: "#003a64",
        DEFAULT: "#2196f3",
        light: "#e3f2fd",
      },
      text: {
        black: "#000000",
        gray: {
          darkest: "#333333",
          darker: "#666666",
          dark: "#8D8D8F",
          DEFAULT: "#999999",
        },
      },
      decoration: {
        gray: {
          light: "#bdbdbd",
          lighter: "#cccccc",
          lightest: "#efefef",
          bg: "#F9F9F9",
        },
        white: "#ffffff",
      },
    },
    fontFamily: {
      sans: ["noto sans tc"],
    },
    fontSize: {
      xs: ["12px", "1"],
      sm: ["14px", "1.5"],
      base: ["16px", "1.5"],
      lg: ["18px", "1.5"],
      xl: ["20px", "1.5"],
      "2xl": ["24px", "1.5"],
    },
    fontWeight: {
      medium: "500",
      regular: "400",
    },
    extend: {},
  },
  plugins: [],
};
