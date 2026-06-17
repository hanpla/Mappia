'use client';

import { useState } from 'react';

import FaqList from '@/components/help/FaqList';
import FaqSearch from '@/components/help/FaqSearch';
import FaqTab, { FaqCategory } from '@/components/help/FaqTab';

export default function FaqContent() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('all');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="py-10 pt-8 pb-16">
      <h1 className="text3xl-bold text-brown-2A2 text-center">
        자주 묻는 질문
      </h1>

      <div className="mt-8">
        <FaqSearch
          value={searchInputValue}
          onChange={setSearchInputValue}
          onSearch={setSearchQuery}
        />
      </div>

      <div className="mt-12">
        <FaqTab
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <FaqList activeCategory={activeCategory} searchQuery={searchQuery} />
    </div>
  );
}
