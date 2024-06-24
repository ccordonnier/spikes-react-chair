/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      backgroundColor:{
        'primary': "#3AA39F",
        'primary-hover': "#A2A3B1",
      },
      backgroundImage:{
        'primary-gradient' : "linear-gradient(90deg, rgba(75,135,133,0) 0%, rgba(75,135,133,1) 53%)",
      },
      colors:{
        'primary': "#3AA39F",
        'primary-hover': "#A2A3B1",
        'secondary': "#d1d1d8",
      },
      borderColor:{
        'primary': "#3AA39F",
        'secondary': "#D1D1D8",
        'hover': "#A2A3B1",

      }
    },
  },
  plugins: [],
}

