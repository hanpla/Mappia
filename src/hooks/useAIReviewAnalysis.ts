'use client';

import { useQuery } from '@tanstack/react-query';

import { getAIReviewAnalysis } from '@/lib/api/ai-review';

import { CachedAIReviewAnalysis } from '@/types/ai-review';

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(e);
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(e);
    }
  },
};

export const useAIReviewAnalysis = (
  params: Parameters<typeof getAIReviewAnalysis>[0],
) => {
  return useQuery({
    queryKey: ['ai-review', params.activityId, params.totalCount],

    queryFn: async () => {
      const storageKey = `ai-review-${params.activityId}`;
      const cached = safeLocalStorage.getItem(storageKey);

      if (cached) {
        const parsed: CachedAIReviewAnalysis = JSON.parse(cached);

        if (parsed.totalCount === params.totalCount) {
          return parsed.analysis;
        }

        safeLocalStorage.removeItem(storageKey);
      }

      const result = await getAIReviewAnalysis(params);

      safeLocalStorage.setItem(
        storageKey,
        JSON.stringify({
          totalCount: params.totalCount,
          analysis: result,
        }),
      );

      return result;
    },

    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
