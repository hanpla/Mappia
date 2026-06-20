const SKELETON_COUNT = 6;

export default function PopularActivitiesSkeleton() {
  return (
    <div
      suppressHydrationWarning
      className="scrollbar-hide animate-pulse overflow-x-hidden pb-2"
    >
      <div className="flex gap-3 md:gap-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <div
            key={index}
            className="h-40 w-56 shrink-0 rounded-2xl bg-stone-200 md:h-96 md:w-96"
          />
        ))}
      </div>
    </div>
  );
}
