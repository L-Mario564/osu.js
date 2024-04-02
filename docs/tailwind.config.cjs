/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        custom: {
          primary: '#ff7ac6',
          secondary: '#bf95f9',
          accent: '#ffb86b',
          neutral: '#414558',
          'base-100': '#35272e',
          info: '#8be8fd',
          success: '#52fa7c',
          warning: '#f1fa89',
          error: '#ff5757'
        }
      }
    ],
    theme: ['custom']
  }
};
