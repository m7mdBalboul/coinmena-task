import { styled } from '../stitches.config';

export const Button = styled('button', {
  all: 'unset',
  userSelect: 'none',
  alignItems: 'center',
  fontWeight: 400,
  padding: '0px 8px',
  backgroundColor: '$blue400',
  color: '$whiteAlpha900',
  cursor: 'pointer',
  height: '2.4rem',
  borderRadius: '$lg',
  fontSize: '$sm',
  borderWidth: '$light',
  borderColor: '$grey900',
  '&:hover': {
    color: '$grey400',
    backgroundColor: '$blue300',
  },
  '&:disabled': {
    cursor: 'default',
    color: '$gray300',
    pointerEvents: 'none',
  },
  variants: {
    color: {
      blue: {
        color: '$blue900',
        border: '2px solid $blue900',
        backgroundColor: 'unset',
        '&:hover': {
          color: '$blue300',
          backgroundColor: 'lightblue',
        },
      },
    },
    size: {
      small: {
        m: '$1',
      },
      medium: {
        m: '$2',
        px: '$4',
      },
    },
    outlined: {
      true: {
        borderColor: 'lightgray',
      },
    },
    text: {
      true: {
        color: '$grey900',
        borderColor: 'none',
        backgroundColor: 'unset',
        '&:hover': {
          backgroundColor: 'unset',
        },
      },
    },
  },
});
