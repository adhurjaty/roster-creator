import { Controller, FieldError, useForm } from 'react-hook-form';

import Player from '@/lib/models/player';

import Button from '@/components/buttons/Button';
import ErrorText from '@/components/ErrorText';
import SelectInput from '@/components/forms/SelectInput';

interface PlayerInput {
  player: Player;
}

interface Props {
  value: Player;
  remainingPlayers: Player[];
  onChange: (player: Player) => void;
  onCancel: () => void;
  error?: FieldError;
}

const EditRosterPlayer = ({
  value: player,
  remainingPlayers,
  onChange,
  onCancel,
  error,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerInput>({
    defaultValues: {
      player,
    },
  });

  const localOnChange = ({ player }: PlayerInput) => onChange(player);

  return (
    <>
      <h3>Add Player</h3>
      <Controller
        control={control}
        name='player'
        rules={{
          validate: (player) =>
            player.id ? undefined : 'Must select a player',
        }}
        render={({ field }) => (
          <SelectInput
            label='Player'
            options={remainingPlayers.map((x) => ({ ...x, id: x.id ?? '' }))}
            error={errors.player as FieldError}
            value={field.value.id}
            onChange={(e) =>
              field.onChange(
                remainingPlayers.find((x) => x.id === e.target.value)
              )
            }
          />
        )}
      />
      <div className='flex'>
        <Button onClick={handleSubmit(localOnChange)}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
      {error && <ErrorText className='mt-2' text={error.message ?? ''} />}
    </>
  );
};

export default EditRosterPlayer;
