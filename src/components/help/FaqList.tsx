'use client';

import FAQ_DATA_JSON from '@/constants/faq.json';

import FaqAccordion from './FaqAccordion';
import { FaqCategory } from './FaqTab';

interface FaqItem {
  id: number;
  category: 'reservation' | 'cancel' | 'host' | 'account';
  categoryLabel: string;
  question: string;
  answer: string;
}

const FAQ_DATA = FAQ_DATA_JSON as FaqItem[];

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
