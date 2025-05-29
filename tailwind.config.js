module.exports = {
  darkMode: ["selector", '[zaui-theme="dark"]'],
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      fontFamily: {
        mono: ["Roboto Mono", "monospace"],
      },
      colors: {
        'primary': '#1E1A85',
        // 'secondary': '#D1D5DB',
        // 'input-border': '#D1D5DB',
      }
    },
  },
};
