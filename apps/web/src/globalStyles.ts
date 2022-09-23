import { globalCss } from '@crypto/design-system';

export const globalCssSheet = globalCss({
  ':root': {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    fontSynthesis: 'none',
    webkitTextSizeAdjust: '$full',
    mozOsxFontSmoothing: 'grayscale',
    color: '$blackAlpha900',
    webkitFontSmoothing: 'antialiased',
    textRendering: 'optimizeLegibility',
    fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
    ['&::-webkit-scrollbar-track']: {
      boxShadow: 'inset 0 0 5px grey',
      borderRadius: '10px',
    },

    /* Handle */
    ['&::-webkit-scrollbar-thumb']: {
      background: '$gray200',
      borderRadius: '10px',
    },

    /* Handle on hover */
    ['&::-webkit-scrollbar-thumb:hover']: {
      background: "$green400",
    },
  },
  body: {
    margin: 0,
    display: 'flex',
    width: '100vw',
    height: '100vh',
    maxWidth: '100vw',
    overflow: 'hidden',
  },
  '#root': {
    width: '$full',
    height: '$full',
    display: 'flex',
    flexDirection: 'column',
  },
});
