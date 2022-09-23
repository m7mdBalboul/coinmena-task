import { AssetsIconsResponse, getAssetsIcons } from 'services/api/coin-api';
import { QueryClient, QueryKey, UseQueryOptions } from '@tanstack/react-query';

export type IconMap = {
  [assetID: string]: AssetsIconsResponse[0];
};

const iconsSelect = (data: AssetsIconsResponse) => {
  const iconsMap = Object.fromEntries(
    data.map((icon) => [icon.asset_id, { ...icon }])
  );
  return iconsMap;
};

const getIconsQueryOption = (): UseQueryOptions<
  IconMap,
  unknown,
  IconMap,
  [string]
> => ({
  queryKey: ['assetsIcons'],
  queryFn: () => getAssetsIcons(true) as Promise<IconMap>,
  staleTime: Infinity,
});

const initializeIconsQuery = async (queryClient: QueryClient) => {
  const iconsQueryOption = getIconsQueryOption();
  // ⬇️ return data or fetch it
  const data = (queryClient.getQueryData(
    iconsQueryOption.queryKey as QueryKey
  ) ?? (await queryClient.fetchQuery(iconsQueryOption))) as IconMap;

  return data;
};

export { getIconsQueryOption, initializeIconsQuery, iconsSelect };
