import { useQuery } from 'react-query';

import { getPositions } from '@/lib/apiInterface/positionsRepo';
import Position from '@/lib/models/position';

import PositionsContext from '@/components/contexts/PositionsContext';
import Layout from '@/components/layout/Layout';
import LayoutProps from '@/components/props/LayoutProps';

const PositionsLayout = ({
  children,
  title,
  isLoading,
  isError,
  error,
}: LayoutProps) => {
  const {
    isLoading: isLoadingPositions,
    isError: isPositionsError,
    data: positions,
    error: positionsError,
  } = useQuery<Position[], Error>('positions', getPositions);

  return (
    <Layout
      title={title}
      isLoading={isLoading || isLoadingPositions}
      isError={isError || isPositionsError}
      error={error ?? positionsError}
    >
      <PositionsContext.Provider value={positions ?? []}>
        {children}
      </PositionsContext.Provider>
    </Layout>
  );
};

export default PositionsLayout;