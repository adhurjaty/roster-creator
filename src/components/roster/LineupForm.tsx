import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Lineup from '@/lib/models/lineup';
import Player from '@/lib/models/player';
import Position from '@/lib/models/position';

import Button from '@/components/buttons/Button';
import ErrorText from '@/components/ErrorText';
import LineupInput from '@/components/roster/LineupInput';

interface LineupFormInput {
  playerPositions: { player: Player; position: Position }[];
}

interface Props {
  lineup: Lineup;
  onSubmit: (lineup: Lineup) => void;
  onCancel: () => void;
  isSubmitLoading?: boolean;
  isSubmitError?: boolean;
  submitError?: Error | null;
}

const LineupForm = ({
  lineup,
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
  } = useForm<LineupFormInput>({
    defaultValues: {
      playerPositions: lineup.playerPositions,
    },
  });

  const localOnSubmit: SubmitHandler<LineupFormInput> = (data) => {
    onSubmit({
      ...lineup,
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
        name='playerPositions'
        rules={{
          validate: (players) => players.length > 0 || 'Must add players',
        }}
        render={({ field }) => (
          <LineupInput value={field.value} onChange={field.onChange} />
        )}
      />
      {errors.playerPositions && (
        <ErrorText text={errors.playerPositions.message ?? ''} />
      )}
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

export default LineupForm;
