import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

import { getPositions } from '@/lib/apiInterface/positionsRepo';
import { createTeam } from '@/lib/apiInterface/teamsRepo';
import Player from '@/lib/models/player';
import Position from '@/lib/models/position';
import Team from '@/lib/models/team';

import Button from '@/components/buttons/Button';
import PositionsContext from '@/components/contexts/PositionsContext';
import ErrorText from '@/components/ErrorText';
import PlayersInput from '@/components/forms/PlayersInput';
import TextInput from '@/components/forms/TextInput';
import Layout from '@/components/layout/Layout';

interface TeamFormInput {
  name: string;
}

interface Props {
  title: string;
  team: Team;
}

const TeamForm = ({ title, team }: Props) => {
  const [players, setPlayers] = useState<Player[]>(team.players);
  const [validationError, setValidationError] = useState<Error>();
  const { register, watch, handleSubmit } = useForm<TeamFormInput>({
    defaultValues: {
      name: team.name,
    },
  });
  const watchName = watch('name');
  const {
    isLoading: isLoadingPositions,
    isError: isPositionsError,
    data: positions,
    error: positionsError,
  } = useQuery<Position[], Error>('positions', getPositions);
  const { isLoading, mutate, isError, error } = useMutation<
    Response,
    Error,
    Team
  >((newTeam) => createTeam('foo', newTeam));

  useEffect(() => {
    setValidationError(undefined);
  }, [watchName, players]);

  const validate = () => {
    if (players.length === 0) {
      setValidationError(
        new Error('Must have at least one player on the team')
      );
      return false;
    }

    return true;
  };

  const onSubmit: SubmitHandler<TeamFormInput> = (data) => {
    if (!validate()) {
      return;
    }

    mutate({
      ...data,
      players,
      games: [],
    });
  };

  return (
    <Layout
      title={title}
      isLoading={isLoadingPositions}
      isError={isPositionsError || !!validationError}
      error={positionsError ?? validationError}
    >
      <PositionsContext.Provider value={positions ?? []}>
        <form
          className='mx-3 flex flex-col items-center justify-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            register={register}
            name='name'
            label='Name'
            options={{ required: true, maxLength: 40 }}
          />
          <PlayersInput onChange={setPlayers} />
          <Button className='my-2' isLoading={isLoading} submit>
            Submit
          </Button>
          {isError && <ErrorText text={error.message} />}
        </form>
      </PositionsContext.Provider>
    </Layout>
  );
};

export default TeamForm;
