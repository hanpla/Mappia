export default function MobileReservationSkeleton() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-[#E6E6E6] bg-white p-[18px_24px] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] lg:hidden">
      <div className="mb-3 flex flex-row items-center justify-between">
        <div className="flex flex-row items-baseline gap-1.5">
          <span className="block h-6 w-24 rounded bg-gray-200" />
          <span className="block h-4 w-12 rounded bg-gray-200" />
        </div>
        <div className="h-5 w-28 rounded bg-gray-200" />
      </div>
      <div className="h-11 w-full rounded-xl bg-gray-200" />
    </div>
  );
}
