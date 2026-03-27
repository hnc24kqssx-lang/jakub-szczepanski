/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          void: '#050814',
          deep: '#0a1224',
          panel: '#0f1a32',
          line: '#1e3a5f',
          cyan: '#00d4ff',
          ice: '#7ecbff',
          navy: '#152238',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 212, 255, 0.35), 0 0 60px rgba(0, 212, 255, 0.12)',
        'neon-sm': '0 0 12px rgba(0, 212, 255, 0.4)',
      },
      animation: {
        'scan-line': 'scan 8s linear infinite',
        glitch: 'glitch 2.5s infinite',
        'fade-in': 'fadeIn 0.7s ease forwards',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 2px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
