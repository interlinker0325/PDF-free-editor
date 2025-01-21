module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    fontSize: {
      sm: [
        '12px',
        '14px'
      ],
      base: [
        '14px',
        '17px'
      ],
      lg: [
        '16px',
        '19px'
      ],
      xl: [
        '18px',
        '21px'
      ],
      '2xl': [
        '20px',
        '24px'
      ],
      '3xl': [
        '26px',
        '30px'
      ],
      '4xl': [
        '30px',
        '35px'
      ],
      logo: [
        '45px',
        '55px'
      ]
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
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}
