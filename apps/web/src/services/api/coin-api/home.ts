import { ASSETS_TABLE_DATA_MOCK } from './mocks/assetsTableMock';
import axios from 'axios';

const instance = axios.create();

export type TableAssetResponse = {
  status: {
    elapsed: number;
    timestamp: string;
  };
  data: {
    id: string;
    name: string;
    symbol: string;
    metrics: {
      market_data: {
        price_usd: number;
      };
    };
  }[];
};

export type TableAsset = {
  id: string;
  name: string;
  price: number;
  icon: string;
};

export type FetchTableAssetsReturnType = {
  data: TableAssetResponse['data'];
  pageCount: number;
};

const API_MAX_LIMIT = 500;
const getTableAssets = async ({
  pageSize = 10,
  pageIndex,
}: {
  pageSize?: number;
  pageIndex: number;
}): Promise<FetchTableAssetsReturnType> => {
  return await instance
    .get<TableAssetResponse>(
      `https://data.messari.io/api/v2/assets?fields=id,name,symbol,metrics/market_data/price_usd&page=${
        pageIndex + 1
      }&limit=${pageSize}`
    )
    .then((res) => ({
      data: res.data.data,
      pageCount: API_MAX_LIMIT / pageSize,
    }));

  // await sleep(500);
  // return {
  //   data: MOCK.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
  //   pageCount: MOCK.length / pageSize,
  //   // pageCount: 500 / pageSize,
  // };
};

export { getTableAssets };
