import { Flex, styled } from '@crypto/design-system';

export const Card = styled(Flex, {
  p: '$2',
  m: 'auto',
  width: '50%',
  borderRadius: '$lg',
  background: 'White',
  alignItems: 'center',
  height: 'fit-content',
  '@bp2': {
    width: '100%',
  }
});
