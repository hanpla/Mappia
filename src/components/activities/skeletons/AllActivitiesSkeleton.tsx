interface AllActivitiesSkeletonProps {
  count?: number;
}

export default function AllActivitiesSkeleton({
  count = 8,
}: AllActivitiesSkeletonProps) {
  return (
    <div
      suppressHydrationWarning
      className="grid animate-pulse grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <div className="mb-3 aspect-square w-full rounded-2xl bg-stone-200" />
          <div className="mb-1.5 h-3 w-14 rounded bg-stone-200" />
          <div className="mb-1 h-4 w-full rounded bg-stone-200" />
          <div className="h-4 w-1/2 rounded bg-stone-200" />
        </div>
      ))}
    </div>
  );
}
