import Button from '../common/button/Button';

interface RetryButtonProps {
  onClick: () => void;
}
export default function RetryButton({ onClick }: RetryButtonProps) {
  return (
    <Button variant="solid" onClick={onClick}>
      다시 시도하기
    </Button>
  );
}
