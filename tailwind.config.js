module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    fontSize: {
      sm: ['12px', '14px'],
      base: ['14px', '17px'],
      lg: ['16px', '19px'],
      xl: ['18px', '21px'],
      '2xl': ['20px', '24px'],
      '3xl': ['26px', '30px'],
      '4xl': ['30px', '35px'],
      logo: ['45px', '55px']
    },
    extend: {
      fontFamily: {
        caslon: ['big_caslonmedium'],
        roboto: ['Roboto', 'sans-serif'],
        stix: ['bigCaslon Two Text', 'serif']
      },
      colors: {
        textYellow: "#F5B300",
        backdrop: "rgba(0, 0, 0, 0.1)",
        other: "#3D7DFF",
        gradientt: "#4137FE",
        gradientb: "#0F089F",
        inputBorder: "#9E9E9E",
        titleInput: "#6C6C6C",
        checkbox: "#313131",
        inputbg: "#FAFAFA",
        lightSuccess: "#00C036",
        lightError: "#FF3D3D"
      }
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
          "success": "#05AC34",
          "warning": "#DB7706",
          "error": "#FE0000"
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
