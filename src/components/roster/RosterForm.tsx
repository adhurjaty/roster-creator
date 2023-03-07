import { Controller, useForm } from 'react-hook-form';

import Lineup from '@/lib/models/lineup';
import Player from '@/lib/models/player';
import Roster from '@/lib/models/roster';
import Team from '@/lib/models/team';

import Button from '@/components/buttons/Button';
import ErrorText from '@/components/ErrorText';
import LineupsForm from '@/components/roster/LineupsForm';
import RosterPlayersForm from '@/components/roster/RosterPlayersForm';

interface RosterInput {
  players: Player[];
  lineups: Lineup[];
}

interface Props {
  team: Team;
  roster: Roster;
  onSubmit: (roster: Roster) => void;
  onCancel: () => void;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
}

const RosterForm = ({
  team,
  roster,
  onSubmit,
  onCancel,
  isLoading,
  isError,
  error,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RosterInput>({
    defaultValues: {
      players: roster.players,
      lineups: roster.lineups,
    },
  });

  return (
    <div className='flex flex-col items-center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='players'
          render={({ field }) => (
            <RosterPlayersForm
              value={field.value}
              allPlayers={team.players}
              onChange={field.onChange}
            />
          )}
        />
        {errors.players && <ErrorText text={errors.players.message ?? ''} />}
        <Controller
          control={control}
          name='lineups'
          render={({ field }) => (
            <LineupsForm
              value={field.value}
              rosterPlayers={roster.players}
              onChange={field.onChange}
            />
          )}
        />
        {errors.lineups && <ErrorText text={errors.lineups.message ?? ''} />}
        <div className='my-2 flex flex-row justify-end'>
          <Button isLoading={isLoading} submit>
            Submit
          </Button>
          <Button variant='alert' onClick={onCancel}>
            Cancel
          </Button>
        </div>
        {isError && <ErrorText text={error?.message ?? ''} />}
      </form>
    </div>
  );
};

export default RosterForm;
