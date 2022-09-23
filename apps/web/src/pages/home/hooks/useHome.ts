import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { PaginationState } from '@tanstack/react-table';
import { IconMap, initializeIconsQuery } from 'services/queries/coin-api';
import {
  QueryKey,
  useQuery,
  QueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import {
  TableAsset,
  getTableAssets,
  FetchTableAssetsReturnType,
} from 'services/api/coin-api';

const assetsTableQuery = (
  option: PaginationState
): UseQueryOptions<
  FetchTableAssetsReturnType,
  unknown,
  ReturnType<typeof selectData>,
  [string, PaginationState]
> => ({
  queryKey: ['assets', option],
  queryFn: () => getTableAssets(option),
  staleTime: 1000 * 60 * 2,
});

const INITIAL_QUERY_KEY: PaginationState = { pageIndex: 0, pageSize: 10 };
function loader(queryClient: QueryClient) {
  return async () => {
    const tableAssetsQueryOptions = assetsTableQuery(INITIAL_QUERY_KEY);
    const iconsMap = await initializeIconsQuery(queryClient);
    const tableAssets = (queryClient.getQueryData(
      tableAssetsQueryOptions.queryKey as QueryKey
    ) ??
      (await queryClient.fetchQuery(
        tableAssetsQueryOptions
      ))) as FetchTableAssetsReturnType;

    return {
      iconsMap,
      tableAssets,
    };
  };
}

const selectData = (data: FetchTableAssetsReturnType, iconsMap: IconMap) => {
  return {
    assets: data.data.map((el) => ({
      name: el.name,
      id: el.id,
      price: el.metrics.market_data.price_usd,
      icon:
        iconsMap[el.symbol]?.url ??
        'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Bitcoin-BTC-icon.png',
    })) as TableAsset[],
    pageSize: data.pageCount,
  };
};

function useHome() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  const queryResults = useQuery({
    ...assetsTableQuery(pagination),
    select: (data) => {
      return selectData(data, initialData.iconsMap);
    },
    initialData: () => {
      if (
        Object.entries(INITIAL_QUERY_KEY).every(
          ([key, value]) => pagination[key as keyof PaginationState] === value
        )
      ) {
        return initialData.tableAssets;
      }
    },
  });

  const paginationState = {
    ...pagination,
    pageCount: queryResults.data?.pageSize ?? 1,
  };
  return {
    queryResults,
    paginationState,
    onPaginationChange: setPagination,
  };
}

export { useHome, loader };
