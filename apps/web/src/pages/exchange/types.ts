import { AssetsListResponse } from 'services/api/coin-api';
import { QueryStatus } from '@tanstack/react-query';

export enum FIELDS {
  COIN = 'coin',
  USD = 'usd',
}

export type AssetsQueryData = {
  assets: AssetsListResponse;
};

export type CryptoDetails = {
  value: string;
  icon: string;
  name: string;
};

export type AssetRatesDropdownProps = {
  items: CryptoDetails[];
  status: QueryStatus;
};
