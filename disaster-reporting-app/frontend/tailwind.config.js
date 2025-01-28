/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'federal': '#03045e',
        'marian': '#023e8a',
        'honolulu': '#0077b6',
        'blue-green': '#0096c7',
        'pacific': '#00b4d8',
        'sky-vivid': '#48cae4',
        'non-photo': '#90e0ef',
        'non-photo-light': '#ade8f4',
        'light-cyan': '#caf0f8',
      },
    },
  },
  plugins: [],
}