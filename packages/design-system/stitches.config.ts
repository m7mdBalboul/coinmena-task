import { createStitches } from '@stitches/react';

import type {
  PropertyValue as __PropertyValue,
  CSS as __CSS,
  CSSProperties,
} from '@stitches/react';

export type PropertyValue<
  Property extends keyof CSSProperties,
  Config = null
> = __PropertyValue<Property, Config>;

// import type { CSS as __CSS, CSSProperties } from '@stitches/react';

// export const $$PropertyValue = __$$PropertyValue;
// export type PropertyValue<
//   Property extends keyof CSSProperties,
//   Config = null
// > = Config extends null
//   ? { readonly [K in typeof $$PropertyValue]: Property }
//   : Config extends { [K: string]: any }
//   ? __CSS<{
//       media: Config['media'];
//       theme: Config['theme'];
//       themeMap: Config['themeMap'];
//       utils: Config['utils'];
//     }>[Property]
//   : never;

const stitches = createStitches({
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      whiteAlpha50: 'rgba(255, 255, 255, 0.04)',
      whiteAlpha100: 'rgba(255, 255, 255, 0.06)',
      whiteAlpha200: 'rgba(255, 255, 255, 0.08)',
      whiteAlpha300: 'rgba(255, 255, 255, 0.16)',
      whiteAlpha400: 'rgba(255, 255, 255, 0.24)',
      whiteAlpha500: 'rgba(255, 255, 255, 0.36)',
      whiteAlpha600: 'rgba(255, 255, 255, 0.48)',
      whiteAlpha700: 'rgba(255, 255, 255, 0.64)',
      whiteAlpha800: 'rgba(255, 255, 255, 0.80)',
      whiteAlpha900: 'rgba(255, 255, 255, 0.92)',
      blackAlpha50: 'rgba(0, 0, 0, 0.04)',
      blackAlpha100: 'rgba(0, 0, 0, 0.06)',
      blackAlpha200: 'rgba(0, 0, 0, 0.08)',
      blackAlpha300: 'rgba(0, 0, 0, 0.16)',
      blackAlpha400: 'rgba(0, 0, 0, 0.24)',
      blackAlpha500: 'rgba(0, 0, 0, 0.36)',
      blackAlpha600: 'rgba(0, 0, 0, 0.48)',
      blackAlpha700: 'rgba(0, 0, 0, 0.64)',
      blackAlpha800: 'rgba(0, 0, 0, 0.80)',
      blackAlpha900: 'rgba(0, 0, 0, 0.92)',
      gray50: '#F7FAFC',
      gray100: '#EDF2F7',
      gray200: '#E2E8F0',
      gray300: '#CBD5E0',
      gray400: '#A0AEC0',
      gray500: '#718096',
      gray600: '#4A5568',
      gray700: '#2D3748',
      gray800: '#1A202C',
      gray900: '#171923',
      red50: '#FFF5F5',
      red100: '#FED7D7',
      red200: '#FEB2B2',
      red300: '#FC8181',
      red400: '#F56565',
      red500: '#E53E3E',
      red600: '#C53030',
      red700: '#9B2C2C',
      red800: '#822727',
      red900: '#63171B',
      orange50: '#FFFAF0',
      orange100: '#FEEBC8',
      orange200: '#FBD38D',
      orange300: '#F6AD55',
      orange400: '#ED8936',
      orange500: '#DD6B20',
      orange600: '#C05621',
      orange700: '#9C4221',
      orange800: '#7B341E',
      orange900: '#652B19',
      yellow50: '#FFFFF0',
      yellow100: '#FEFCBF',
      yellow200: '#FAF089',
      yellow300: '#F6E05E',
      yellow400: '#ECC94B',
      yellow500: '#D69E2E',
      yellow600: '#B7791F',
      yellow700: '#975A16',
      yellow800: '#744210',
      yellow900: '#5F370E',
      green50: '#F0FFF4',
      green100: '#C6F6D5',
      green200: '#9AE6B4',
      green300: '#68D391',
      green400: '#48BB78',
      green500: '#38A169',
      green600: '#2F855A',
      green700: '#276749',
      green800: '#22543D',
      green900: '#1C4532',
      teal50: '#E6FFFA',
      teal100: '#B2F5EA',
      teal200: '#81E6D9',
      teal300: '#4FD1C5',
      teal400: '#38B2AC',
      teal500: '#319795',
      teal600: '#2C7A7B',
      teal700: '#285E61',
      teal800: '#234E52',
      teal900: '#1D4044',
      blue50: '#ebf8ff',
      blue100: '#bee3f8',
      blue200: '#90cdf4',
      blue300: '#63b3ed',
      blue400: '#4299e1',
      blue500: '#3182ce',
      blue600: '#2b6cb0',
      blue700: '#2c5282',
      blue800: '#2a4365',
      blue900: '#1A365D',
      cyan50: '#EDFDFD',
      cyan100: '#C4F1F9',
      cyan200: '#9DECF9',
      cyan300: '#76E4F7',
      cyan400: '#0BC5EA',
      cyan500: '#00B5D8',
      cyan600: '#00A3C4',
      cyan700: '#0987A0',
      cyan800: '#086F83',
      cyan900: '#065666',
      purple50: '#FAF5FF',
      purple100: '#E9D8FD',
      purple200: '#D6BCFA',
      purple300: '#B794F4',
      purple400: '#9F7AEA',
      purple500: '#805AD5',
      purple600: '#6B46C1',
      purple700: '#553C9A',
      purple800: '#44337A',
      purple900: '#322659',
      pink50: '#FFF5F7',
      pink100: '#FED7E2',
      pink200: '#FBB6CE',
      pink300: '#F687B3',
      pink400: '#ED64A6',
      pink500: '#D53F8C',
      pink600: '#B83280',
      pink700: '#97266D',
      pink800: '#702459',
      pink900: '#521B41',
    },
    fontSizes: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
    },
    media: {
      bp1: '(min-width: 520px)',
      bp2: '(min-width: 900px)',
      bp3: '(min-width: 1200px)',
      bp4: '(min-width: 1800px)',
      motion: '(prefers-reduced-motion)',
      hover: '(any-hover: hover)',
      dark: '(prefers-color-scheme: dark)',
      light: '(prefers-color-scheme: light)',
    },
    borderWidths: {
      none: 0,
      light: '1px',
      medium: '2px',
      bold: '4px',
      extra: '8px',
    },
    radii: {
      none: '0',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    space: {
      full: '100%',
      px: '1px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    sizes: {
      full: '100%',
      px: '1px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    shadows: {
      xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
      inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      none: 'none',
      'dark-lg':
        'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px',
    },
    fontWeights: {
      light: '300',
      medium: '500',
      bold: '700',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
  },
  media: {
    bp1: '(max-width: 520px)',
    bp2: '(max-width: 900px)',
    bp3: '(max-width: 1200px)',
    bp4: '(max-width: 1800px)',
    bp5: '(min-width: 900px)',
  },
  utils: {
    p: (value: PropertyValue<'padding'>) => ({
      padding: value,
    }),
    pt: (value: PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (value: PropertyValue<'margin'>) => ({
      margin: value,
    }),
    mt: (value: PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: PropertyValue<'marginRight'>) => ({
      marginRight: value,
    }),
    mb: (value: PropertyValue<'marginBottom'>) => ({
      marginBottom: value,
    }),
    ml: (value: PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
    }),
    mx: (value: PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),

    ta: (value: PropertyValue<'textAlign'>) => ({ textAlign: value }),

    fd: (value: PropertyValue<'flexDirection'>) => ({
      flexDirection: value,
    }),
    fw: (value: PropertyValue<'flexWrap'>) => ({ flexWrap: value }),

    ai: (value: PropertyValue<'alignItems'>) => ({
      alignItems: value,
    }),
    ac: (value: PropertyValue<'alignContent'>) => ({
      alignContent: value,
    }),
    jc: (value: PropertyValue<'justifyContent'>) => ({
      justifyContent: value,
    }),
    as: (value: PropertyValue<'alignSelf'>) => ({ alignSelf: value }),
    fg: (value: PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
    fs: (value: PropertyValue<'flexShrink'>) => ({
      flexShrink: value,
    }),
    fb: (value: PropertyValue<'flexBasis'>) => ({ flexBasis: value }),

    bc: (value: PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),

    br: (value: PropertyValue<'borderRadius'>) => ({
      borderRadius: value,
    }),
    btrr: (value: PropertyValue<'borderTopRightRadius'>) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value: PropertyValue<'borderBottomRightRadius'>) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value: PropertyValue<'borderBottomLeftRadius'>) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value: PropertyValue<'borderTopLeftRadius'>) => ({
      borderTopLeftRadius: value,
    }),

    bs: (value: PropertyValue<'boxShadow'>) => ({ boxShadow: value }),

    lh: (value: PropertyValue<'lineHeight'>) => ({
      lineHeight: value,
    }),

    ox: (value: PropertyValue<'overflowX'>) => ({ overflowX: value }),
    oy: (value: PropertyValue<'overflowY'>) => ({ overflowY: value }),

    pe: (value: PropertyValue<'pointerEvents'>) => ({
      pointerEvents: value,
    }),
    us: (value: PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    userSelect: (value: PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    size: (value: PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),

    appearance: (value: PropertyValue<'appearance'>) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    backgroundClip: (value: PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
  },
});

export const {
  css,
  theme,
  styled,
  config,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
} = stitches;

export type StyledComponent = typeof styled;
export type CSS = __CSS<typeof config>;
