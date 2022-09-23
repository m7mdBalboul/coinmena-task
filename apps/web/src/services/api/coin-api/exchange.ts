import { sleep } from '@crypto/ui';
import axios from 'axios';
import { IconMap, iconsSelect } from 'services/queries/coin-api';
import { ASSETS_MOCK } from './mocks/assetsMock';
import { ICONS_MOCK } from './mocks/iconsMock';

const APIS = {
  apiKey: import.meta.env.VITE_API_KEY,
  baseURL: import.meta.env.VITE_BASE_API,
  assetsList: import.meta.env.VITE_ASSETS_API,
  assetsIcons: import.meta.env.VITE_ASSETS_ICONS,
  exchangeRate: import.meta.env.VITE_EXCHANGE_RATES,
};

export const instance = axios.create({
  baseURL: APIS.baseURL,
  headers: {
    'X-CoinAPI-Key': APIS.apiKey,
  },
});

export type AssetsIconsResponse = Array<{
  url: string;
  asset_id: string;
}>;

export type AssetsListResponse = Array<{
  name: string;
  asset_id: string;
  data_end: string;
  price_usd?: number;
  data_start: string;
  type_is_crypto: number;
  data_quote_end: string;
  data_trade_end: string;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  volume_1mth_usd: number;
  data_quote_start: string;
  data_trade_start: string;
  data_orderbook_end: string;
  data_symbols_count: number;
  data_orderbook_start: string;
}>;

export type ExchangeRateResponse = {
  time: string;
  rate: number;
  asset_id_base: string;
  asset_id_quote: string;
};

export const getAssetsList = async (): Promise<AssetsListResponse> => {
  // const response = await instance.get<AssetsListResponse>(APIS.assetsList);
  // return response.data.slice(0, 100);
  await sleep(300);
  return ASSETS_MOCK;
};
export const getAssetsIcons = async (
  returnMap?: boolean
): Promise<AssetsIconsResponse | IconMap> => {
  // const response = await instance.get<AssetsIconsResponse>(APIS.assetsIcons);
  // return returnMap ? iconsSelect(response.data) : response.data;
  await sleep(300);
  return returnMap ? iconsSelect(ICONS_MOCK) : ICONS_MOCK;
};
export const getExchangeRate = async (
  base: string,
  target: string
): Promise<ExchangeRateResponse> => {
  // const response = await instance.get<ExchangeRateResponse>(
  //   `${APIS.exchangeRate}/${base}/${target}`
  // );
  // return response.data;
  await sleep(300);
  return {
    asset_id_base: '',
    asset_id_quote: '',
    time: 'a',
    rate: 232,
  };
};
