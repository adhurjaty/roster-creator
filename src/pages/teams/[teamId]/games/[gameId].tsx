import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import Game from '@/lib/models/game';
import Team from '@/lib/models/team';
import { useGamesRepo, useTeamsRepo } from '@/lib/repositories/ReposProvider';

import Button from '@/components/buttons/Button';
import PositionsLayout from '@/components/contexts/PositionsLayout';
import RosterForm from '@/components/roster/RosterForm';
import RosterView from '@/components/roster/RosterView';

const GamePage = () => {
  const [editMode, setEditMode] = useState(false);

  const router = useRouter();
  const { teamId, gameId } = router.query;

  const teamsRepo = useTeamsRepo('foo');
  const gamesRepo = useGamesRepo('foo');

  const {
    isLoading: isLoadingGame,
    isError: isErrorGame,
    data: game,
    error: gameError,
  } = useQuery<Game, Error>('game', () => gamesRepo.get(gameId as string));

  const {
    isLoading: isLoadingTeam,
    isError: isErrorTeam,
    data: team,
    error: teamError,
  } = useQuery<Team, Error>('team', () => teamsRepo.get(teamId as string));

  const {
    isLoading: isSubmitting,
    isError: isSubmitError,
    mutate,
    error: submitError,
  } = useMutation<Response, Error, Game>(gamesRepo.update);

  return (
    <PositionsLayout
      title={`Game ${game?.name}`}
      isLoading={isLoadingGame || isLoadingTeam}
      isError={isErrorGame || isErrorTeam}
      error={gameError || teamError}
    >
      <div className='flex flex-col items-center'>
        {game &&
          ((editMode && team && (
            <RosterForm
              team={team}
              roster={game.roster}
              onCancel={() => setEditMode(false)}
              onSubmit={(roster) =>
                mutate({
                  ...game,
                  roster,
                })
              }
              isError={isSubmitError}
              isLoading={isSubmitting}
            />
          )) || (
            <>
              <RosterView roster={game.roster} />
              <Button onClick={() => setEditMode(true)}>Edit</Button>
            </>
          ))}
      </div>
    </PositionsLayout>
  );
};

export default GamePage;
