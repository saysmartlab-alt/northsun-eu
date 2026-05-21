import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#030057',
          50: '#e6e6f3',
          100: '#b4b3d6',
          500: '#030057',
          900: '#02003d',
        },
        yellow: {
          DEFAULT: '#FCC013',
          50: '#fef5d8',
          500: '#FCC013',
          600: '#e0a700',
        },
        'logo-blue': '#004AAD',
      },
      fontFamily: {
        sans: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        syne: ['var(--font-syne)', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
      },
    },
  },
  plugins: [],
}

export default config
