import { useEffect, useState } from 'react';
import {
  Controller,
  ControllerRenderProps,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import Lineup from '@/lib/models/lineup';
import Player from '@/lib/models/player';

import Button from '@/components/buttons/Button';
import NextPrevButton from '@/components/buttons/NextPrevButton';
import LineupForm from '@/components/roster/LineupForm';

interface LineupsInput {
  lineups: Lineup[];
}

interface Props {
  value: Lineup[];
  onChange: (lineup: Lineup[]) => void;
  rosterPlayers: Player[];
}

const defaultPlayerPositions = (players: Player[]) =>
  players.map((player) => ({
    player,
    position: {
      name: 'Bench',
      order: Infinity,
    },
  }));

const LineupsForm = ({ value: lineups, onChange, rosterPlayers }: Props) => {
  const [inning, setInning] = useState(1);

  const {
    control,
    handleSubmit,
    watch,
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

  const watchLineup = watch('lineups');

  useEffect(() => {
    onChange(watchLineup);
  }, [watchLineup, onChange]);

  const onUpdatePlayerPositionFn =
    (field: ControllerRenderProps<LineupsInput, `lineups.${number}`>) =>
    (lineup: Lineup) => {
      field.onChange(lineup);
      handleSubmit((data) =>
        onChange(data.lineups.filter((_, i) => !errors.lineups?.at?.(i)))
      )();
    };

  const index = inning - 1;
  const currentItem = index < fields.length ? fields.at(index) : null;

  return (
    <>
      <h3 className='mt-4'>Lineups</h3>
      <div className='mb-2 flex w-full justify-between'>
        <h4>Inning {inning}</h4>
        <NextPrevButton
          onPrev={() => setInning(inning - 1)}
          onNext={() => setInning(inning + 1)}
          disableNext={!currentItem}
          disablePrev={inning <= 1}
        />
      </div>
      {(currentItem && (
        <>
          <Controller
            control={control}
            name={`lineups.${index}`}
            key={currentItem.id}
            render={({ field }) => (
              <LineupForm
                value={field.value}
                onChange={onUpdatePlayerPositionFn(field)}
                onCancel={() => {
                  return;
                }}
              />
            )}
          />
          {inning === fields.length && (
            <Button onClick={() => remove(index)}>Delete</Button>
          )}
        </>
      )) ||
        (!errors.lineups?.at?.(index) && (
          <Button
            onClick={() =>
              append({
                period: inning,
                playerPositions: defaultPlayerPositions(rosterPlayers),
              })
            }
          >
            + Lineup
          </Button>
        ))}
    </>
  );
};

export default LineupsForm;
