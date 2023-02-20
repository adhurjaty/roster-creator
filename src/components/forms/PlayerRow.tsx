import { Result } from 'neverthrow';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import EditPlayer from '@/components/forms/EditPlayer';
import PlayerView from '@/components/viewModels/playerView';

interface Props {
  player: PlayerView;
  onUpdate: (player: PlayerView) => Result<null, string>;
  onDelete: (player: PlayerView) => void;
}

const PlayerRow = ({ player, onUpdate, onDelete }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const localOnUpdate = (player: PlayerView) => {
    return onUpdate(player).map((_) => {
      setEditMode(false);
      return _;
    });
  };

  const displayRow = (
    <div className='flex justify-between align-middle'>
      <div className='self-center'>{player.name}</div>
      <div className='flex justify-end'>
        <Button onClick={() => setEditMode(true)}>Edit</Button>
        <Button variant='alert' onClick={() => onDelete(player)}>
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <li className='w-full border-b border-gray-200 px-6 py-2'>
      {(editMode && (
        <EditPlayer
          player={player}
          onSubmit={localOnUpdate}
          onCancel={() => setEditMode(false)}
        />
      )) ||
        displayRow}
    </li>
  );
};

export default PlayerRow;
