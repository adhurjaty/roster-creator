import Lineup from '@/lib/models/lineup';

import ListView from '@/components/list/ListView';

interface Props {
  lineup: Lineup;
}

const LineupView = ({ lineup }: Props) => (
  <ListView
    list={lineup.playerPositions.map((pp) => ({
      name: pp.player.name,
      position: pp.position.name,
    }))}
  >
    {(item) => (
      <div className='flex justify-between'>
        <div>{item.name}</div>
        <div>{item.position}</div>
      </div>
    )}
  </ListView>
);

export default LineupView;
