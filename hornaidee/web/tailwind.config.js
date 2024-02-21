/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      '092F88' : '#092F88',
      'D9D9D9' : '#D9D9D9',
      '000000' : '#000000',
      'F6F6FB' : '#f6f6fb',
      'FFFFFF' : '#ffffff',
      'C10206' : '#C10206',
    },

    extend: {
      fontFamily: {
        'Poppins': ["Poppins", "sans-serif"],
        'Paytone One': ["Paytone One", "sans-serif"],
      },
    },
  },
  plugins: [],
};
