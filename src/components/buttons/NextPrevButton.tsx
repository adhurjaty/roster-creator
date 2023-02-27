import Button from '@/components/buttons/Button';

interface Props {
  disablePrev?: boolean;
  onPrev: () => void;
  disableNext?: boolean;
  onNext: () => void;
}

const NextPrevButton = ({
  onPrev,
  disablePrev,
  onNext,
  disableNext,
}: Props) => (
  <div className='flex'>
    <Button onClick={onPrev} disabled={disablePrev}>
      {'<'}
    </Button>
    <Button onClick={onNext} disabled={disableNext}>
      {'>'}
    </Button>
  </div>
);

export default NextPrevButton;
