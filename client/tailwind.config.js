/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx, jsx, ts, js}"],
  theme: {
    extend: {
      colors: {
        dark: {
          50: "#f5f5f6",
          100: "#e5e6e8",
          200: "#cdcfd4",
          300: "#abafb5",
          400: "#81868f",
          500: "#666b74",
          600: "#575b63",
          700: "#4a4d54",
          800: "#424448",
          900: "#3a3b3f",
          950: "#2b2c30",
        },
        light: {
          50: "#f7f7f7",
          100: "#f0f0f0",
          200: "#e3e3e3",
          300: "#d1d1d1",
          400: "#bfbfbf",
          500: "#aaaaaa",
          600: "#969696",
          700: "#818181",
          800: "#6a6a6a",
          900: "#585858",
          950: "#333333",
        },
      },
    },
  },
  plugins: [],
};

//#242529
