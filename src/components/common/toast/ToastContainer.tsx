'use client';

import useToastStore from '@/stores/toastStore';

import Toast from './Toast';

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} type={toast.type} message={toast.message} />
      ))}
    </div>
  );
}
