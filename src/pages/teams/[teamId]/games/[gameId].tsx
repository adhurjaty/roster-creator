import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import Game from '@/lib/models/game';
import { useGamesRepo } from '@/lib/repositories/ReposProvider';

import Layout from '@/components/layout/Layout';
import ListView from '@/components/list/ListView';

const GamePage = () => {
  const router = useRouter();
  const { teamId, gameId } = router.query;

  const gamesRepo = useGamesRepo('foo');

  const {
    isLoading,
    isError,
    data: game,
    error,
  } = useQuery<Game, Error>('game', () => gamesRepo.get(gameId as string));

  return (
    <Layout
      title={`Game ${game?.name}`}
      isLoading={isLoading}
      isError={isError}
      error={error}
    >
      <>
        <h4>Roster</h4>
        <ListView list={game?.roster.players || []} />
      </>
    </Layout>
  );
};

export default GamePage;
