import { AIReviewAnalysis as AIReviewAnalysisType } from '@/types/ai-review';

interface Props {
  analysis: AIReviewAnalysisType;
}

export default function AIReviewAnalysis({ analysis }: Props) {
  return (
    <section className="rounded-2xl border border-gray-500 p-4">
      <h3 className="text2lg-bold mb-3">🤖 AI 후기 요약</h3>

      <p className="textmd-regular mb-3">{analysis.summary}</p>

      <div className="flex flex-wrap gap-2">
        {analysis.keywords.map((keyword) => (
          <span
            key={keyword}
            className="textmd-semibold rounded-full bg-white px-3 py-1"
          >
            #{keyword}
          </span>
        ))}
      </div>

      {!analysis.basedOnReviews && (
        <p className="textxs-medium mt-3 text-gray-500">
          후기 데이터가 없어 체험 설명을 기반으로 생성되었습니다.
        </p>
      )}
    </section>
  );
}
