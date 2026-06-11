import { AIReviewAnalysis as AIReviewAnalysisType } from '@/types/ai-review';

interface Props {
  analysis: AIReviewAnalysisType;
}

export default function AIReviewAnalysis({ analysis }: Props) {
  return (
    <section className="rounded-2xl border border-gray-500 p-4">
      <h3 className="mb-3 text-lg font-bold">🤖 AI 체험 분석</h3>

      <p className="mb-3 text-sm">{analysis.summary}</p>

      <div className="flex flex-wrap gap-2">
        {analysis.keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm"
          >
            #{keyword}
          </span>
        ))}
      </div>

      {!analysis.basedOnReviews && (
        <p className="mt-3 text-xs text-gray-500">
          후기 데이터가 없어 체험 설명을 기반으로 생성되었습니다.
        </p>
      )}
    </section>
  );
}
