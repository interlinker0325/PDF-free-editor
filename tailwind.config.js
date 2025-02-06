module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    fontSize: {
      sm: ['13px', '16px'],
      base: ['16px', '20px'],
      lg: ['18px', '22px'],
      xl: ['20px', '24px'],
      '2xl': ['22px', '28px'],
      '3xl': ['28px', '34px'],
      '4xl': ['34px', '40px'],
      logo: ['50px', '60px'],
    },
    extend: {
      fontFamily: {
        caslon: [
          'big_caslonmedium'
        ],
        roboto: [
          'Roboto',
          'sans-serif'
        ],
        stix: [
          'bigCaslon Two Text',
          'serif'
        ]
      },
      colors: {
        textYellow: '#F5B300',
        backdrop: 'rgba(0, 0, 0, 0.1)',
        other: '#3D7DFF',
        gradientt: '#4137FE',
        gradientb: '#0F089F',
        inputBorder: '#9E9E9E',
        titleInput: '#6C6C6C',
        checkbox: '#313131',
        inputbg: '#FAFAFA',
        lightSuccess: '#00C036',
        lightError: '#FF3D3D',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        backgrounPrimary: "#0C1E48",
        bgButtonSecundary: '#5F79AE',
        bgFooter: '#222130',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      backgroundImage: {
        bgHeader: 'linear-gradient(to right, #0C067A, #0F089F, #1A14FF)',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}
