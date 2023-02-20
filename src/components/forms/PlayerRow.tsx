import { Result } from 'neverthrow';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import EditPlayer from '@/components/forms/EditPlayer';
import PlayerView from '@/components/viewModels/playerView';

interface Props {
  player: PlayerView;
  onUpdatePlayer: (player: PlayerView) => Result<null, string>;
  isEditMode?: boolean;
}

const PlayerRow = ({ player, onUpdatePlayer, isEditMode }: Props) => {
  const [editMode, setEditMode] = useState(isEditMode ?? false);

  const localOnUpdatePlayer = (player: PlayerView) => {
    return onUpdatePlayer(player).map((_) => {
      setEditMode(false);
      return _;
    });
  };

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
          onSubmit={localOnUpdatePlayer}
          onCancel={() => setEditMode(false)}
        />
      )) ||
        displayRow}
    </li>
  );
};

export default PlayerRow;
