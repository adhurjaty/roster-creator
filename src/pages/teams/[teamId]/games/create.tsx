import { useEffect, useState } from 'react';
import Datepicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { createGame } from '@/lib/apiInterface/gamesRepo';
import Game from '@/lib/models/game';

import Button from '@/components/buttons/Button';
import ErrorText from '@/components/ErrorText';
import TextInput from '@/components/forms/TextInput';
import Layout from '@/components/layout/Layout';

interface GameFormInput {
  opponent: string;
  date: Date;
}

const CreateGamePage = () => {
  const [formError, setFormError] = useState<string>();

  const { isLoading, mutate, isError, error } = useMutation<
    Response,
    Error,
    Game
  >((newGame) => createGame('teamId', newGame));

  const { register, watch, handleSubmit, control } = useForm<GameFormInput>({
    defaultValues: {
      opponent: '',
      date: new Date(),
    },
  });

  const watchOpponent = watch('opponent');
  const watchDate = watch('date');

  useEffect(() => {
    setFormError(undefined);
  }, [watchOpponent, watchDate]);

  const onSubmit = (data: GameFormInput) => {
    mutate({
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
        <TextInput
          register={register}
          name='opponent'
          label='Opponent'
          options={{ required: true, maxLength: 40 }}
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
        <Button isLoading={isLoading} submit>
          Submit
        </Button>
        {isError && <ErrorText text={formError ?? ''} />}
      </form>
    </Layout>
  );
};

export default CreateGamePage;
