import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import Game from '@/lib/models/game';

import Layout from '@/components/layout/Layout';

const GamePage = () => {
  const router = useRouter();
  const { teamId, gameId } = router.query;

  const {
    isLoading,
    isError,
    data: game,
    error,
  } = useQuery<Game, Error>('game', () => getGame(gameId as string));

  return <Layout></Layout>;
};

export default GamePage;
