import React from 'react';
import { Aside } from 'components/layout';
import { useMatch, useNavigate } from 'react-router-dom';
import { Flex, Box, styled } from '@crypto/design-system';
import { FaHome, FaExchangeAlt, IconBaseProps } from '@crypto/icons';

type MenuItemProps = {
  path: string;
  icon: React.ReactNode;
  title: React.ReactNode;
};

const iconProps: IconBaseProps = {
  size: '1.5rem',
};

const ROUTES: Array<MenuItemProps> = [
  {
    icon: <FaHome {...iconProps} />,
    title: 'Home',
    path: '/home',
  },
  {
    icon: <FaExchangeAlt {...iconProps} />,
    title: 'Exchange',
    path: '/exchange',
  },
];

const Text = styled(Box, {
  fontSize: 'medium',
  color: 'CurrentColor',
});

const menuItemContainerVariants = {
  active: {
    true: {
      fontWeight: 'bold',
      color: '$blue900',
      borderLeftColor: '$blue900',
      borderLeftWidth: '$4px',
      borderLeftStyle: 'solid',
    },
    false: {},
  },
};

const MenuItemContainer = styled(Flex, {
  px: '$3',
  gap: '$4',
  height: '$8',
  width: '$full',
  cursor: 'pointer',
  alignItems: 'center',
  variants: {
    ...menuItemContainerVariants,
  },
  '&:hover': {
    ...menuItemContainerVariants.active.true,
  },
});

function MenuItem({ icon, path, title }: MenuItemProps) {
  const navigate = useNavigate();
  const match = useMatch(path);

  const onClick = () => {
    navigate(path);
  };
  return (
    <MenuItemContainer onClick={onClick} active={match?.pathname === path}>
      {icon}
      <Text as='span'>{title}</Text>
    </MenuItemContainer>
  );
}

function Sidebar() {
  return (
    <Aside>
      <Flex
        direction={'column'}
        gap='4'
        css={{ width: '$full', padding: '$3 0px' }}
      >
        {ROUTES.map((route) => (
          <MenuItem {...route} key={`menu-item-${route.path}`} />
        ))}
      </Flex>
    </Aside>
  );
}

export { Sidebar };
