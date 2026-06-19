export default function ReservationReviewModalSkeleton() {
  return (
    <div className="w-full max-w-[480px] animate-pulse p-2 text-center">
      <div className="mb-6">
        <div className="mx-auto h-6 w-3/5 rounded bg-gray-200 sm:h-7" />
        <div className="mx-auto mt-2 h-4 w-2/5 rounded bg-gray-200" />
      </div>
      <div className="mb-6 flex justify-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="h-12 w-12 rounded-full bg-gray-200" />
        ))}
      </div>
      <div className="mx-auto h-4 w-2/3 rounded bg-gray-200" />{' '}
    </div>
  );
}
