import { useRouter } from 'next/router';
import Datepicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

import { createGame } from '@/lib/apiInterface/gamesRepo';
import { getTeams } from '@/lib/apiInterface/teamsRepo';
import Game from '@/lib/models/game';
import Team from '@/lib/models/team';

import Button from '@/components/buttons/Button';
import ErrorText from '@/components/ErrorText';
import SelectInput from '@/components/forms/SelectInput';
import TextInput from '@/components/forms/TextInput';
import Layout from '@/components/layout/Layout';

interface GameFormInput {
  teamId: string;
  opponent: string;
  date: Date;
}

const CreateGamePage = () => {
  const {
    isLoading,
    isError,
    data: teams,
    error,
  } = useQuery<Team[], Error>('teams', () => getTeams('foo'));

  const {
    isLoading: isSubmitting,
    mutate,
    isError: isSubmitError,
    error: submitError,
  } = useMutation<Response, Error, Game & { teamId: string }>((newGame) =>
    createGame(newGame.teamId, newGame)
  );

  const router = useRouter();
  const { teamId } = router.query;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GameFormInput>({
    defaultValues: {
      teamId: (teamId as string | undefined) ?? '',
      opponent: '',
      date: new Date(),
    },
  });

  const onSubmit = (data: GameFormInput) => {
    mutate({
      teamId: data.teamId,
      name: `vs. ${data.opponent}`,
      date: data.date,
      roster: {
        players: [],
        lineups: [],
      },
    });
  };

  return (
    <Layout
      title='New game'
      isLoading={isLoading}
      isError={isError}
      error={error}
    >
      <form
        className='mx-3 flex flex-col items-center justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name='teamId'
          rules={{
            required: { value: true, message: 'Must select a team' },
          }}
          render={({ field }) => (
            <SelectInput
              label='Team'
              error={errors.teamId}
              options={teams?.map((t) => ({ ...t, id: t.id as string })) ?? []}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name='opponent'
          rules={{
            required: { value: true, message: 'Must select an opponent' },
            maxLength: { value: 40, message: 'Name is too long' },
          }}
          render={({ field }) => (
            <TextInput label='Opponent' error={errors.opponent} {...field} />
          )}
        />
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='date'
          >
            Game Date
          </label>
          <Controller
            control={control}
            name='date'
            render={({ field }) => (
              <Datepicker
                id='date'
                placeholderText='Game date'
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                showTimeSelect
                dateFormat='Pp'
                minDate={new Date()}
              />
            )}
          />
        </div>
        <Button isLoading={isSubmitting} submit>
          Submit
        </Button>
        {isSubmitError && <ErrorText text={submitError?.message ?? ''} />}
      </form>
    </Layout>
  );
};

export default CreateGamePage;
