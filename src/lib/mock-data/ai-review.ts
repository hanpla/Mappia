import { AIReviewAnalysis } from '@/types/ai-review';

export const mockReviewAnalysis: AIReviewAnalysis = {
  summary: '참여자들은 강사의 친절함과 체험의 재미를 높게 평가했습니다.',

  keywords: ['친절함', '재미', '초보자추천'],

  basedOnReviews: true,
};

export const mockNoReviewAnalysis: AIReviewAnalysis = {
  summary: '후기 데이터가 없어 체험 설명을 기반으로 분석했습니다.',

  keywords: ['스트릿댄스', '초보자환영', '실습중심'],

  basedOnReviews: false,
};
