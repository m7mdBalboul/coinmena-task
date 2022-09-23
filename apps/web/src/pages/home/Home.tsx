import { Card } from 'components/card';
import { useHome } from './hooks/useHome';
import { AssetsTable } from './components/AssetsTable';

function Home() {
  const { onPaginationChange, paginationState, queryResults } = useHome();
  return (
    <Card css={{ my: '$6' }}>
      <AssetsTable
        data={queryResults.data?.assets}
        status={queryResults.status}
        paginationState={paginationState}
        onPaginationChange={onPaginationChange}
      />
    </Card>
  );
}

export { Home };
