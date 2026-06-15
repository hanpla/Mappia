export interface AIReviewAnalysis {
  summary: string;
  keywords: string[];
  basedOnReviews: boolean;
}

export interface CachedAIReviewAnalysis {
  totalCount: number;
  analysis: AIReviewAnalysis;
}
