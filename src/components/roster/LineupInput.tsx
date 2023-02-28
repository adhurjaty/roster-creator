import {
  Controller,
  ControllerRenderProps,
  FieldError,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import Player from '@/lib/models/player';
import Position from '@/lib/models/position';

import Button from '@/components/buttons/Button';
import EditDeleteRow from '@/components/forms/EditDeleteRow';

interface ILineupInput {
  playerPositions: { player: Player; position: Position }[];
}

interface Props {
  value: { player: Player; position: Position }[];
  onChange: (playerPositions: { player: Player; position: Position }[]) => void;
}

const defaultPlayer = {
  name: '',
  positions: [],
};

const LineupInput = ({ value: playerPositions, onChange }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILineupInput>({
    defaultValues: {
      playerPositions,
    },
  });

  const { fields, append, remove } = useFieldArray<ILineupInput>({
    control,
    name: 'playerPositions',
  });

  const onUpdatePlayerPositionFn =
    (field: ControllerRenderProps<ILineupInput, `playerPositions.${number}`>) =>
    (playerPosition: { player: Player; position: Position }) => {
      field.onChange(playerPosition);
      handleSubmit((data) =>
        onChange(
          data.playerPositions.filter(
            (_, i) => !errors.playerPositions?.at?.(i)
          )
        )
      )();
    };

  return (
    <>
      <ul className='mb-3 w-96 rounded-lg border border-gray-200 bg-white text-gray-900'>
        {fields.map((item, index) => (
          <Controller
            control={control}
            name={`playerPositions.${index}`}
            key={item.id}
            render={({ field }) => {
              const error = errors.playerPositions?.at?.(index) as
                | FieldError
                | undefined;
              return (
                <EditDeleteRow
                  value={{ ...field.value, name: field.value.player.name }}
                  onChange={onUpdatePlayerPositionFn(field)}
                  onDelete={() => remove(index)}
                  defaultEditMode={field.value.player.name === ''}
                  error={error}
                  displayContent={({ onEdit, onDelete }) => (
                    <div className='flex justify-between align-middle'>
                      <div className='flex flex-col'>
                        <div className='self-center'>
                          {field.value.player.name}
                        </div>
                        <div>
                          <em>Position:</em> {field.value.position.name}
                        </div>
                      </div>
                      <div className='flex justify-end'>
                        <Button onClick={onEdit}>Edit</Button>
                        <Button variant='alert' onClick={onDelete}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                  editForm={({ value, onChange, onCancel }) => <></>}
                />
              );
            }}
          />
        ))}
      </ul>
      {!errors.playerPositions?.find?.((x) => x) && (
        <Button onClick={() => append(defaultPlayer)}>+ Player</Button>
      )}
    </>
  );
};

export default LineupInput;
