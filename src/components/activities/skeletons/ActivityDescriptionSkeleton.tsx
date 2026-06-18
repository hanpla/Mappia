export default function ActivityDescriptionSkeleton() {
  return (
    <section className="space-y-2 border-b border-[#E0E0E5] pb-5 md:pb-7.5 lg:pb-10">
      <h3>
        <span className="block h-6 w-20 rounded bg-stone-200" />
      </h3>
      <div className="space-y-2 pt-1">
        <div className="h-5 w-full rounded bg-stone-200" />
        <div className="h-5 w-full rounded bg-stone-200" />
        <div className="h-5 w-3/4 rounded bg-stone-200" />
      </div>
    </section>
  );
}
