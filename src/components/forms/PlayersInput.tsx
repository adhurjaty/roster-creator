import { err, ok } from 'neverthrow';
import { useState } from 'react';

import Player from '@/lib/models/player';

import Button from '@/components/buttons/Button';
import EditPlayer from '@/components/forms/EditPlayer';
import PlayerRow from '@/components/forms/PlayerRow';
import PlayerView from '@/components/viewModels/playerView';

interface Props {
  onChange: (players: Player[]) => void;
}

const PlayersInput = ({ onChange }: Props) => {
  const [players, setPlayers] = useState<PlayerView[]>([]);
  const [newPlayer, setNewPlayer] = useState<PlayerView | null>(null);

  const validateUniqueNames = (ps: PlayerView[], name: string) => {
    return !ps.find((p) => p.name === name);
  };

  const onUpdatePlayer = (player: PlayerView) => {
    const idx = players.findIndex((p) => player.id === p.id);

    if (idx < 0) {
      return err<null, string>('Could not find player');
    }

    if (
      !validateUniqueNames(
        [...players.slice(0, idx), ...players.slice(idx + 1)],
        player.name
      )
    ) {
      return err<null, string>(`Player: ${player.name} already exists`);
    }

    const updatedPlayers = [
      ...players.slice(0, idx),
      player,
      ...players.slice(idx + 1),
    ];
    setPlayers(updatedPlayers);
    onChange(
      updatedPlayers.map((p) => ({
        name: p.name,
        positions: p.positions,
      }))
    );
    return ok(null);
  };

  const onCreatePlayer = (player: PlayerView) => {
    if (!validateUniqueNames(players, player.name)) {
      return err<null, string>(`Player: ${player.name} already exists`);
    }

    const newId =
      players.reduce((max, p) => {
        const value = p.id ?? -1;
        return value > max ? value : max;
      }, -1) + 1;

    const updatedPlayers = [...players, { ...player, id: newId }];
    setPlayers(updatedPlayers);
    onChange(
      updatedPlayers.map((p) => ({
        name: p.name,
        positions: p.positions,
      }))
    );
    setNewPlayer(null);
    return ok(null);
  };

  const onNewPlayer = () => {
    setNewPlayer({
      name: '',
      positions: [],
    });
  };

  const onDeletePlayer = (player: PlayerView) => {
    const idx = players.findIndex((p) => player.id === p.id);
    if (idx < 0) {
      throw new Error('Could not find player');
    }

    setPlayers([...players.slice(0, idx), ...players.slice(idx + 1)]);
  };

  return (
    <>
      <ul className='mb-3 w-96 rounded-lg border border-gray-200 bg-white text-gray-900'>
        {players.map((player) => (
          <PlayerRow
            player={player}
            onUpdate={onUpdatePlayer}
            onDelete={onDeletePlayer}
            key={player.id ?? -1}
          />
        ))}
      </ul>
      {(newPlayer && (
        <EditPlayer
          player={newPlayer}
          onSubmit={onCreatePlayer}
          onCancel={() => setNewPlayer(null)}
        />
      )) || <Button onClick={onNewPlayer}>+ Player</Button>}
    </>
  );
};

export default PlayersInput;
