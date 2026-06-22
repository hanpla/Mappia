export default function ReservationsSkeleton() {
  return (
    <div className="mt-7.5 space-y-6 select-none">
      <div className="border-gray-DDD flex h-14 w-full animate-pulse items-center justify-between rounded-lg border bg-gray-50 px-5">
        <div className="h-5 w-48 rounded bg-gray-200" />
        <div className="h-6 w-6 rounded-full bg-gray-200" />
      </div>

      <div className="border-gray-EEE flex w-full animate-pulse flex-col rounded-3xl border bg-white p-4 shadow-sm select-none md:p-5 lg:p-6">
        <div className="mb-2 flex items-center justify-center gap-6 py-1 lg:mb-4 lg:gap-8 lg:py-2">
          <div className="h-6 w-6 rounded bg-gray-200" />
          <div className="h-7 w-28 rounded bg-gray-200" />
          <div className="h-6 w-6 rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-7 pb-2 text-center lg:pb-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex justify-center">
              <div className="h-4 w-6 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-between">
          {Array.from({ length: 6 }).map((_, weekIdx) => (
            <div
              key={weekIdx}
              className="border-gray-EEE grid grid-cols-7 border-t pt-1"
            >
              {Array.from({ length: 7 }).map((_, dayIdx) => (
                <div
                  key={dayIdx}
                  className="flex min-h-17 flex-col items-center justify-start rounded-xl p-0.5 md:min-h-16 lg:min-h-24 lg:p-1"
                >
                  <div className="mt-1 h-5 w-6 rounded bg-gray-200" />

                  <div className="mt-1 flex w-full flex-col gap-0.5 px-0.5 lg:gap-1">
                    {(weekIdx * 7 + dayIdx) % 11 === 0 && (
                      <div className="h-5 w-full rounded bg-gray-100" />
                    )}
                    {(weekIdx * 7 + dayIdx) % 13 === 0 && (
                      <div className="h-5 w-full rounded bg-gray-200" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
