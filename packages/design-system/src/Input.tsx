import React from 'react';
import { styled } from '../stitches.config';

export const PrimitiveInput = styled('input', {
  // Reset
  appearance: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  margin: '0',
  outline: 'none',
  color: '$blue900',
  fontWeight: '$bold',
  px: '$4',
  width: '100%',
  borderRadius: '$md',
  borderWidth: '0',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  my: '$2',

  // Custom
  backgroundColor: 'white',
  boxShadow: 'inset 0 0 0 1px $colors$blackAlpha400',
  fontVariantNumeric: 'tabular-nums',

  '&:-webkit-autofill': {
    boxShadow:
      'inset 0 0 0 1px $colors$blue600, inset 0 0 0 100px $colors$blue300',
  },

  '&:-webkit-autofill::first-line': {
    fontFamily: '$untitled',
    color: 'black',
  },

  '&:focus': {
    boxShadow:
      'inset 0px 0px 0px 1px $colors$blue600, 0px 0px 0px 1px $colors$blue600',
    '&:-webkit-autofill': {
      boxShadow:
        'inset 0px 0px 0px 1px $colors$blue600, 0px 0px 0px 1px $colors$blue600, inset 0 0 0 100px $colors$blue300',
    },
  },
  '&::placeholder': {
    color: '$colors$blackAlpha700',
  },
  '&:disabled': {
    pointerEvents: 'none',
    backgroundColor: '$colors$blackAlpha200',
    borderRadius: '$md',
    color: '$colors$blackAlpha800',
    cursor: 'not-allowed',
    '&::placeholder': {
      color: '$slate7',
    },
  },
  '&:read-only': {
    backgroundColor: '$colors$blackAlpha200',
    '&:focus': {
      boxShadow: 'inset 0px 0px 0px 1px $colors$blackAlpha400',
    },
  },
});

export const Input: React.FC<React.ComponentProps<typeof PrimitiveInput>> = (
  props
) => {
  const handleFocus: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    event.target.select();

  return <PrimitiveInput onFocus={handleFocus} {...props} />;
};
