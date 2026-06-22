export default function ActivityHeaderSkeleton() {
  return (
    <section className="flex justify-between border-b border-[#E0E0E5] pb-5 md:pb-7.5 lg:border-b-0 lg:pb-0">
      <div>
        <div className="mb-2 block md:mb-2.5">
          <span className="block h-4 w-12 rounded bg-stone-200" />
        </div>
        <h2>
          <span className="block h-7 w-64 rounded bg-stone-200 md:h-8 md:w-96" />
        </h2>
        <div className="mt-3 mb-1.5 flex items-center gap-1.5 md:mt-4">
          <div className="h-4 w-4 rounded bg-stone-200" />
          <span className="block h-4 w-14 rounded bg-stone-200" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded bg-stone-200" />
          <span className="block h-4 w-40 rounded bg-stone-200" />
        </div>
      </div>
      <div className="relative shrink-0">
        <div className="h-8 w-8 rounded-full bg-stone-200" />
      </div>
    </section>
  );
}
