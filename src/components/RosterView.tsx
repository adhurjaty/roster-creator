import { useState } from 'react';

import Roster from '@/lib/models/roster';

import Button from '@/components/buttons/Button';
import NextPrevButton from '@/components/buttons/NextPrevButton';
import LineupView from '@/components/LineupView';
import ListView from '@/components/list/ListView';

interface Props {
  roster: Roster;
}

const RosterView = ({ roster }: Props) => {
  const [inning, setInning] = useState(1);
  const [rosterEditMode, setRosterEditMode] = useState(false);

  return (
    <div className='flex flex-col items-center'>
      <h3>Roster</h3>
      {(rosterEditMode && (
        <>
          <Button onClick={() => setRosterEditMode(false)}>Save</Button>
        </>
      )) || (
        <>
          <ListView list={roster.players || []} />
          <Button onClick={() => setRosterEditMode(true)}>Edit Roster</Button>
        </>
      )}
      <h3 className='mt-4'>Lineups</h3>
      <div className='mb-2 flex w-full justify-between'>
        <h4>Inning {inning}</h4>
        <NextPrevButton
          onPrev={() => setInning(inning - 1)}
          onNext={() => setInning(inning + 1)}
          disablePrev={inning <= 1}
        />
      </div>
      <LineupView lineup={roster.lineups.find((l) => l.period === inning)} />
    </div>
  );
};

export default RosterView;
