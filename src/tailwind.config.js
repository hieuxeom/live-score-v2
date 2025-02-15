/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': {
        DEFAULT: '#E2474B',
        50: '#FBE6E6',
        100: '#F8D4D5',
        200: '#F3B1B2',
        300: '#ED8D90',
        400: '#E86A6D',
        500: '#E2474B',
        600: '#D02125',
        700: '#A0191D',
        800: '#6F1214',
        900: '#3F0A0B',
        950: '#260607'
      },
      'secondary': {
        DEFAULT: '#2F3A56',
        50: '#AEB9D3',
        100: '#9CA9C9',
        200: '#7889B5',
        300: '#576B9F',
        400: '#43527A',
        500: '#2F3A56',
        600: '#2A334C',
        700: '#242D42',
        800: '#1F2638',
        900: '#191F2E',
        950: '#171C29'
      },
      success: {
        DEFAULT: '#53DD6C',
        50: '#D9F8DF',
        100: '#CAF5D2',
        200: '#ACEFB8',
        300: '#8FE99F',
        400: '#71E385',
        500: '#53DD6C',
        600: '#29CF47',
        700: '#20A037',
        800: '#167127',
        900: '#0D4217',
        950: '#092B0F'
      },
      danger: {
        DEFAULT: '#C1292E',
        50: '#FBECEC',
        100: '#F6D4D6',
        200: '#ECA6A8',
        300: '#E2787B',
        400: '#D84A4E',
        500: '#C1292E',
        600: '#9F2226',
        700: '#7E1B1E',
        800: '#5C1416',
        900: '#3A0C0E',
        950: '#2A090A'
      },
      warning: {
        DEFAULT: '#FFC100',
        50: '#FFF9E5',
        100: '#FFF3CC',
        200: '#FFE699',
        300: '#FFDA66',
        400: '#FFCD33',
        500: '#FFC100',
        600: '#D19E00',
        700: '#A37C00',
        800: '#755900',
        900: '#473600',
        950: '#302500'
      },
      light: "#FCFAFA",
      dark: {
        DEFAULT: '#292929',
        50: '#D5D5D5',
        100: '#C2C2C2',
        200: '#9C9C9C',
        300: '#767676',
        400: '#4F4F4F',
        500: '#292929',
        600: '#212121',
        700: '#1A1A1A',
        800: '#121212',
        900: '#0A0A0A',
        950: '#070707'
      },
      gray: {
        DEFAULT: "#6b7280",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
      white: "#ffffff",
      muted: {
        DEFAULT: "#AAABB9",
        foreground: "#1B2232"
      },
    },
    extend: {
      boxShadow: {
        "primary": {
          1: "0px 8px 0px 0px #E2474B"
        },
        "secondary": {
          1: "0px 8px 0px 0px #2F3A56",
          2: "0px 8px 0px 0px #406D96"
        },

      },
      backgroundImage: {
        'scroll-box': `
          linear-gradient(to top, white, white), 
          linear-gradient(to top, white, white), 
          linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0)), 
          linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0))
        `,
        'primary-gradient': `linear-gradient(147deg, rgba(226, 71, 75, 1) 0%, rgba(47, 58, 86, 1) 100%)`,
      },
    }
  },
  plugins: [],
}