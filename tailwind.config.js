/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {    
      colors:{
      "sp-color":"#1DF1F2",
      "bg-1":"#393f4b",
      "blue-light":"#434a58"
    },
    boxShadow:{
      "shadow-sp":"0 3px 5px rgba(0,0,0,0.7)"
    },
      
    },
  },
  plugins: [],
}

