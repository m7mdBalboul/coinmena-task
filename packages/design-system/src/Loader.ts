import { Box } from './Box';
import { styled, keyframes } from '../stitches.config';

const rotate360 = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});
const Loader = styled(Box, {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  background: 'transparent',
  transform: 'translateZ(0)',
  borderTop: '2px solid grey',
  borderRight: '2px solid grey',
  borderLeft: '4px solid black',
  borderBottom: '2px solid grey',
  animation: `${rotate360} 1s linear infinite`,
});

export { Loader };
