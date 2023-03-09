import { useContext } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';

import Player from '@/lib/models/player';
import Position from '@/lib/models/position';

import Button from '@/components/buttons/Button';
import PositionsContext from '@/components/contexts/PositionsContext';
import ErrorText from '@/components/ErrorText';
import SelectInput from '@/components/forms/SelectInput';

interface PlayerPositionInput {
  position: Position;
}

interface Props {
  value: { player: Player; position: Position };
  onChange: (playerPosition: { player: Player; position: Position }) => void;
  onCancel: () => void;
  error?: FieldError;
}

const EditPlayerPosition = ({
  value: { player, position },
  onChange,
  onCancel,
  error,
}: Props) => {
  const allPositions = useContext(PositionsContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerPositionInput>({
    defaultValues: {
      position: position,
    },
  });

  return (
    <>
      <h3>Edit Position for {player.name}</h3>
      <Controller
        control={control}
        name='position'
        render={({ field }) => (
          <SelectInput
            label='Position'
            options={allPositions}
            error={errors.position as FieldError}
            value={field.value.id}
            onChange={(e) =>
              field.onChange(allPositions.find((x) => x.id === e.target.value))
            }
          />
        )}
      />
      <div className='flex'>
        <Button
          onClick={() => {
            handleSubmit(({ position }) => onChange({ player, position }))();
          }}
        >
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
      {error && <ErrorText className='mt-2' text={error.message ?? ''} />}
    </>
  );
};

export default EditPlayerPosition;
