import { useState } from 'react';
import {
  Controller,
  ControllerRenderProps,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import Lineup from '@/lib/models/lineup';

import Button from '@/components/buttons/Button';
import NextPrevButton from '@/components/buttons/NextPrevButton';
import LineupForm from '@/components/roster/LineupForm';

interface LineupsInput {
  lineups: Lineup[];
}

interface Props {
  value: Lineup[];
  onChange: (lineup: Lineup[]) => void;
}

const LineupsForm = ({ value: lineups, onChange }: Props) => {
  const [inning, setInning] = useState(1);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LineupsInput>({
    defaultValues: {
      lineups,
    },
  });

  const { fields, append, remove } = useFieldArray<LineupsInput>({
    control,
    name: 'lineups',
  });

  const onUpdatePlayerPositionFn =
    (field: ControllerRenderProps<LineupsInput, `lineups.${number}`>) =>
    (lineup: Lineup) => {
      field.onChange(lineup);
      handleSubmit((data) =>
        onChange(data.lineups.filter((_, i) => !errors.lineups?.at?.(i)))
      )();
    };

  const index = inning - 1;
  const currentField = inning <= lineups.length ? fields.at(index) : null;

  return (
    <>
      <h3 className='mt-4'>Lineups</h3>
      <div className='mb-2 flex w-full justify-between'>
        <h4>Inning {inning}</h4>
        <NextPrevButton
          onPrev={() => setInning(inning - 1)}
          onNext={() => setInning(inning + 1)}
          disableNext={!currentField}
          disablePrev={inning <= 1}
        />
      </div>
      {(currentField && (
        <>
          <Controller
            control={control}
            name={`lineups.${inning - 1}`}
            key={currentField.id}
            render={({ field }) => (
              <LineupForm value={field.value} onChange={field.onChange} />
            )}
          />
          {index === lineups.length - 1 && (
            <Button onClick={() => remove(index)}>Delete</Button>
          )}
        </>
      )) ||
        (!errors.lineups?.at?.(index) && (
          <Button onClick={() => append([])}>+ Player</Button>
        ))}
    </>
  );
};

export default LineupsForm;
