import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { getTeam } from '@/lib/apiInterface/teamsRepo';
import Team from '@/lib/models/team';

import GamesView from '@/components/GamesView';
import Layout from '@/components/layout/Layout';

const TeamGamesPage = () => {
  const router = useRouter();
  const { teamId } = router.query;

  const {
    isLoading,
    isError,
    data: team,
    error,
  } = useQuery<Team, Error>('team', () => getTeam('foo', teamId as string));

  const games = team?.games ?? [];

  return (
    <Layout title='Games' isLoading={isLoading} isError={isError} error={error}>
      <GamesView
        games={games.map((game) => ({
          ...game,
          teamId: teamId as string,
        }))}
      />
    </Layout>
  );
};

export default TeamGamesPage;
