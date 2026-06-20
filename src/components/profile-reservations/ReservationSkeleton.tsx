'use client';

interface ReservationsSkeletonProps {
  count?: number;
}

export default function ReservationsSkeleton({
  count = 3,
}: ReservationsSkeletonProps) {
  return (
    <div className="mt-0 w-full space-y-6 select-none">
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
            className="bg-white-FFF border-gray-DDD flex min-h-40 w-full animate-pulse overflow-hidden rounded-2xl border md:min-h-48"
          >
            <div className="w-32 shrink-0 self-stretch bg-gray-200 sm:w-40 md:w-48" />

            <div className="flex grow flex-col justify-between px-4 py-4 md:px-6">
              <div className="space-y-2 pl-1 md:pl-0">
                <div className="h-4 w-14 rounded bg-gray-200" />
                <div className="mt-1 mb-1 h-5 w-2/3 rounded bg-gray-200 md:mt-1.5 md:mb-2 md:h-6" />
                <div className="h-4 w-48 rounded bg-gray-200 md:w-64" />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-1 pl-1 md:pl-0">
                <div className="h-5 w-20 rounded bg-gray-200 md:h-6 md:w-24" />
                <div className="flex items-center justify-end gap-2 md:gap-3">
                  <div className="h-8 w-16 rounded-md bg-gray-200 md:h-10 md:w-24 md:rounded-xl lg:h-11 lg:w-28 lg:rounded-2xl" />
                  <div className="h-8 w-16 rounded-md bg-gray-200 md:h-10 md:w-24 md:rounded-xl lg:h-11 lg:w-28 lg:rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
