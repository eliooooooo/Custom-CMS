/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/views/*.{html,twig}",
              "./app/views/**/*.{html,twig}",
              "./app/views/**/**/*.{html,twig}"],
    theme: {
      extend: {},
    },
    plugins: [],
  }