import { AIReviewAnalysis } from '@/types/ai-review';

export interface AIReviewParams {
  activityId: number;
  title: string;
  category: string;
  description: string;
  reviews: string[];
}

export const getAIReviewAnalysis = async (
  params: AIReviewParams,
): Promise<AIReviewAnalysis> => {
  const res = await fetch('/api/ai-review-analysis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error('AI 분석 요청 실패');
  }

  return res.json();
};
