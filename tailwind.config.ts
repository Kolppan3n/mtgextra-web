import type { Config } from 'tailwindcss'

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: {
          white: colors.stone['50'],
          black: colors.stone['950']
        },
        background: {
          light: colors.stone['700'],
          DEFAULT: colors.stone['800'],
          dark: colors.stone['950'],
        },
        gold: '#D0AF71',
        brass: '#A99164'
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      fontSize: {
        header: ['1.875rem', '2.25rem'],
        body: ['1.125rem', '1.75rem'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    plugin(function ({matchUtilities, theme}: any) {
      matchUtilities(
        {
          'text-shadow': (value: any) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

export default config