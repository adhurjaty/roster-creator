import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Player from '@/lib/models/player';
import Team from '@/lib/models/team';

import Button from '@/components/buttons/Button';
import ErrorText from '@/components/ErrorText';
import PlayersInput from '@/components/forms/PlayersInput';
import TextInput from '@/components/forms/TextInput';

interface TeamFormInput {
  name: string;
  players: Player[];
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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TeamFormInput>({
    defaultValues: {
      name: team.name,
      players: team.players,
    },
  });

  const localOnSubmit: SubmitHandler<TeamFormInput> = (data) => {
    onSubmit({
      ...team,
      ...data,
    });
  };

  return (
    <form
      className='mx-3 flex flex-col items-center justify-center'
      onSubmit={handleSubmit(localOnSubmit)}
    >
      <Controller
        control={control}
        name='name'
        rules={{
          required: { value: true, message: 'Must enter team name' },
          maxLength: { value: 40, message: 'Name is too long' },
        }}
        render={({ field }) => (
          <TextInput label='Name' error={errors.name} {...field} />
        )}
      />
      <Controller
        control={control}
        name='players'
        rules={{
          validate: (players) => players.length > 0 || 'Must add players',
        }}
        render={({ field }) => (
          <PlayersInput value={field.value} onChange={field.onChange} />
        )}
      />
      {errors.players && <ErrorText text={errors.players.message ?? ''} />}
      <div className='my-2 flex flex-row justify-end'>
        <Button isLoading={isSubmitLoading} submit>
          Submit
        </Button>
        <Button variant='alert' onClick={onCancel}>
          Cancel
        </Button>
      </div>
      {isSubmitError && <ErrorText text={submitError?.message ?? ''} />}
    </form>
  );
};

export default TeamForm;
