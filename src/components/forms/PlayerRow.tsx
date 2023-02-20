import { useState } from 'react';

import Player from '@/lib/models/player';

import Button from '@/components/buttons/Button';
import EditPlayer from '@/components/forms/EditPlayer';

interface Props {
  player: Player;
  isEditMode?: boolean;
}

const PlayerRow = ({ player, isEditMode }: Props) => {
  const [editMode, setEditMode] = useState(isEditMode ?? false);

  const displayRow = (
    <div className='flex justify-between align-middle'>
      <div className='self-center'>{player.name}</div>
      <Button onClick={() => setEditMode(true)}>Edit</Button>
    </div>
  );

  return (
    <li className='w-full border-b border-gray-200 px-6 py-2'>
      {(editMode && (
        <EditPlayer
          player={player}
          onSubmit={onUpdatePlayer}
          onCancel={() => setEditMode(false)}
        />
      )) ||
        displayRow}
      <div className='flex justify-between align-middle'>
        <div className='self-center'>{player.name}</div>
        <Button onClick={() => showEditPlayer(player)}>Edit</Button>
      </div>
    </li>
  );
};

export default PlayerRow;
