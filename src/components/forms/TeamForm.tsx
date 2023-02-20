import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Player from '@/lib/models/player';
import Team from '@/lib/models/team';

import Button from '@/components/buttons/Button';
import ErrorText from '@/components/ErrorText';
import PlayersInput from '@/components/forms/PlayersInput';
import TextInput from '@/components/forms/TextInput';

interface TeamFormInput {
  name: string;
}

interface Props {
  team: Team;
  onSubmit: (team: Team) => void;
  onCancel: () => void;
  isSubmitLoading: boolean;
  isSubmitError: boolean;
  submitError: Error | null;
}

const TeamForm = ({
  team,
  onSubmit,
  onCancel,
  isSubmitLoading,
  isSubmitError,
  submitError,
}: Props) => {
  const [players, setPlayers] = useState<Player[]>(team.players);
  const [validationError, setValidationError] = useState<Error>();
  const { register, watch, handleSubmit } = useForm<TeamFormInput>({
    defaultValues: {
      name: team.name,
    },
  });
  const watchName = watch('name');

  useEffect(() => {
    setValidationError(undefined);
  }, [watchName, players]);

  const validate = () => {
    if (players.length === 0) {
      setValidationError(
        new Error('Must have at least one player on the team')
      );
    }
  };

  const localOnSubmit: SubmitHandler<TeamFormInput> = (data) => {
    validate();

    onSubmit({
      ...team,
      ...data,
      players,
    });
  };

  const isError = !!validationError || isSubmitError;
  const formError = validationError ?? submitError;

  return (
    <form
      className='mx-3 flex flex-col items-center justify-center'
      onSubmit={handleSubmit(localOnSubmit)}
    >
      <TextInput
        register={register}
        name='name'
        label='Name'
        options={{ required: true, maxLength: 40 }}
      />
      <PlayersInput value={team.players} onChange={setPlayers} />
      <div className='my-2 flex flex-row justify-end'>
        <Button isLoading={isSubmitLoading} submit>
          Submit
        </Button>
        <Button variant='alert' onClick={onCancel}>
          Cancel
        </Button>
      </div>
      {isError && <ErrorText text={formError?.message ?? ''} />}
    </form>
  );
};

export default TeamForm;
