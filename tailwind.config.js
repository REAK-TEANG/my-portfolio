export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bagel Fat One"', 'cursive'],
        handwriting: ['Caveat', 'cursive'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        paper: '#f6f5f1',
        ink: '#2b2a29',
        accent: {
          yellow: '#fadb5f',
          pink: '#f783ac',
          green: '#8ce99a',
          blue: '#74c0fc'
        }
      },
      backgroundImage: {
        'ruled-paper': 'linear-gradient(transparent 95%, #e0dcd3 95%)',
      },
      backgroundSize: {
        'ruled': '100% 32px',
      }
    },
  },
  plugins: [],
}
