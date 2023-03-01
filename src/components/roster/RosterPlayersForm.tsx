import {
  Controller,
  ControllerRenderProps,
  FieldError,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import Player from '@/lib/models/player';

import Button from '@/components/buttons/Button';
import EditDeleteRow from '@/components/forms/EditDeleteRow';
import EditRosterPlayer from '@/components/roster/EditRosterPlayer';

interface RosterPlayersInput {
  players: Player[];
}

interface Props {
  value: Player[];
  allPlayers: Player[];
  onChange: (players: Player[]) => void;
}

const defaultPlayer = {
  name: '',
  positions: [],
};

const RosterPlayersForm = ({ value: players, allPlayers, onChange }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RosterPlayersInput>({
    defaultValues: {
      players,
    },
  });

  const { fields, append, remove } = useFieldArray<RosterPlayersInput>({
    control,
    name: 'players',
  });

  const remainingPlayers = allPlayers.filter(
    (p) => !fields.map((f) => f.id).includes(p.id ?? '')
  );

  const onUpdatePlayerFn =
    (field: ControllerRenderProps<RosterPlayersInput, `players.${number}`>) =>
    (player: Player) => {
      field.onChange(player);
      handleSubmit((data) =>
        onChange(data.players.filter((_, i) => !errors.players?.at?.(i)))
      )();
    };

  return (
    <>
      <h3>Roster</h3>
      <ul className='mb-3 w-96 rounded-lg border border-gray-200 bg-white text-gray-900'>
        {fields.map((item, index) => (
          <Controller
            control={control}
            name={`players.${index}`}
            key={item.id}
            render={({ field }) => {
              const error = errors.players?.at?.(index) as
                | FieldError
                | undefined;
              return (
                <EditDeleteRow
                  value={field.value}
                  onChange={onUpdatePlayerFn(field)}
                  onDelete={() => remove(index)}
                  defaultEditMode={field.value.name === ''}
                  error={error}
                  editForm={({ value, onChange, onCancel }) => (
                    <EditRosterPlayer
                      value={value}
                      remainingPlayers={remainingPlayers}
                      onChange={onChange}
                      onCancel={onCancel}
                      error={error}
                    />
                  )}
                  displayContent={() => (
                    <div className='flex justify-between align-middle'>
                      <div className='self-center'>{field.value.name}</div>
                      <div className='flex justify-end'>
                        <Button variant='alert' onClick={() => remove(index)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                />
              );
            }}
          />
        ))}
      </ul>
      {!errors.players?.find?.((x) => x) && (
        <Button onClick={() => append(defaultPlayer)}>+ Player</Button>
      )}
    </>
  );
};

export default RosterPlayersForm;
