import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Lineup from '@/lib/models/lineup';
import Player from '@/lib/models/player';
import Roster from '@/lib/models/roster';
import Team from '@/lib/models/team';

import Button from '@/components/buttons/Button';
import NextPrevButton from '@/components/buttons/NextPrevButton';
import ErrorText from '@/components/ErrorText';
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
  const [inning, setInning] = useState(1);

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

  const currentLineup = roster.lineups.find((x) => x.period === inning);
  // const remainingPlayers = team.players.filter(
  //   (p) => !playerFields.map((f) => f.id).includes(p.id ?? '')
  // );

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
        <h3 className='mt-4'>Lineups</h3>
        <div className='mb-2 flex w-full justify-between'>
          <h4>Inning {inning}</h4>
          <NextPrevButton
            onPrev={() => setInning(inning - 1)}
            onNext={() => setInning(inning + 1)}
            disableNext={!currentLineup}
            disablePrev={inning <= 1}
          />
        </div>
        {/* {currentLineup && <LineupView lineup={currentLineup} />} */}
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
