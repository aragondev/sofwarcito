/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx,svg}',
    './src/assets/svg/*.{svg}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx,svg}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx,svg}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx,svg}',
  ],
  theme: {
    minWidth: {
      '40': '10rem',
      '1/3': '33.333333%;',
    },
    minHeight:{
      '20': '5rem',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
