export default function ActivityMapSkeleton() {
  return (
    <section className="space-y-2 border-b border-[#E0E0E5] pb-5 md:pb-7.5 lg:pb-10">
      <h3>
        <span className="block h-6 w-20 rounded bg-stone-200" />
      </h3>
      <div>
        <span className="block h-5 w-60 rounded bg-stone-200" />
      </div>
      <div className="h-45 w-full rounded-3xl bg-stone-200 md:h-112.5" />
    </section>
  );
}
