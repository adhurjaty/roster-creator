import { useQuery } from 'react-query';

import { getTeams } from '@/lib/apiInterface/teamsRepo';
import Team from '@/lib/models/team';

import GamesView from '@/components/GamesView';
import Layout from '@/components/layout/Layout';

const GamesPage = () => {
  const {
    isLoading,
    isError,
    data: teams,
    error,
  } = useQuery<Team[], Error>('teams', () => getTeams('foo'));

  const games =
    teams?.flatMap((team) =>
      team.games.map((game) => ({
        ...game,
        teamId: team.id ?? '',
      }))
    ) ?? [];

  return (
    <Layout title='Games' isLoading={isLoading} isError={isError} error={error}>
      <GamesView games={games} />
    </Layout>
  );
};

export default GamesPage;
