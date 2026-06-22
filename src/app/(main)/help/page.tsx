import { Metadata } from 'next';

import FaqContent from '@/components/help/FaqContent';

export const metadata: Metadata = {
  title: '자주 묻는 질문 - Mappia 고객센터',
  description:
    'Mappia 서비스 이용에 대한 자주 묻는 질문과 답변을 확인하세요. 예약, 결제, 취소, 환불 및 호스트 등록 관련 안내를 제공합니다.',
};

export default function HelpPage() {
  return <FaqContent />;
}
