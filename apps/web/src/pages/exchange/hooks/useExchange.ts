import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FIELDS, AssetsQueryData } from '../types';
import { getExchangeRate } from 'services/api/coin-api';
import { DropdownProps } from '@crypto/ui';
import { CryptoDetails } from '../types';
import { QueryKey, QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { UseQueryOptions } from '@tanstack/react-query';
import { getAssetsList } from 'services/api/coin-api';
import { IconMap, initializeIconsQuery } from 'services/queries/coin-api';

function assetsExchangeQueryOptions<TData = AssetsQueryData>(): UseQueryOptions<
  AssetsQueryData,
  unknown,
  TData,
  [string]
> {
  return {
    queryKey: ['assets-exchange-data'],
    queryFn: async () => {
      const assets = await getAssetsList();
      return {
        assets,
      };
    },
  };
}

export function loader(queryClient: QueryClient) {
  return async () => {
    const assetsQueryOptions = assetsExchangeQueryOptions();
    const iconsMap = await initializeIconsQuery(queryClient);

    const assetsExchangeData = (queryClient.getQueryData(
      assetsQueryOptions.queryKey as QueryKey
    ) ?? (await queryClient.fetchQuery(assetsQueryOptions))) as AssetsQueryData;
    // ⬇️ return data or fetch it
    console.log({ iconsMap, assetsExchangeData });

    return { iconsMap, assetsExchangeData };
  };
}

const selectAssetData = (
  data: AssetsQueryData,
  icons: IconMap
): Array<CryptoDetails> => {
  const { assets } = data;

  const fallbackIcon = icons[Object.keys(icons)[0]].url;

  return assets.map((asset) => ({
    name: asset.name,
    value: asset.asset_id,
    icon: icons[asset.asset_id]?.url ?? fallbackIcon,
  }));
};

export function useExchange() {
  const [state, setState] = React.useState({
    [FIELDS.COIN]: 0,
    [FIELDS.USD]: 0,
    selectedCoin: null as CryptoDetails | null,
    baseField: FIELDS.COIN,
    targetField: FIELDS.USD,
  });

  const isDefaultDirection = state.baseField === FIELDS.COIN;
  const initialAssetsData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  // get assets
  const assetsResults = useQuery({
    ...assetsExchangeQueryOptions<ReturnType<typeof selectAssetData>>(),
    select: (data) => {
      console.log({ data });

      return selectAssetData(data, initialAssetsData.iconsMap);
    },
    initialData: initialAssetsData.assetsExchangeData,
  });

  // get exchange rate
  const exchangeRateQueryKey = {
    base: state.selectedCoin?.value,
    target: 'USD',
  };
  const exchangeRateResults = useQuery({
    queryKey: ['exchangeRate', exchangeRateQueryKey],
    queryFn: () =>
      getExchangeRate(
        exchangeRateQueryKey.base ?? '',
        exchangeRateQueryKey.target
      ),
    select: (data) => {
      return data.rate;
    },
    enabled: Boolean(state.selectedCoin),
    onSuccess: (data) =>
      setState((old) => {
        const convertedValue = convert(state[state.baseField], data);
        return {
          ...old,
          [old.targetField]: convertedValue,
        };
      }),
  });

  // handlers
  const convert = (val: number, exchangeRate: number) => {
    const conversion = isDefaultDirection ? exchangeRate : 1 / exchangeRate;
    return (val * conversion).toFixed(3);
  };

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const convertedValue = convert(
      +event.target.value,
      exchangeRateResults.data as NonNullable<typeof exchangeRateResults.data>
    );

    setState((old) => ({
      ...old,
      [old.baseField]: +event.target.value,
      [old.targetField]: convertedValue,
    }));
  };

  const onCoinChange: DropdownProps<CryptoDetails>['onChange'] = (event) => {
    setState((old) => ({
      ...old,
      selectedCoin: event,
    }));
  };

  const onFlip = () => {
    setState((old) => ({
      ...old,
      baseField: old.targetField,
      targetField: old.baseField,
    }));
  };

  return {
    state,
    onValueChange,
    onCoinChange,
    onFlip,
    isDefaultDirection,
    assets: assetsResults,
    exchangeRate: exchangeRateResults,
  };
}
