import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#283618",
      secondary: "#606C38",
      neutral: "#FEFAE0",
      accent: "#BC6C25",
      danger: "#dc2626",
    },
    extend: {
      gridTemplateRows: {
        "custom-cart-layout":
          "min-content minmax(0px, 40%) min-content min-content min-content min-content",
      },
      keyframes: {
        bgLoading: {
          "0%": { backgroundColor: "#606C38" },
          "100%": { backgroundColor: "#606c3873" },
        },
      },
      animation: {
        bgPulse: "bgLoading 3s ease-in-out infinite alternate",
        bgPulseAlter: "bgLoading 3s ease-in-out infinite alternate-reverse",
      },
    },
  },
  plugins: [],
};
export default config;
