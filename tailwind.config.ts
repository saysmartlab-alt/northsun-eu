import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

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
          mid: '#004AAD',
        },
        yellow: {
          DEFAULT: '#FCC013',
          50: '#fef5d8',
          500: '#FCC013',
          600: '#e0a700',
        },
        gray: {
          light: '#F3F3F3',
          medium: '#6B7280',
          dark: '#111827',
        },
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        syne: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
      },
      fontSize: {
        // Semantic typography scale (from ui-designer.md)
        // tuples: [size, { lineHeight, letterSpacing, fontWeight }]
        display: [
          'clamp(2.25rem, 5.5vw, 5.25rem)',
          { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '800' },
        ],
        h1: [
          'clamp(2.25rem, 4.5vw, 5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '800' },
        ],
        h2: [
          'clamp(1.75rem, 3.5vw, 3.5rem)',
          { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '800' },
        ],
        h3: [
          'clamp(1.25rem, 2vw, 1.75rem)',
          { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        h4: [
          '1.125rem',
          { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '600' },
        ],
        'body-lg': [
          '1.25rem',
          { lineHeight: '1.6', fontWeight: '400' },
        ],
        body: [
          '1.125rem',
          { lineHeight: '1.7', fontWeight: '400' },
        ],
        small: [
          '0.875rem',
          { lineHeight: '1.5', fontWeight: '500' },
        ],
        caption: [
          '0.8125rem',
          { lineHeight: '1.5', fontWeight: '400' },
        ],
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
