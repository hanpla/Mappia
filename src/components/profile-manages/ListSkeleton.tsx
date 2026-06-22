import CardSkeleton from './CardSkeleton';

export default function ListSkeleton() {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
