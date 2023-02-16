import { useContext } from 'react';

import Position from '@/lib/models/position';

import PositionsContext from '@/components/contexts/PositionsContext';
import MultiSelect from '@/components/forms/MultiSelect';

interface Props {
  selectedPositions: Position[];
  setSelectedPositions: (positions: Position[]) => void;
}

const PositionsSelector = ({
  selectedPositions,
  setSelectedPositions,
}: Props) => {
  const positions = useContext(PositionsContext);

  return (
    <MultiSelect
      choices={positions}
      selectedChoices={selectedPositions}
      setSelectedChoices={setSelectedPositions}
    />
  );
};

export default PositionsSelector;
