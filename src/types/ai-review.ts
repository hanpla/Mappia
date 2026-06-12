export interface AIReviewAnalysis {
  summary: string;
  keywords: string[];
  basedOnReviews: boolean;
}

export interface CachedAIReviewAnalysis {
  reviewCount: number;
  analysis: AIReviewAnalysis;
}
