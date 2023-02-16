import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Position from '@/lib/models/position';

import Button from '@/components/buttons/Button';
import PositionsSelector from '@/components/forms/PositionsSelector';
import TextInput from '@/components/forms/TextInput';

interface PlayerView {
  id?: number;
  name: string;
  positions: Position[];
}

interface PlayerInput {
  name: string;
}

interface Props {
  player: PlayerView;
  onSubmit: (player: PlayerView) => void;
  onCancel: () => void;
}

const EditPlayer = ({ player, onSubmit, onCancel }: Props) => {
  const [selectedPositions, setSelectedPositions] = useState<Position[]>(
    player.positions ?? []
  );
  const { register, handleSubmit } = useForm<PlayerInput>({
    defaultValues: {
      name: player.name,
    },
  });

  const onClickSave: SubmitHandler<PlayerInput> = (data) => {
    onSubmit({
      id: player.id,
      name: data.name,
      positions: selectedPositions,
    });
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
    </>
  );
};

export default EditPlayer;
