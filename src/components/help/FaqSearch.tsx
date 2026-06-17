import IconSearch from '@/components/common/icon/IconSearch';
import IconX from '@/components/common/icon/IconX';

interface FaqSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
}

export default function FaqSearch({
  value,
  onChange,
  onSearch,
}: FaqSearchProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    onChange('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto w-full max-w-2xl">
      <input
        type="text"
        placeholder="어떤 도움이 필요하신가요?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-gray-DDD bg-white-FFF textmd-regular text-brown-2A2 placeholder-gray-ADA focus:border-khaki-6B5 focus:ring-khaki-6B5 w-full rounded-2xl border py-4 pr-12 pl-12 shadow-sm transition-all duration-200 outline-none focus:ring-1"
      />
      <button
        type="submit"
        className="text-khaki-6B5 hover:text-brown-2A2 absolute inset-y-0 left-4 flex cursor-pointer items-center border-0 bg-transparent p-0"
      >
        <IconSearch size={20} color="currentColor" />
      </button>
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="text-gray-ADA hover:text-khaki-6B5 absolute inset-y-0 right-4 flex cursor-pointer items-center border-0 bg-transparent p-0"
        >
          <IconX size={20} color="currentColor" />
        </button>
      )}
    </form>
  );
}
