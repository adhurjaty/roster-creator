import { err, ok } from 'neverthrow';
import { useState } from 'react';

import Player from '@/lib/models/player';
import Position from '@/lib/models/position';

import Button from '@/components/buttons/Button';
import EditPlayer from '@/components/forms/EditPlayer';

interface PlayerView {
  id?: number;
  name: string;
  positions: Position[];
}

interface Props {
  onChange: (players: Player[]) => void;
}

function addOrEditPlayer(
  player: PlayerView,
  players: PlayerView[]
): PlayerView[] {
  const playerViews = players.map((p) => (p.id === player.id ? player : p));

  if (player.id === undefined) {
    playerViews.push({
      ...player,
      id:
        players.reduce((max, p) => {
          const value = p.id ?? -1;
          return value > max ? value : max;
        }, -1) + 1,
    });
  }

  return playerViews;
}

const PlayersInput = ({ onChange }: Props) => {
  const [players, setPlayers] = useState<PlayerView[]>([]);
  const [editPlayer, setEditPlayer] = useState<PlayerView | null>(null);

  const onEditPlayer = (player: PlayerView) => {
    const playerViews = addOrEditPlayer(player, players);

    if (playerViews.filter((p) => p.name === player.name).length > 1) {
      return err<null, string>(`Player: ${player.name} already exists`);
    }

    setPlayers([...playerViews]);
    onChange(
      playerViews.map((p) => ({
        name: p.name,
        positions: p.positions,
      }))
    );
    setEditPlayer(null);

    return ok(null);
  };

  const onCancel = () => {
    setEditPlayer(null);
  };

  const showEditPlayer = (player: PlayerView) => {
    setEditPlayer(player);
  };

  const newPlayer = () => {
    const player = {
      name: '',
      positions: [],
    };

    showEditPlayer(player);
  };

  return (
    <>
      {(editPlayer && (
        <EditPlayer
          player={editPlayer}
          onSubmit={onEditPlayer}
          onCancel={onCancel}
        />
      )) || (
        <>
          <ul className='mb-3 w-96 rounded-lg border border-gray-200 bg-white text-gray-900'>
            {players.map((player) => (
              <li
                className='w-full border-b border-gray-200 px-6 py-2'
                key={player.id ?? -1}
              >
                <div className='flex justify-between align-middle'>
                  <div className='self-center'>{player.name}</div>
                  <Button onClick={() => showEditPlayer(player)}>Edit</Button>
                </div>
              </li>
            ))}
          </ul>
          <Button onClick={newPlayer}>+ Player</Button>
        </>
      )}
    </>
  );
};

export default PlayersInput;
