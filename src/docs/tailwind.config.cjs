/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
  daisyui: {
    themes: [{
        custom: {         
          "primary": "#f9a8d4",
          "secondary": "#c4b5fd",
          "accent": "#a5b4fc",
          "neutral": "#e5e7eb",
          "base-100": "#374151",
          "info": "#7dd3fc",
          "success": "#86efac",
          "warning": "#fef08a",
          "error": "#fca5a5",
        }
      }]
  },
	plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui')
  ]
};
