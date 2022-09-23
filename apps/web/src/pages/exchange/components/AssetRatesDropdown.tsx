import { Dropdown, DropdownProps } from '@crypto/ui';
import { Box, Flex, styled } from '@crypto/design-system';
import { FaChevronDown, FaChevronUp } from '@crypto/icons';
import { AssetRatesDropdownProps, CryptoDetails } from '../types';

const fallbackIcon =
  'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png';

const Icon = styled(Box, {
  width: '$4',
  height: '$4',
  [`$ svg`]: {
    width: '$full',
    height: '$full',
  },
});

function CryptoItem({
  icon,
  title,
  subTitle,
}: {
  icon: string;
  title: string;
  subTitle: string;
}) {
  return (
    <Flex align={'center'} gap='2'>
      <Box
        as='img'
        src={icon ?? fallbackIcon}
        alt={`${title} Icon`}
        width={24}
        height={24}
        css={{ borderRadius: '$full' }}
      />
      <Flex direction={'column'} gap={1}>
        <Box
          css={{
            fontSize: '12px',
            lineHeight: '12px',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Box>
        <Box css={{ fontSize: '10px', lineHeight: '10px' }}>{subTitle}</Box>
      </Flex>
    </Flex>
  );
}

export function AssetRatesDropdown({
  items,
  status,
  ...rest
}: AssetRatesDropdownProps & DropdownProps<CryptoDetails>) {
  return (
    <Dropdown css={{ position: 'absolute', right: 20 }} {...rest}>
      <Dropdown.Handle<CryptoDetails>
        css={{
          alignItems: 'center',
          borderRadius: '$3xl',
          backgroundColor: '$blue100',
          px: '$2',
        }}
      >
        {({ isOpen, selectedItem }) => {
          return (
            <>
              <Box
                as='img'
                src={
                  selectedItem?.icon ??
                  'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png'
                }
                alt={`${selectedItem?.name} Icon in button`}
                width={24}
                height={24}
                css={{ borderRadius: '$full' }}
              />
              <Dropdown.ToggleButton
                text
                css={{ display: 'inline-flex', gap: '4px' }}
              >
                {selectedItem?.value ?? 'Pick Coin'}
                <Icon>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</Icon>
              </Dropdown.ToggleButton>
            </>
          );
        }}
      </Dropdown.Handle>
      <Dropdown.Body css={{ p: '$1', width: 'max-content' }}>
        {status === 'loading' && <Box>Loading...</Box>}
        {status === 'error' && <Box>Something went Wrong</Box>}
        {status === 'success' && (
          <>
            <Dropdown.Input
              placeholder='Search for crypto'
              css={{ height: '$12' }}
            />
            <Dropdown.List css={{ width: 'max-content' }}>
              {({ inputValue }) =>
                items
                  .filter(
                    (item) =>
                      !inputValue ||
                      item.name.toLowerCase().includes(inputValue) ||
                      item.value.toLowerCase().includes(inputValue) ||
                      item.value.toLowerCase().includes(inputValue)
                  )
                  .map((item, index) => {
                    return (
                      <Dropdown.MenuItem<CryptoDetails>
                        key={item.value}
                        index={index}
                        item={item}
                      >
                        <CryptoItem
                          icon={item.icon}
                          title={item.name}
                          subTitle={'BTC'}
                        />
                      </Dropdown.MenuItem>
                    );
                  })
              }
            </Dropdown.List>
          </>
        )}
      </Dropdown.Body>
    </Dropdown>
  );
}
