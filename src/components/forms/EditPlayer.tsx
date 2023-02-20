import { Result } from 'neverthrow';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Position from '@/lib/models/position';

import Button from '@/components/buttons/Button';
import ErrorText from '@/components/ErrorText';
import PositionsSelector from '@/components/forms/PositionsSelector';
import TextInput from '@/components/forms/TextInput';
import PlayerView from '@/components/viewModels/playerView';

interface PlayerInput {
  name: string;
}

interface Props {
  player: PlayerView;
  onSubmit: (player: PlayerView) => Result<null, string>;
  onCancel: () => void;
}

const EditPlayer = ({ player, onSubmit, onCancel }: Props) => {
  const [selectedPositions, setSelectedPositions] = useState<Position[]>(
    player.positions ?? []
  );
  const [submitError, setSubmitError] = useState<string>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerInput>({
    defaultValues: {
      name: player.name,
    },
  });
  const watchName = watch('name');

  useEffect(() => {
    setSubmitError(undefined);
  }, [selectedPositions, watchName]);

  const validate = () => {
    if (selectedPositions.length == 0) {
      setSubmitError('Must select at least one position');
      return false;
    }

    return true;
  };

  const onClickSave: SubmitHandler<PlayerInput> = (data) => {
    if (!validate()) {
      return;
    }

    onSubmit({
      id: player.id,
      name: data.name,
      positions: selectedPositions,
    })
      .map((_) => setSubmitError(undefined))
      .mapErr((err) => setSubmitError(err));
  };

  return (
    <>
      <h3>Edit Player</h3>
      <TextInput
        register={register}
        name='name'
        label='Name'
        options={{ required: true, maxLength: 40 }}
      />
      <PositionsSelector
        selectedPositions={selectedPositions}
        setSelectedPositions={setSelectedPositions}
      />
      <div className='flex'>
        <Button onClick={handleSubmit(onClickSave)}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
      {(submitError || errors.name?.message) && (
        <ErrorText
          className='mt-2'
          text={submitError ?? errors.name?.message ?? ''}
        />
      )}
    </>
  );
};

export default EditPlayer;
