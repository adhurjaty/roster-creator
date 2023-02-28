import { useQuery } from 'react-query';

import Team from '@/lib/models/team';
import { useTeamsRepo } from '@/lib/repositories/ReposProvider';

import GamesView from '@/components/game/GamesView';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

const GamesPage = () => {
  const teamsRepo = useTeamsRepo('foo');

  const {
    isLoading,
    isError,
    data: teams,
    error,
  } = useQuery<Team[], Error>('teams', teamsRepo.list);

  const games =
    teams?.flatMap((team) =>
      team.games.map((game) => ({
        ...game,
        teamId: team.id ?? '',
      }))
    ) ?? [];

  return (
    <Layout title='Games' isLoading={isLoading} isError={isError} error={error}>
      <div className='flex flex-col items-center justify-center'>
        <GamesView games={games} />
        <ButtonLink href='/games/create'>+ Game</ButtonLink>
      </div>
    </Layout>
  );
};

export default GamesPage;
