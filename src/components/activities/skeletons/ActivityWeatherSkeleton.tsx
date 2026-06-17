const SKELETON_WEATHER_CARDS = [1, 2, 3, 4, 5];

function WeatherSkeletonCard() {
  return (
    <div className="flex w-20.5 shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-stone-200/60 bg-white p-3 shadow-[0_2px_8px_rgba(17,34,17,0.02)] min-[480px]:w-full md:gap-2 md:p-4">
      <div className="flex flex-col items-center text-center">
        <div className="h-3.5 w-8 rounded bg-stone-200" />
        <div className="mt-1 h-3 w-6 rounded bg-stone-100" />
      </div>
      <div className="my-1 flex items-center justify-center">
        <div className="size-10 rounded-full bg-stone-200 md:size-12" />
      </div>
      <div className="flex h-4 items-center justify-center">
        <div className="h-3 w-8 rounded bg-stone-100" />
      </div>
      <div className="flex h-4 items-center justify-center gap-1.5">
        <div className="h-3.5 w-5 rounded bg-stone-200 md:h-4 md:w-6" />
        <div className="h-3.5 w-5 rounded bg-stone-200 md:h-4 md:w-6" />
      </div>
    </div>
  );
}

export default function ActivityWeatherSkeleton() {
  return (
    <section className="space-y-3 border-b border-[#E0E0E5] pb-5 md:pb-7.5 lg:pb-10">
      <div className="space-y-1.5">
        <div className="h-6 w-40 rounded bg-stone-200 md:h-7 md:w-52" />
        <div className="h-3 w-60 rounded bg-stone-200 md:h-3.5 md:w-80" />
      </div>
      <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-1 min-[480px]:grid min-[480px]:grid-cols-5 min-[480px]:gap-3 min-[480px]:overflow-visible md:gap-4">
        {SKELETON_WEATHER_CARDS.map((i) => (
          <WeatherSkeletonCard key={i} />
        ))}
      </div>
    </section>
  );
}
