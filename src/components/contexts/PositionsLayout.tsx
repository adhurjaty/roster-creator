import { useQuery } from 'react-query';

import Position from '@/lib/models/position';
import { usePositionsRepo } from '@/lib/repositories/ReposProvider';

import PositionsContext from '@/components/contexts/PositionsContext';
import Layout from '@/components/layout/Layout';
import LayoutProps from '@/components/props/LayoutProps';

const PositionsLayout = ({
  children,
  isLoading,
  isError,
  error,
  ...rest
}: LayoutProps) => {
  const repo = usePositionsRepo();

  const {
    isLoading: isLoadingPositions,
    isError: isPositionsError,
    data: positions,
    error: positionsError,
  } = useQuery<Position[], Error>('positions', () => repo?.list() ?? []);

  return (
    <Layout
      isLoading={isLoading || isLoadingPositions}
      isError={isError || isPositionsError}
      error={error ?? positionsError}
      {...rest}
    >
      <PositionsContext.Provider value={positions ?? []}>
        {children}
      </PositionsContext.Provider>
    </Layout>
  );
};

export default PositionsLayout;
