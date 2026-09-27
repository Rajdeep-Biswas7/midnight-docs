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
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        terminal: {
          base: 'var(--bg-base)',
          elevated: 'var(--bg-elevated)',
          border: 'var(--border-subtle)',
          primary: 'var(--text-primary)',
          muted: 'var(--text-muted)',
          accent: 'var(--accent)',
        },
      },
    },
  },
  plugins: [],
};
