// mới them

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        softGreen: "#70C2B4", // Them mau custom
      },
    },
  },
  plugins: [],
};

export default config;
