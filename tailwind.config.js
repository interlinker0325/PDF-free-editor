module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        '80': '80vh'
      },
      colors: {
        textYellow: '#F5B300',
        backdrop: "rgba(0, 0, 0, 0.5)"
      },
    },
  },
  variants: {
    extend: {},
  },
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require('tailwindcss-textshadow'),
    require("daisyui"),
    require('@tailwindcss/line-clamp')
  ],
  // daisyUI config (optional)
  daisyui: {
    themes: [
      {
        "2monkeys": {
          "primary": "#2015FB",
          "secondary": "#E7E7E7",
          "accent": "#51A800",
          "neutral": "#F2F2F2",
          "base-100": "#FFFFFF",
          "info": "#2463EB",
          "success": "#16A249",
          "warning": "#DB7706",
          "error": "#DC2828"
        }
      }
    ],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: ""
  },
}
