import { Box, Button, Flex } from '@crypto/design-system';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();
  return (
    <Flex direction={'column'} gap={'2'}>
      <Box css={{ color: '$red400' }}>Something Went Wrong</Box>
      <Flex gap={'4'}>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Return to Previous Page
        </Button>
        <Button
          onClick={() => {
            navigate('home', { replace: true });
          }}
        >
          Return to Home
        </Button>
      </Flex>
    </Flex>
  );
}

export default Error;
