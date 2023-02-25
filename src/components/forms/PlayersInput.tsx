import {
  Controller,
  ControllerRenderProps,
  FieldError,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import Player from '@/lib/models/player';

import Button from '@/components/buttons/Button';
import PlayerRow from '@/components/forms/PlayerRow';

interface PlayersInput {
  players: Player[];
}

interface Props {
  value: Player[];
  onChange: (players: Player[]) => void;
}

const defaultPlayer = {
  name: '',
  positions: [],
};

const PlayersInput = ({ value: players, onChange }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayersInput>({
    defaultValues: {
      players,
    },
  });

  const { fields, append, remove } = useFieldArray<PlayersInput>({
    control,
    name: 'players',
  });

  const onUpdatePlayerFn =
    (field: ControllerRenderProps<PlayersInput, `players.${number}`>) =>
    (player: Player) => {
      field.onChange(player);
      handleSubmit((data) =>
        onChange(data.players.filter((_, i) => !errors.players?.at?.(i)))
      )();
    };

  return (
    <>
      <ul className='mb-3 w-96 rounded-lg border border-gray-200 bg-white text-gray-900'>
        {fields.map((item, index) => (
          <Controller
            control={control}
            name={`players.${index}`}
            key={item.id}
            rules={{
              validate: (player) => {
                return (
                  [...fields.slice(0, index), ...fields.slice(index + 1)].find(
                    (p) => player.name.toLowerCase() === p.name.toLowerCase()
                  ) && `Player: ${player.name} already exists`
                );
              },
            }}
            render={({ field }) => (
              <PlayerRow
                value={field.value}
                onChange={onUpdatePlayerFn(field)}
                onDelete={() => remove(index)}
                defaultEditMode={!!field.value}
                error={errors.players?.at?.(index) as FieldError | undefined}
              />
            )}
          />
        ))}
      </ul>
      {!errors.players?.find?.((x) => x) && (
        <Button onClick={() => append(defaultPlayer)}>+ Player</Button>
      )}
    </>
  );
};

export default PlayersInput;
