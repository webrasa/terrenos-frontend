/* eslint-disable import/no-extraneous-dependencies, global-require */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },

    extend: {
      colors: {
        // You can change the following color (primary) to match your branding
        primary: {
          100: '#c0e6cd',
          200: '#97d6ad',
          300: '#6bc68c',
          400: '#46ba74',
          500: '#0eae5c',
          600: '#009f52',
          700: '#008d46',
          800: '#007c3b',
          900: '#005d27',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
      },
      borderRadius: {
        '1.5xl': '0.875rem',
      },
      lineHeight: {
        hero: '3.7rem',
      },
      width: {
        'fit-content': 'fit-content',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
