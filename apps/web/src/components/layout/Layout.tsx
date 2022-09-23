import type { CSS } from '@crypto/design-system';
import { Flex, styled, keyframes } from '@crypto/design-system';
import { isMobile } from '@crypto/ui';

export const MENU_WIDTH: CSS['width'] = isMobile() ? '100%' : '$56';
export const HEADER_HEIGHT: CSS['height'] = '$14';
const fadeIn = keyframes({
  '0%': { left: `-${MENU_WIDTH}` },
  '100%': { left: 0 },
});
const fadeOut = keyframes({
  '0%': { left: 0 },
  '100%': { left: `-${MENU_WIDTH}` },
});

const HeaderParts = {
  Container: styled('header', Flex, {
    top: '0px',
    flex: 'none',
    width: '$full',
    position: 'sticky',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    backgroundColor: '$blue100',
  }),
  SideNavArea: styled(Flex, {
    p: '$4',
    width: MENU_WIDTH,
    height: '$full',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRightWidth: '$light',
    borderRightStyle: 'solid',
    borderRightColor: '$blackAlpha200',
    position: 'absolute',
    backgroundColor: '$blue50',
  }),
  Content: styled(Flex, {
    width: '$full',
    height: '$full',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }),
};

const Aside = styled('aside', Flex, {
  top: HEADER_HEIGHT,
  width: MENU_WIDTH,
  height: `calc($full - ${HEADER_HEIGHT})`,
  position: 'absolute',
  backgroundColor: '$blue50',
  borderRightWidth: '$light',
  borderRightStyle: 'solid',
  borderRightColor: '$blackAlpha200',
  zIndex: 4,
});

const Main = styled('main', Flex, {
  flex: 'auto',
  backgroundColor: '$blackAlpha50',
  width: '$full',
  height: '$full',
  overflowY: 'auto',
});

// Whenever the Header has a data-open=true then open the Aside
// Just Experimenting with :has 😅 could be done with state but why not😅
const Container = styled(Flex, {
  width: '$full',
  height: '$full',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  [`&:has(${HeaderParts.Container}[data-open="true"]) ${Aside}`]: {
    left: 0,
    animation: `${fadeIn} 200ms`,
  },
  [`&:has(${HeaderParts.Container}[data-open="false"]) ${Aside}`]: {
    animation: `${fadeOut} 200ms`,
    left: `-${MENU_WIDTH}`,
  },
  [`&:has(${HeaderParts.Container}[data-open="true"]) ${HeaderParts.SideNavArea}`]:
    {
      left: 0,
      animation: `${fadeIn} 200ms`,
    },
  [`&:has(${HeaderParts.Container}[data-open="false"]) ${HeaderParts.SideNavArea}`]:
    {
      animation: `${fadeOut} 200ms`,
      left: `-${MENU_WIDTH}`,
    },
});

export { Aside, Main, Container, HeaderParts };
