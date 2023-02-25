import { useContext } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';

import Player from '@/lib/models/player';
import Position from '@/lib/models/position';

import Button from '@/components/buttons/Button';
import PositionsContext from '@/components/contexts/PositionsContext';
import ErrorText from '@/components/ErrorText';
import MultiSelect from '@/components/forms/MultiSelect';
import TextInput from '@/components/forms/TextInput';

interface PlayerInput {
  name: string;
  positions: Position[];
}

interface Props {
  value: Player;
  onChange: (player: Player) => void;
  onCancel: () => void;
  error?: FieldError;
}

const EditPlayer = ({ value: player, onChange, onCancel, error }: Props) => {
  const allPositions = useContext(PositionsContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerInput>({
    defaultValues: {
      name: player.name,
      positions: player.positions ?? [],
    },
  });

  return (
    <>
      <h3>Edit Player</h3>
      <Controller
        control={control}
        name='name'
        rules={{
          required: { value: true, message: 'Must enter player name' },
          maxLength: { value: 40, message: 'Name is too long' },
        }}
        render={({ field }) => (
          <TextInput label='Name' error={errors.name} {...field} />
        )}
      />
      <Controller
        control={control}
        name='positions'
        rules={{
          validate: (positions) =>
            positions.length > 0 || 'Must select at least one position',
        }}
        render={({ field }) => (
          <MultiSelect
            choices={allPositions}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {errors.positions && <ErrorText text={errors.positions.message ?? ''} />}
      <div className='flex'>
        <Button onClick={handleSubmit(onChange)}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
      {error && <ErrorText className='mt-2' text={error.message ?? ''} />}
    </>
  );
};

export default EditPlayer;
