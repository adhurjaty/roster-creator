import { useState } from 'react';
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

const CreateTeamPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const { register, handleSubmit } = useForm<TeamFormInput>();
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

  const onSubmit: SubmitHandler<TeamFormInput> = (data) => {
    mutate({
      ...data,
      players,
      games: [],
    });
  };

  return (
    <Layout
      title='Create New Team'
      isLoading={isLoadingPositions}
      isError={isPositionsError}
      error={positionsError}
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

export default CreateTeamPage;
