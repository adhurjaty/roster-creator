import Game from '@/lib/models/game';

import ListView from '@/components/list/ListView';

type TeamGame = Game & { teamId: string };

interface Props {
  games: TeamGame[];
}

const GamesView = ({ games }: Props) => {
  const { past, present, future } = games.splitDate(new Date());

  const gamesSection = (heading: string, gamesSlice: TeamGame[]) => (
    <>
      <h4>{heading}</h4>
      <ListView
        list={gamesSlice.map((game) => ({
          key: game.id,
          name: game.name,
          date: game.date,
          location: `/teams/${game.teamId}/games/${game.id}`,
        }))}
      >
        {(game) => (
          <div className='flex justify-between'>
            <div>{game.name}</div>
            <div>{game.date.toLocaleString().replace(/:\d{2}\s/, ' ')}</div>
          </div>
        )}
      </ListView>
    </>
  );

  return (
    <>
      {present.length > 0 && gamesSection("Today's games", present)}
      {future.length > 0 && gamesSection('Upcoming games', future)}
      {past.length > 0 && gamesSection('Past games', past)}
    </>
  );
};

export default GamesView;
