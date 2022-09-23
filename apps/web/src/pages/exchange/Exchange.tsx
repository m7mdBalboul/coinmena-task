import { FIELDS } from './types';
import { useExchange } from './hooks';
import { ExchangeFields } from './components/ExchangeFields';

export function Exchange() {
  const {
    state,
    assets,
    exchangeRate,
    onFlip,
    onValueChange,
    onCoinChange,
    isDefaultDirection,
  } = useExchange();

  const coins = assets.data;
  const isSrcDisabled =
    !isDefaultDirection ||
    !state.selectedCoin ||
    exchangeRate.status !== 'success';
  const isTargetDisabled = isDefaultDirection || !state.selectedCoin;

  return (
    <ExchangeFields
      coins={coins}
      selectedCoin={state.selectedCoin}
      flipped={!isDefaultDirection}
      baseValue={state[FIELDS.COIN]}
      targetValue={state[FIELDS.USD]}
      isBaseDisabled={isSrcDisabled}
      isTargetDisabled={isTargetDisabled}
      onInputChange={onValueChange}
      onSelectChange={onCoinChange}
      onFieldsSwitch={onFlip}
    />
  );
}
