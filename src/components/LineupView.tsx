import Lineup from '@/lib/models/lineup';

import Button from '@/components/buttons/Button';
import ListView from '@/components/list/ListView';

interface Props {
  lineup?: Lineup;
}

const LineupView = ({ lineup }: Props) => (
  <>
    {(lineup && (
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
    )) || <Button>+ Lineup</Button>}
  </>
);

export default LineupView;
