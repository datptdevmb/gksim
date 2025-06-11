module.exports = {
  darkMode: ["selector", '[zaui-theme="dark"]'],
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}", "./src/css/app.scss"],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#1E1A85',
        secondary: '#3993D9',
        accent: '#FFD700',
        muted: '#F5F5F5',
        'input-border': '#D1D5DB',
        danger: '#EF4444',
        success: '#10B981',
        info: '#3B82F6',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
};
