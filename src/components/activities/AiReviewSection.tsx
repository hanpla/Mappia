'use client';

import { useAIReviewAnalysis } from '@/hooks/useAIReviewAnalysis';

import AIReviewAnalysis from './AIReviewAnalysis';

interface Props {
  activityId: number;
  title: string;
  category: string;
  description: string;
  reviews: {
    content: string;
  }[];
  totalCount: number;
}

export default function AIReviewSection({
  activityId,
  title,
  category,
  description,
  reviews,
  totalCount,
}: Props) {
  const reviewTexts = reviews.map((review) => review.content);

  const { data: analysis, isLoading } = useAIReviewAnalysis({
    activityId,
    title,
    category,
    description,
    reviews: reviewTexts,
    totalCount,
  });

  return (
    <>
      {isLoading ? (
        <div className="mt-6 mb-6 rounded-2xl border border-stone-200 p-4">
          <div className="mb-3 block h-6 w-28 rounded bg-stone-200" />
          <div className="mb-3 space-y-2">
            <div className="h-4 w-full rounded bg-stone-200" />
            <div className="h-4 w-4/5 rounded bg-stone-200" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((tag) => (
              <div key={tag} className="h-7 w-16 rounded-full bg-stone-200" />
            ))}
          </div>
        </div>
      ) : analysis ? (
        <AIReviewAnalysis analysis={analysis} />
      ) : null}
    </>
  );
}
