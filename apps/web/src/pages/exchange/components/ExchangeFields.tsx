import { Card } from 'components/card';
import { FaRandom } from '@crypto/icons';
import { DropdownProps } from '@crypto/ui';
import { FIELDS, CryptoDetails } from '../types';
import { AssetRatesDropdown } from './AssetRatesDropdown';
import { Button, Flex, Input, styled } from '@crypto/design-system';

type ExchangeFieldsProps = {
  coins: CryptoDetails[];
  flipped: boolean;
  baseValue: number;
  targetValue: number;
  isBaseDisabled: boolean;
  isTargetDisabled: boolean;
  selectedCoin: CryptoDetails | null;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onSelectChange: DropdownProps<CryptoDetails>['onChange'];
  onFieldsSwitch(): void;
};

type CoinInputProps = {
  value: number;
  coins: CryptoDetails[];
  selectedCoin: CryptoDetails | null;
  isDisabled: boolean;
  onSelecCoin: DropdownProps<CryptoDetails>['onChange'];
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
};

type UsdInputProps = {
  value: number;
  isDisabled: boolean;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
};

const SwitchButton = styled(Button, {
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$full',
  order: '2',
  position: 'absolute',
  top: '38%',
  right: '47%',
  p: '5px',
});

const CoinInput: React.FC<CoinInputProps> = ({
  value,
  coins,
  isDisabled,
  selectedCoin,
  onInputChange,
  onSelecCoin,
}) => {
  return (
    <Flex
      css={{
        width: '$full',
        height: '$14',
        alignItems: 'center',
        my: '$2',
      }}
    >
      <Input
        css={{ height: '$full', textAlign: 'center', fontSize: '$md' }}
        name={FIELDS.COIN}
        id={FIELDS.COIN}
        type='number'
        value={value}
        onChange={onInputChange}
        disabled={isDisabled}
      />
      <AssetRatesDropdown
        selectedItem={selectedCoin}
        onChange={onSelecCoin}
        items={coins}
        status='success'
      />
    </Flex>
  );
};

const UsdInput: React.FC<UsdInputProps> = ({
  value,
  onInputChange,
  isDisabled,
}) => {
  return (
    <Input
      name={FIELDS.USD}
      id={FIELDS.USD}
      value={value}
      onChange={onInputChange}
      type='number'
      disabled={isDisabled}
      css={{
        width: '$full',
        height: '$14',
        textAlign: 'center',
        fontSize: '$md',
      }}
    />
  );
};

export const ExchangeFields: React.FC<ExchangeFieldsProps> = ({
  coins,
  flipped,
  baseValue,
  targetValue,
  isBaseDisabled,
  isTargetDisabled,
  selectedCoin,
  onInputChange,
  onSelectChange,
  onFieldsSwitch,
}) => {

  const inputs = [
    <CoinInput
      value={baseValue}
      onInputChange={onInputChange}
      isDisabled={isBaseDisabled}
      selectedCoin={selectedCoin}
      onSelecCoin={onSelectChange}
      coins={coins}
    />,
    <UsdInput
      value={targetValue}
      isDisabled={isTargetDisabled}
      onInputChange={onInputChange}
    />,
  ];

  const orderedInputs = flipped ? inputs.slice().reverse() : inputs;
  return (
    <Card
      direction={'column'}
      css={{ position: 'relative', p: '$4', '@bp5': {width: '25%'} }}
      as='form'
    >
      {orderedInputs}
      <SwitchButton
        onClick={(e) => {
          e.preventDefault();
          onFieldsSwitch();
        }}
      >
        <FaRandom />
      </SwitchButton>
    </Card>
  );
};
