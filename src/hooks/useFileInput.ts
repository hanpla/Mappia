import { useRef } from 'react';

interface UseFileInputOptions {
  name: string;
  accept: string;
  multiple?: boolean;
  onUpload: (files: File[]) => void;
}

export default function useFileInput({
  name,
  accept,
  multiple = false,
  onUpload,
}: UseFileInputOptions) {
  const ref = useRef<HTMLInputElement>(null);

  const trigger = () => ref.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onUpload(Array.from(e.target.files));
    e.target.value = '';
  };

  const inputProps = {
    ref,
    type: 'file' as const,
    name,
    accept,
    multiple,
    onChange: handleChange,
    className: 'hidden',
  };

  return { trigger, inputProps };
}
