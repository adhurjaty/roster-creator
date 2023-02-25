import { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';

import Player from '@/lib/models/player';

import Button from '@/components/buttons/Button';
import EditPlayer from '@/components/forms/EditPlayer';

interface Props {
  value: Player;
  onChange: (player: Player) => void;
  onDelete: (player: Player) => void;
  defaultEditMode?: boolean;
  error?: FieldError;
}

const PlayerRow = ({
  value: player,
  defaultEditMode,
  onChange,
  onDelete,
  error,
}: Props) => {
  const [editMode, setEditMode] = useState(defaultEditMode ?? false);

  useEffect(() => {
    if (error) {
      setEditMode(true);
    }
  }, [error]);

  const localOnUpdate = (player: Player) => {
    onChange(player);
    setEditMode(false);
  };

  const onCancel = () => {
    setEditMode(false);
    if (!player.name) {
      onDelete(player);
    }
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
          value={player}
          onChange={localOnUpdate}
          onCancel={onCancel}
          error={error}
        />
      )) ||
        displayRow}
    </li>
  );
};

export default PlayerRow;
