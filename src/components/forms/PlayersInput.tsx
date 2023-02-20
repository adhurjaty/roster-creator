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

const validateUniqueNames = (ps: PlayerView[], name: string) => {
  const player = ps.find((p) => p.name === name);
  if (player) {
    return err<null, Error>(new Error(`Player: ${name} already exists`));
  }

  return ok<null, Error>(null);
};

const PlayersInput = ({ onChange }: Props) => {
  const [players, setPlayers] = useState<PlayerView[]>([]);
  const [newPlayer, setNewPlayer] = useState<PlayerView | null>(null);

  const onUpdatePlayer = (player: PlayerView) => {
    return players
      .findIndexResult((p) => player.id === p.id)
      .andThen((idx) =>
        validateUniqueNames(players.removeAt(idx), player.name).map((_) => idx)
      )
      .map((idx) => [
        ...players.slice(0, idx),
        player,
        ...players.slice(idx + 1),
      ])
      .map((updatedPlayers) => {
        setPlayers(updatedPlayers);
        onChange(
          updatedPlayers.map((p) => ({
            name: p.name,
            positions: p.positions,
          }))
        );
        return null;
      });
  };

  const onCreatePlayer = (player: PlayerView) => {
    return validateUniqueNames(players, player.name)
      .map((_) => ({
        ...player,
        id: players.max((p) => p.id, -1) + 1,
      }))
      .map((newPlayer) => [...players, newPlayer])
      .map((updatedPlayers) => {
        setPlayers(updatedPlayers);
        onChange(
          updatedPlayers.map((p) => ({
            name: p.name,
            positions: p.positions,
          }))
        );
        setNewPlayer(null);
        return null;
      });
  };

  const onNewPlayer = () => {
    setNewPlayer({
      name: '',
      positions: [],
    });
  };

  const onDeletePlayer = (player: PlayerView) => {
    players
      .findIndexResult((p) => p.id === player.id)
      .map((idx) => setPlayers(players.removeAt(idx)));
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
