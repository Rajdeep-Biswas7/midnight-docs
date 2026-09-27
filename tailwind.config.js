/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './frontend/index.html',
    './frontend/**/*.{ts,tsx,js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Geist Mono', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        // Retain previous aliases
        terminal: {
          base: 'var(--bg-base)',
          elevated: 'var(--bg-elevated)',
          border: 'var(--border-subtle)',
          primary: 'var(--text-primary)',
          muted: 'var(--text-muted)',
          accent: 'var(--accent)',
        },
        'baltic-sea': {
          50: 'var(--color-baltic-sea-50)',
          100: 'var(--color-baltic-sea-100)',
          200: 'var(--color-baltic-sea-200)',
          300: 'var(--color-baltic-sea-300)',
          400: 'var(--color-baltic-sea-400)',
          500: 'var(--color-baltic-sea-500)',
          600: 'var(--color-baltic-sea-600)',
          700: 'var(--color-baltic-sea-700)',
          800: 'var(--color-baltic-sea-800)',
          900: 'var(--color-baltic-sea-900)',
          950: 'var(--color-baltic-sea-950)',
        },
        keppel: {
          50: 'var(--color-keppel-50)',
          100: 'var(--color-keppel-100)',
          200: 'var(--color-keppel-200)',
          300: 'var(--color-keppel-300)',
          400: 'var(--color-keppel-400)',
          500: 'var(--color-keppel-500)',
          600: 'var(--color-keppel-600)',
          700: 'var(--color-keppel-700)',
          800: 'var(--color-keppel-800)',
          900: 'var(--color-keppel-900)',
          950: 'var(--color-keppel-950)',
        },
      },
      boxShadow: {
        bento: 'inset 0 -20px 80px -20px #ffffff0f',
      },
    },
  },
  plugins: [],
};
