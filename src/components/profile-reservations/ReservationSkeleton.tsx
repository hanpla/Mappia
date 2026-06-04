'use client';

export default function ReservationsSkeleton() {
  return (
    <div className="font-pretendard mt-[0px] space-y-6 select-none">
      <div className="mb-6 flex justify-end">
        <div className="border-gray-DDD bg-white-FFF flex h-12 w-32 animate-pulse items-center justify-between rounded-2xl border px-5">
          <div className="h-4 w-12 rounded bg-gray-200" />
          <div className="h-4 w-4 rounded-full bg-gray-200" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-white-FFF border-gray-DDD flex h-[200px] w-full animate-pulse overflow-hidden rounded-2xl border"
          >
            <div className="h-full w-[200px] flex-shrink-0 bg-gray-200" />

            <div className="flex flex-grow flex-col justify-between p-6">
              <div>
                <div className="mb-2 h-4 w-14 rounded bg-gray-200" />

                <div className="mt-1.5 mb-2 h-6 w-2/3 rounded bg-gray-200" />

                <div className="mt-1 h-4 w-1/2 rounded bg-gray-200" />
              </div>

              <div className="flex items-end justify-between">
                <div className="h-7 w-28 rounded bg-gray-200" />

                {index % 2 === 0 && (
                  <div className="h-10 w-24 rounded-xl bg-gray-200" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
