export default function PhotoGallerySkeleton() {
  return (
    <section className="flex h-61.25 gap-2 overflow-hidden rounded-3xl md:h-100 md:gap-3">
      <div className="relative h-full w-[50%] bg-stone-200" />
      <div className="flex h-full flex-1 flex-col gap-2 md:gap-3">
        <div className="relative flex-1 bg-stone-200" />
        <div className="relative flex-1 bg-stone-200" />
      </div>
    </section>
  );
}
