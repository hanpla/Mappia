'use client';

import { useQuery } from '@tanstack/react-query';

import { getAIReviewAnalysis } from '@/lib/api/ai-review';

import { CachedAIReviewAnalysis } from '@/types/ai-review';

export const useAIReviewAnalysis = (
  params: Parameters<typeof getAIReviewAnalysis>[0],
) => {
  return useQuery({
    queryKey: ['ai-review', params.activityId],

    queryFn: async () => {
      const storageKey = `ai-review-${params.activityId}`;

      const cached = localStorage.getItem(storageKey);

      if (cached) {
        const parsed: CachedAIReviewAnalysis = JSON.parse(cached);

        if (parsed.reviewCount === params.reviews.length) {
          console.log('📦 캐시 사용');

          return parsed.analysis;
        }
      }

      console.log('🤖 Gemini 호출');

      const result = await getAIReviewAnalysis(params);

      localStorage.setItem(
        storageKey,
        JSON.stringify({
          reviewCount: params.reviews.length,
          analysis: result,
        }),
      );

      return result;
    },

    staleTime: 1000 * 60 * 60 * 24,
  });
};
