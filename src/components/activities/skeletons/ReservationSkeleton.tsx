const SKELETON_DAYS = Array.from({ length: 35 }, (_, i) => i);
const DAYS_OF_WEEK = Array.from({ length: 7 }, (_, i) => i);

export default function ReservationSkeleton() {
  return (
    <section className="space-y-6 rounded-3xl border border-stone-300 bg-white p-7.5 shadow-[0_4px_16px_rgba(17,34,17,0.05)]">
      <div>
        <span className="block h-8 w-28 rounded bg-stone-200" />
      </div>

      <div className="space-y-3">
        <div className="h-5 w-10 rounded bg-stone-200" />
        <div className="flex w-full flex-col bg-white">
          <div className="mb-[6%] flex items-center justify-between">
            <div className="h-6 w-32 rounded bg-stone-200" />
            <div className="flex gap-4 md:gap-5">
              <div className="h-5 w-4 rounded bg-stone-200" />
              <div className="h-5 w-4 rounded bg-stone-200" />
            </div>
          </div>
          <div className="mb-[3%] grid grid-cols-7 text-center">
            {DAYS_OF_WEEK.map((idx) => (
              <div
                key={idx}
                className="flex aspect-square items-center justify-center"
              >
                <div className="h-4 w-4 rounded bg-stone-200" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1.5 text-center md:gap-y-2">
            {SKELETON_DAYS.map((idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-[4%]"
              >
                <div className="aspect-square w-full rounded-full bg-stone-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="h-5 w-24 rounded bg-stone-200" />
        <div className="h-9 w-35 rounded-3xl bg-stone-200" />
      </div>

      <div className="space-y-3">
        <div className="h-5 w-32 rounded bg-stone-200" />
        <div className="flex flex-wrap gap-2 pt-1">
          <div className="h-10 w-full rounded-xl bg-stone-200" />
        </div>
      </div>

      <div className="flex flex-row items-center justify-between border-t border-t-stone-300 pt-5">
        <div className="flex flex-row items-center gap-1.5">
          <span className="block h-6 w-14 rounded bg-stone-200" />
          <span className="block h-6 w-24 rounded bg-stone-200" />
        </div>
        <div className="h-11 w-24 rounded-xl bg-stone-200" />
      </div>
    </section>
  );
}
