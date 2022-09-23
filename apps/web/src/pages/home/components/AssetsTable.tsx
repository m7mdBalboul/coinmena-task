import { TableAsset } from 'services/api/coin-api';
import { formatCurrency } from '@crypto/ui';
import { ActionDropdown } from './ActionDropdown';
import { QueryStatus } from '@tanstack/react-query';
import { Box, Button, Flex, styled, Loader } from '@crypto/design-system';
import {
  ColumnDef,
  flexRender,
  TableOptions,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';

const StyledCell = styled(Flex, {
  p: '$3',
  gap: '$3',
  display: 'flex',
  alignItems: 'center',
});

const Page = styled('div', {
  color: '$blue900',
  fontSize: '$sm',
  fontWeight: '$medium',
  textAlign: 'center',
  mx: '$2',
});

const assetTableColumns: ColumnDef<TableAsset>[] = [
  {
    header: () => (
      <StyledCell justify={'start'} css={{ pl: 'calc(36px + $3 + $3)' }}>
        Name
      </StyledCell>
    ),
    accessorKey: 'name',
    cell: (info) => (
      <StyledCell>
        <img
          height={36}
          width={36}
          src={info.row.original.icon}
          alt={`${info.row.original.name} Icon`}
        />
        <span>{info.getValue<string>()}</span>
      </StyledCell>
    ),
  },
  {
    header: () => <StyledCell justify={'start'}>Price</StyledCell>,
    accessorKey: 'price',
    cell: (info) => (
      <StyledCell>{formatCurrency(+info.getValue<string>())}</StyledCell>
    ),
  },
  {
    header: () => <StyledCell justify={'start'}>Action</StyledCell>,
    id: 'action',
    cell: () => <ActionDropdown />,
  },
];

type AssetTableProps = {
  data?: TableAsset[];
  status: QueryStatus;
  onPaginationChange: TableOptions<TableAsset>['onPaginationChange'];
  paginationState: { pageSize: number; pageIndex: number; pageCount: number };
};

const DEFAULT_DATA = [] as TableAsset[];

export function AssetsTable({
  data,
  status,
  paginationState: { pageCount, ...pagination },
  onPaginationChange,
}: AssetTableProps) {
  const table = useReactTable({
    data: data ?? DEFAULT_DATA,
    columns: assetTableColumns,
    pageCount: pageCount,
    state: {
      pagination,
    },
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <Flex direction='column' css={{ width: '$full', height: '$full' }}>
      <Box as='table' css={{ borderCollapse: 'collapse' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Box
              as='tr'
              css={{ backgroundColor: '$blackAlpha200', borderRadius: '$md' }}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </Box>
          ))}
        </thead>
        <tbody style={{ height: status === 'loading' ? '300px' : 'unset' }}>
          {status === 'loading' && (
            <tr>
              <td colSpan={4}>
                <Loader css={{ m: 'auto' }} />
              </td>
            </tr>
          )}
          {status === 'success' &&
            table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </Box>
      <Box css={{ mb: '$3' }} />
      <Flex
        align='center'
        justify='between'
        css={{
          width: '65%',
          '@bp2': {
            width: '100%',
          },
        }}
      >
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
            table.setPageIndex(0);
          }}
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <Flex align='center'>
          <Button
            text
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </Button>
          <Button
            text
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </Button>
          <span>
            <Page>
              Page: {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </Page>
          </span>
          <Button
            text
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </Button>
          <Button
            text
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
