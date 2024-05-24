const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#2E5834",
        "light-green": "#407948",
        "terracota-b rown": "#C57D5D",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
