/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx, jsx, ts, js}"],
  theme: {
    extend: {
      colors: {
        dark: {
          50: "#f5f5f6",
          100: "#e5e6e8",
          200: "#cecfd3",
          300: "#acadb4",
          400: "#82848e",
          500: "#676873",
          600: "#585962",
          700: "#4b4b53",
          800: "#424348",
          900: "#3a3a3f",
          950: "#0a0a0b",
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
