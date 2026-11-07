/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: '#F6F7F5',
          secondary: '#EEF1EE',
          surface: '#FFFFFF',
        },
        sidebar: {
          bg: '#172522',
          secondary: '#21332E',
          hover: '#2A403A',
          active: '#344F48',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        content: {
          primary: '#202B27',
          secondary: '#697670',
          muted: '#929C96',
        },
        accent: {
          DEFAULT: '#527D6B',
          hover: '#446859',
          light: '#E7F0EA',
          dark: '#3B594C',
        },
        border: {
          DEFAULT: '#E5E9E5',
          dark: '#D2D8D2',
        },
        status: {
          success: '#398568',
          'success-bg': '#EBF5F0',
          warning: '#B58A49',
          'warning-bg': '#FAF3E8',
          error: '#C16D67',
          'error-bg': '#FBEFEF',
          info: '#65849A',
          'info-bg': '#EFF4F8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        card: '0 2px 8px -2px rgba(23, 37, 34, 0.06), 0 1px 4px -1px rgba(23, 37, 34, 0.04)',
        elevated: '0 10px 25px -5px rgba(23, 37, 34, 0.08), 0 8px 10px -6px rgba(23, 37, 34, 0.04)',
        modal: '0 20px 40px -10px rgba(23, 37, 34, 0.2)',
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
}

