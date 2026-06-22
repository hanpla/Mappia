'use client';

import { useQuery } from '@tanstack/react-query';

import { getActivityReviews } from '@/lib/api/activities';

import IconStarOn from '../common/icon/IconStarOn';
import Pagination from '../common/pagination/Pagination';
import AIReviewSection from './AiReviewSection';
import ReviewSkeleton from './skeletons/ReviewSkeleton';

interface ReviewProps {
  activityId: number;
  currentPage: number;
  title: string;
  category: string;
  description: string;
}

const PAGE_SIZE = 3;
const VISIBLE_PAGE_COUNT = 5;

const getRatingText = (rating: number) => {
  if (rating >= 4.0) return '매우 만족';
  if (rating >= 3.0) return '만족';
  if (rating >= 2.0) return '보통';
  return '불만족';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};

export default function Review({
  activityId,
  currentPage,
  title,
  category,
  description,
}: ReviewProps) {
  const { data: res, isLoading } = useQuery({
    queryKey: ['activityReviews', activityId, currentPage || 1],
    queryFn: () => getActivityReviews(activityId, currentPage || 1, PAGE_SIZE),
    placeholderData: (previousData) => previousData,
    enabled: !!activityId,
  });

  const { data: allReviewsRes } = useQuery({
    queryKey: ['activityReviewsAll', activityId],
    queryFn: () => getActivityReviews(activityId, 1, 10),
    enabled: !!activityId,
    staleTime: Infinity,
  });

  if (!activityId) return null;

  const reviews = res?.reviews || [];
  const totalCount = res?.totalCount || 0;
  const averageRating = res?.averageRating || 0;
  const allReviews = allReviewsRes?.reviews || [];

  if (isLoading && !res) {
    return <ReviewSkeleton />;
  }

  return (
    <section>
      <h3 className="textlg-bold md:text2lg-bold mb-2 flex items-center gap-2">
        <span>체험 후기</span>
        <span className="textmd-semibold md:textlg-bold text-[#79747E]">
          {totalCount.toLocaleString()}개
        </span>
      </h3>

      {totalCount > 0 && (
        <div className="mb-7.5 flex flex-col items-center justify-center">
          <div className="text2xl-bold md:text3xl-bold mb-0.5">
            {averageRating.toFixed(2)}
          </div>
          <div className="textmd-bold md:textlg-bold mb-1.5">
            {getRatingText(averageRating)}
          </div>
          <div className="flex items-center gap-0.5">
            <IconStarOn size={16} />
            <span className="textmd-medium text-[#79747E]">
              {totalCount.toLocaleString()}개 후기
            </span>
          </div>
        </div>
      )}
      <div className="mt-6 mb-6">
        <AIReviewSection
          activityId={activityId}
          title={title}
          category={category}
          description={description}
          reviews={allReviews}
          totalCount={totalCount}
        />
      </div>
      <ul className="space-y-5">
        {reviews.length === 0 ? (
          <li className="text-gray-797 textmd-medium md:textlg-medium py-10 text-center">
            작성된 후기가 없습니다.
          </li>
        ) : (
          reviews.map((review) => (
            <li
              key={review.id}
              className="rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(17,34,17,0.05)]"
            >
              <div className="mb-1 flex flex-row items-center gap-2">
                <span className="textmd-bold md:textlg-bold">
                  {review.user.nickname}
                </span>
                <span className="textxs-medium md:textmd-medium text-[#A4A1AA]">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <div
                className="mb-2 flex md:mb-3"
                aria-label={`평점 ${review.rating}점`}
              >
                {Array.from({ length: Math.floor(review.rating || 0) }).map(
                  (_, i) => (
                    <IconStarOn key={i} size={16} />
                  ),
                )}
              </div>
              <p className="textmd-medium md:textlg-medium leading-relaxed whitespace-pre-wrap">
                {review.content}
              </p>
            </li>
          ))
        )}
      </ul>

      {totalCount > 0 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            visiblePageCount={VISIBLE_PAGE_COUNT}
          />
        </div>
      )}
    </section>
  );
}
