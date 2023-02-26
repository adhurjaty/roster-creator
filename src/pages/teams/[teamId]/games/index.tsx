import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import Team from '@/lib/models/team';
import { useTeamsRepo } from '@/lib/repositories/ReposProvider';

import GamesView from '@/components/GamesView';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

const TeamGamesPage = () => {
  const router = useRouter();
  const { teamId } = router.query;

  const repo = useTeamsRepo('foo');

  const {
    isLoading,
    isError,
    data: team,
    error,
  } = useQuery<Team, Error>('team', () => repo.get(teamId as string));

  const games = team?.games ?? [];

  return (
    <Layout title='Games' isLoading={isLoading} isError={isError} error={error}>
      <div className='flex flex-col items-center justify-center'>
        <GamesView
          games={games.map((game) => ({
            ...game,
            teamId: teamId as string,
          }))}
        />
        <ButtonLink href={`/teams/${teamId as string}/games/create`}>
          + Game
        </ButtonLink>
      </div>
    </Layout>
  );
};

export default TeamGamesPage;
