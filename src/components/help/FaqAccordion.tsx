'use client';

import { useState } from 'react';

import IconChevronDown from '@/components/common/icon/IconChevronDown';

interface FaqAccordionProps {
  question: string;
  answer: string;
  categoryLabel: string;
}

export default function FaqAccordion({
  question,
  answer,
  categoryLabel,
}: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-gray-EEE hover:bg-ivory-F2E/5 border-b transition-colors duration-200">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex w-full cursor-pointer items-center justify-between py-5 text-left"
      >
        <div className="flex flex-col gap-1.5 pr-4">
          <span className="textxs-medium text-beige-8B7 bg-ivory-F2E/30 w-fit rounded px-2 py-0.5">
            {categoryLabel}
          </span>
          <span className="textmd-semibold text-brown-2A2 group-hover:text-khaki-6B5 md:textlg-semibold transition-colors duration-200">
            {question}
          </span>
        </div>
        <IconChevronDown
          size={20}
          color="currentColor"
          className={`text-khaki-6B5 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="textmd-regular text-gray-4B4 pt-1 pb-5 whitespace-pre-wrap">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
