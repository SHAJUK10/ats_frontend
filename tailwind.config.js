/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Slate-based neutral ramp
        ink: {
          50: '#f7f8fa',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#111827',
          950: '#0d1420',
          960: '#070b12',
        },
        // CometCode indigo brand
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Sky highlight
        highlight: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        // Refined score ramp — soft, not traffic-light
        score: {
          low: '#f472b6',
          mid: '#fbbf24',
          high: '#34d399',
        },
      },
      boxShadow: {
        'card': '0 1px 2px 0 rgba(15,23,42,0.04), 0 1px 3px 0 rgba(15,23,42,0.04)',
        'card-hover': '0 4px 12px -2px rgba(15,23,42,0.08), 0 2px 6px -2px rgba(15,23,42,0.04)',
        'pop': '0 12px 32px -8px rgba(15,23,42,0.16), 0 4px 12px -4px rgba(15,23,42,0.08)',
        'glow': '0 0 0 3px rgba(99,102,241,0.12), 0 6px 20px -4px rgba(99,102,241,0.25)',
        'dark-card': '0 1px 2px 0 rgba(0,0,0,0.30), 0 1px 3px 0 rgba(0,0,0,0.20)',
        'dark-card-hover': '0 6px 16px -3px rgba(0,0,0,0.40), 0 2px 6px -2px rgba(0,0,0,0.30)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.45s cubic-bezier(0.16,1,0.3,1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        'shimmer': 'shimmer 1.8s linear infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-800px 0' },
          '100%': { backgroundPosition: '800px 0' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};
