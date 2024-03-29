import type { Config } from 'tailwindcss';
const { createThemes } = require('tw-colors');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5rem' }],
      sm: ['0.8125rem', { lineHeight: '1.5rem' }],
      base: ['0.875rem', { lineHeight: '1.625rem' }],
      lg: ['1rem', { lineHeight: '1.5rem' }],
      xl: ['1.125rem', { lineHeight: '1.5rem' }],
      '2xl': ['1.25rem', { lineHeight: '2.125em' }],
      '3xl': ['1.5rem', { lineHeight: '2.125rem' }],
      '4xl': ['1.75rem', { lineHeight: '2.25' }],
      '5xl': ['2rem', { lineHeight: '2.5rem' }],
      '6xl': ['2.25rem', { lineHeight: '3rem' }],
      '7xl': ['2.5rem', { lineHeight: '3.25rem' }],
      '8xl': ['3rem', { lineHeight: '4.125rem' }],
      '9xl': ['3.5rem', { lineHeight: '4.125rem' }],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    createThemes({
      light: {
        fill: {
          primary: '#525ce5',
          secondary: '#ffa70b',
          success: '#00d16d',
          info: '#0bbeff',
          warning: '#ff850b',
          danger: '#ff4c0b',
          text: {
            dark: '#0f1b41',
            main: '#5a7180',
            light: '#cbd5de',
          },
          background: '#f5f7fd',
          link: '#404a68',
        },
        'fill-dark': {
          primary: '#414dec',
          secondary: '#faa104',
          success: '#00c767',
          info: '#04b9fa',
          warning: '#f98005',
          danger: '#f04304',
          text: {
            dark: '#112d42',
            main: '#4b5f6c',
            light: '#9ba1ac',
          },
          link: '#17307a',
        },
        'fill-light': {
          primary: '#525ce5',
          secondary: '#ffa70b',
          success: '#00d16d',
          info: '#0bbeff',
          warning: '#ff850b',
          danger: '#ff4c0b',
          text: {
            dark: '#0f4b41',
            main: '#a57180',
            light: '#b3bac5',
          },
          link: '#273ab5',
        },
        active: {
          primary: '#2f3ced',
          secondary: '#f09900',
          success: '#01bc62',
          info: '#00b1f1',
          warning: '#e26100',
          danger: '#e33f03',
          text: {
            dark: '#1e253c',
            main: '#3d4e59',
            light: '#848b96',
          },
          link: '#f7f8f9',
        },
        outline: {
          primary: '#525ce5',
          secondary: '#ffc168',
          success: '#57d094',
          info: '#00c0cd',
          warning: '#ff5968',
          danger: '#ff6868',
          text: {
            dark: '#0f1b41',
            main: '#eff1fc',
            light: '#2e2e2e',
          },
          link: '#58606a',
        },
        background: '#ffffff',
      },
    }),
  ],
};
export default config;
