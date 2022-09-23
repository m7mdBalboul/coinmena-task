import React from 'react';
import { useAuth } from 'context/auth';
import { FaBars } from 'react-icons/fa';
import { HeaderParts, MENU_WIDTH } from 'components/layout';
import { Button, Flex, styled } from '@crypto/design-system';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { isMobile } from '@crypto/ui';

const Title = styled(Link, {
  color: 'CurrentColor',
  fontWeight: 'bold',
  textDecoration: 'none',
  fontSize: 'large',
});

function Header() {
  const navigate = useNavigate();
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(!isMobile());
  const { isAuthenticated, currentUser, logout } = useAuth();

  const onLogout = () => {
    navigate('/home');
    logout();
  };
  const onMenuClick = () => {
    setIsSideNavOpen((isOpen) => !isOpen);
  };
  const location = useLocation();

  return (
    <HeaderParts.Container data-open={isSideNavOpen}>
      <HeaderParts.SideNavArea>
        <Title to='home'>CRYPTO</Title>
        <Button text onClick={onMenuClick}>
          <FaBars />
        </Button>
      </HeaderParts.SideNavArea>
      <HeaderParts.Content
        css={{
          justifyContent: 'flex-end',
          paddingLeft: isSideNavOpen ? `${MENU_WIDTH}` : '0px',
        }}
      >
        <Flex
          align='center'
          justify={isSideNavOpen ? 'end' : 'between'}
          css={{ width: '100%' }}
        >
          {!isSideNavOpen && (
            <Button text onClick={onMenuClick}>
              <FaBars />
            </Button>
          )}
          {isAuthenticated ? (
            <Flex
              justify={'between'}
              align='center'
              css={{ width: '$full', px: '$3' }}
            >
              <Flex direction={'column'} css={{ gap: '$1' }}>
                <div>{currentUser.email}</div>
                <div>{currentUser.name}</div>
              </Flex>
              <Button onClick={onLogout}>Logout</Button>
            </Flex>
          ) : (
            <Button
              color='blue'
              size='medium'
              onClick={() => {
                navigate(location.pathname + '/login');
              }}
            >
              Log in
            </Button>
          )}
        </Flex>
      </HeaderParts.Content>
    </HeaderParts.Container>
  );
}

export { Header };
