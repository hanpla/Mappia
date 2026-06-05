'use client';

interface ReservationsSkeletonProps {
  count?: number;
}

export default function ReservationsSkeleton({
  count = 3,
}: ReservationsSkeletonProps) {
  return (
    <div className="mt-0 space-y-6 select-none">
      <div className="mb-6 flex justify-end">
        <div className="border-gray-DDD bg-white-FFF flex h-12 w-32 animate-pulse items-center justify-between rounded-2xl border px-5">
          <div className="h-4 w-12 rounded bg-gray-200" />
          <div className="h-4 w-4 rounded-full bg-gray-200" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-white-FFF border-gray-DDD flex min-h-[200px] w-full animate-pulse rounded-2xl border"
          >
            <div className="w-[200px] flex-shrink-0 self-stretch rounded-l-2xl bg-gray-200" />

            <div className="flex flex-grow flex-col px-4 pt-4 pb-3">
              <div>
                <div className="h-5 w-16 rounded bg-gray-200" />
                <div className="mt-1.5 mb-2 h-7 w-2/3 rounded bg-gray-200" />
                <div className="h-5 w-48 rounded bg-gray-200" />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-1">
                <div className="h-8 w-28 rounded bg-gray-200" />
                <div className="h-12 w-[108px] flex-shrink-0" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
