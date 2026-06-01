export default function CardSkeleton() {
  return (
    <div className="flex w-full animate-pulse rounded-2xl bg-white shadow-sm">
      {/* 이미지 스켈레톤 */}
      <div className="h-36 w-36 rounded-tl-2xl rounded-bl-2xl bg-gray-200 md:h-39 md:w-39" />

      {/* 본문 스켈레톤 */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
        <div className="flex flex-col gap-2">
          {/* 평점 및 리뷰 수 스켈레톤 */}
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded bg-gray-200" />
            <div className="h-4 w-8 rounded bg-gray-200" />
            <div className="h-4 w-12 rounded bg-gray-200" />
          </div>
          {/* 제목 스켈레톤 */}
          <div className="h-6 w-3/4 rounded bg-gray-200 md:h-7" />
        </div>

        <div className="mt-auto flex items-center justify-between">
          {/* 가격 스켈레톤 */}
          <div className="h-6 w-20 rounded bg-gray-200 md:h-7" />
          {/* 밋볼 메뉴 스켈레톤 */}
          <div className="h-8 w-8 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
