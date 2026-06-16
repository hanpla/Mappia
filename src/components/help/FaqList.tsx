'use client';

import FaqAccordion from './FaqAccordion';
import { FaqCategory } from './FaqTab';

interface FaqItem {
  id: number;
  category: 'reservation' | 'cancel' | 'host' | 'account';
  categoryLabel: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    category: 'reservation',
    categoryLabel: '예약/결제',
    question: '예약 신청을 완료했는데 언제 확정되나요?',
    answer:
      '체험 예약 신청 후, 해당 체험의 호스트가 확인 후 예약을 승인하거나 거절하게 됩니다. 일반적으로 호스트는 24시간 이내에 예약을 검토하며, 예약이 확정되면 우측 상단 종 모양 알림창을 통해 즉시 확인하실 수 있습니다. 마이페이지 예약 내역에서도 상태 변화를 확인하실 수 있습니다.',
  },
  {
    id: 2,
    category: 'reservation',
    categoryLabel: '예약/결제',
    question: '결제 수단은 어떤 것들을 지원하나요?',
    answer:
      '신용/체크카드 및 간편결제(카카오페이, 네이버페이, 토스페이), 무통장 입금(가상계좌) 결제를 지원합니다. 모바일과 데스크톱 브라우저 모두에서 안전한 결제 모듈을 지원하므로 안심하고 결제하셔도 좋습니다.',
  },
  {
    id: 3,
    category: 'cancel',
    categoryLabel: '취소/환불',
    question: '예약을 취소하고 싶어요. 환불 규정이 어떻게 되나요?',
    answer:
      'Mappia 서비스의 환불은 체험 시작일 기준으로 다음과 같이 차등 적용됩니다.\n- 체험 7일 전까지 취소 시: 100% 환불\n- 체험 3일 전까지 취소 시: 50% 환불\n- 체험 2일 전부터 당일 취소 시: 환불 불가\n\n취소 및 환불 신청은 [마이페이지] > [예약 내역]에서 직접 취소 요청을 진행하실 수 있습니다.',
  },
  {
    id: 4,
    category: 'cancel',
    categoryLabel: '취소/환불',
    question: '우천이나 기상 악화 시 취소와 환불은 어떻게 되나요?',
    answer:
      '야외 활동이나 우천의 영향을 받는 체험의 경우, 정상 진행이 곤란하다고 판단되면 호스트 측에서 체험 일정을 취소할 수 있습니다. 호스트 취소 시 날짜와 상관없이 100% 전액 환불되며 알림이 발송됩니다. 기상 상태와 관련해 궁금한 점이 있으시다면 체험 페이지 하단의 호스트 문의하기를 통해 소통해 주시기 바랍니다.',
  },
  {
    id: 5,
    category: 'host',
    categoryLabel: '호스트 관련',
    question: '내 체험을 등록하고 판매하고 싶어요.',
    answer:
      '로그인 후 우측 상단 프로필 이미지 클릭 > [마이페이지] > [체험 등록] 메뉴에서 체험을 신규 개설하실 수 있습니다. 체험 제목, 카테고리, 설명글, 가격 정보, 예약 가능 시간대 및 관련 대표 이미지들을 작성하시면 즉시 Mappia 서비스에 등록되어 게스트 예약을 받으실 수 있습니다.',
  },
  {
    id: 6,
    category: 'host',
    categoryLabel: '호스트 관련',
    question: '게스트의 예약 신청은 어디서 승인 또는 거절하나요?',
    answer:
      '호스트 계정으로 로그인 후 [마이페이지] > [예약 관리] 페이지에 접속하시면 게스트들의 대기 상태 예약 신청들을 확인할 수 있습니다. 수용 인원과 일정을 판단하여 즉시 승인하거나 거절할 수 있으며, 거절 시 사유를 작성해 전달하실 수 있습니다.',
  },
  {
    id: 7,
    category: 'host',
    categoryLabel: '호스트 관련',
    question: '체험비 정산은 언제 어떻게 입금되나요?',
    answer:
      '체험이 정상적으로 종료된 시점 기준으로 영업일 기준 5일 이내에 호스트님께서 설정해 두신 정산용 계좌번호로 입금됩니다. 정산된 총 금액과 수수료 등의 디테일은 마이페이지 정산 탭에서 실시간으로 추적 가능합니다.',
  },
  {
    id: 8,
    category: 'account',
    categoryLabel: '계정/기타',
    question: '비밀번호를 재설정하고 싶어요.',
    answer:
      '로그인 화면 하단의 [비밀번호 찾기] 버튼을 통해 회원 가입 시 등록했던 이메일 주소를 입력해 주시면 비밀번호를 새로 안전하게 변경할 수 있는 인증 코드가 메일로 전송됩니다.',
  },
  {
    id: 9,
    category: 'account',
    categoryLabel: '계정/기타',
    question: '회원 탈퇴는 어떻게 하나요?',
    answer:
      '로그인 하신 상태에서 [마이페이지] > [내 정보 수정] 하단에 있는 [회원 탈퇴] 버튼을 통해 언제든 탈퇴가 가능합니다. 탈퇴 시 보유하셨던 가입 혜택, 과거 예약 이력 및 작성하신 소중한 후기들은 개인정보보호법에 의거 즉시 파기되므로 신중히 결정해 주시기 바랍니다.',
  },
];

interface FaqListProps {
  activeCategory: FaqCategory;
  searchQuery: string;
}

export default function FaqList({ activeCategory, searchQuery }: FaqListProps) {
  const filteredFaqs = FAQ_DATA.filter((item) => {
    const isCategoryMatched =
      activeCategory === 'all' || item.category === activeCategory;

    const cleanQuery = searchQuery.trim().toLowerCase();
    const isSearchMatched =
      cleanQuery === '' ||
      item.question.toLowerCase().includes(cleanQuery) ||
      item.answer.toLowerCase().includes(cleanQuery);

    return isCategoryMatched && isSearchMatched;
  });

  return (
    <div className="mx-auto mt-12 w-full max-w-3xl space-y-2">
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq) => (
          <FaqAccordion
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            categoryLabel={faq.categoryLabel}
          />
        ))
      ) : (
        <div className="text-center">
          <p className="textmd-medium text-gray-797">
            검색 결과에 맞는 자주 묻는 질문이 없습니다.
          </p>
          <p className="textsm-regular text-gray-ADA mt-1">
            다른 키워드로 검색하시거나 다른 카테고리를 선택해 보세요.
          </p>
        </div>
      )}
    </div>
  );
}
