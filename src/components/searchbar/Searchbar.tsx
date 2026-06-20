'use client';

import IconBed from '@/components/common/icon/IconBed';
import Input from '@/components/common/input/Input';

import Button from '../common/button/Button';

export interface SearchbarProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
}

export default function Searchbar({
  value,
  setValue,
  onSubmit,
  className = '',
}: SearchbarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`border-gray-DDD mt-10 flex w-full flex-col gap-3.75 md:gap-8 md:p-8 ${className}`}
    >
      <h2 className="textlg-bold text-black-1B1 md:text2xl-bold text-center">
        무엇을 체험하고 싶으신가요?
      </h2>

      <div className="flex items-center gap-2.5 md:gap-3">
        <Input
          id="search-input"
          name="keyword"
          placeholder="내가 원하는 체험은"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          leftIcon={<IconBed color="#8b7c55" size={40} />}
          labelType="floating"
          labelBgClass="bg-[linear-gradient(to_bottom,#f2ebdc_50%,#ffffff_50%)] peer-focus:bg-[linear-gradient(to_bottom,#f2ebdc_50%,#ffffff_50%)]"
          className="min-w-0 flex-1"
        />
        <Button
          type="submit"
          disabled={value.trim() === ''}
          className="h-12! w-20 shrink-0 whitespace-nowrap md:h-14! md:w-24"
        >
          검색하기
        </Button>
      </div>
    </form>
  );
}
