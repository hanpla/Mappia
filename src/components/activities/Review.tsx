import AIReviewAnalysis from '@/components/activities/AIReviewAnalysis';

import IconStarOn from '../common/icon/IconStarOn';
import Pagination from '../common/pagination/Pagination';

export default function Review() {
  const MOCK_REVIEWS = [
    {
      id: 1,
      name: '김태현',
      date: '2023. 2. 4',
      text: '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!"',
    },
    {
      id: 2,
      name: '조민선',
      date: '2023. 2. 4',
      text: '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었고, 강사님의 친절한 설명 덕분에 저는 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다.',
    },
    {
      id: 3,
      name: '강지현',
      date: '2023. 2. 4',
      text: '전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 이번 체험을 거쳐 저의 춤추기 실력은 더욱 향상되었어요.',
    },
  ];

  return (
    <section>
      <h3 className="textlg-bold md:text2lg-bold mb-2 flex items-center gap-2">
        <span>체험 후기</span>
        <span className="textmd-semibold md:textlg-bold text-[#79747E]">
          1,300개
        </span>
      </h3>
      <div className="mb-[30px] flex flex-col items-center justify-center">
        <div className="text2xl-bold md:text3xl-bold mb-[2px]">4.2</div>
        <div className="textmd-bold md:textlg-bold mb-[6px]">매우 만족</div>
        <div className="mb-3 flex items-center gap-[2px]">
          <IconStarOn size={16} />
          <span className="textmd-medium text-[#79747E]">1,300개 후기</span>
        </div>
        <AIReviewAnalysis
          analysis={{
            summary:
              '이 체험은 매우 만족스럽다는 평가를 받고 있습니다. 많은 참가자들이 새로운 스타일과 춤추기에 대한 열정을 느끼고 있으며, 전문가 강사의 친절한 설명 덕분에 모든 수준의 참가자들이 쉽게 이해할 수 있다는 점이 특히 긍정적으로 언급되고 있습니다.',
            keywords: ['만족도 높음', '친절한 강사', '적합한 수준'],
            basedOnReviews: true,
          }}
        />
      </div>
      <ul className="mb-10 space-y-5">
        {MOCK_REVIEWS.map((review) => (
          <li
            key={review.id}
            className="rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(17,34,17,0.05)]"
          >
            <div className="mb-1 flex flex-row items-center gap-2">
              <span className="textmd-bold md:textlg-bold">{review.name}</span>
              <span className="textxs-medium md:textmd-medium text-[#A4A1AA]">
                {review.date}
              </span>
            </div>
            <div className="mb-2 flex md:mb-3" aria-label="평점 5점">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <IconStarOn key={i} size={16} />
                ))}
            </div>
            <p className="textmd-medium md:textlg-medium leading-relaxed">
              {review.text}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <Pagination totalCount={18} pageSize={3} visiblePageCount={5} />
      </div>
    </section>
  );
}
