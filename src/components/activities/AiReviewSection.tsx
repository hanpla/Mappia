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
}

export default function AIReviewSection({
  activityId,
  title,
  category,
  description,
  reviews,
}: Props) {
  const reviewTexts = reviews.map((review) => review.content);

  const { data: analysis, isLoading } = useAIReviewAnalysis({
    activityId,
    title,
    category,
    description,
    reviews: reviewTexts,
  });

  return (
    <>
      {isLoading ? (
        <div>AI 분석 중...</div>
      ) : analysis ? (
        <AIReviewAnalysis analysis={analysis} />
      ) : null}
    </>
  );
}
