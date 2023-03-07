import {
  Controller,
  ControllerRenderProps,
  FieldError,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import Lineup from '@/lib/models/lineup';
import Player from '@/lib/models/player';
import Position from '@/lib/models/position';

import Button from '@/components/buttons/Button';
import EditDeleteRow from '@/components/forms/EditDeleteRow';
import EditPlayerPosition from '@/components/roster/EditPlayerPosition';

interface LineupInput {
  playerPositions: { player: Player; position: Position }[];
}

interface Props {
  value: Lineup;
  onChange: (lineup: Lineup) => void;
  onCancel: () => void;
  isSubmitLoading?: boolean;
  isSubmitError?: boolean;
  submitError?: Error | null;
}

const LineupForm = ({ value: lineup, onChange }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LineupInput>({
    defaultValues: {
      playerPositions: lineup.playerPositions,
    },
  });

  const { fields, remove } = useFieldArray<LineupInput>({
    control,
    name: 'playerPositions',
  });

  const onUpdatePositionFn =
    (field: ControllerRenderProps<LineupInput, `playerPositions.${number}`>) =>
    (playerPosition: { player: Player; position: Position }) => {
      field.onChange(playerPosition);
      handleSubmit(({ playerPositions }) =>
        onChange({
          ...lineup,
          playerPositions: playerPositions.filter(
            (_, i) => !errors.playerPositions?.at?.(i)
          ),
        })
      )();
    };

  return (
    <>
      <ul className='mb-3 w-96 rounded-lg border border-gray-200 bg-white text-gray-900'>
        {fields.map((item, index) => (
          <Controller
            control={control}
            key={item.id}
            name={`playerPositions.${index}`}
            render={({ field }) => {
              const error = errors.playerPositions?.at?.(index) as
                | FieldError
                | undefined;
              return (
                <EditDeleteRow
                  value={{ ...field.value, name: field.value.player.name }}
                  onChange={onUpdatePositionFn(field)}
                  onDelete={() => remove(index)}
                  defaultEditMode={field.value.position.name === ''}
                  error={error}
                  editForm={({ value, onChange, onCancel }) => (
                    <EditPlayerPosition
                      value={value}
                      onChange={(x) => onChange({ ...x, name: field.name })}
                      onCancel={onCancel}
                      error={error}
                    />
                  )}
                  displayContent={({ onEdit, onDelete }) => (
                    <div className='flex justify-between align-middle'>
                      <div className='flex flex-col'>
                        <div>{field.value.player.name}</div>
                        <hr />
                        <div>{field.value.position.name}</div>
                      </div>
                      <div className='flex justify-end'>
                        <Button onClick={onEdit}>Edit</Button>
                        <Button variant='alert' onClick={onDelete}>
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
    </>
  );
};

export default LineupForm;
