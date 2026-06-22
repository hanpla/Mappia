import { create } from 'zustand';

import { Toast, ToastType } from '@/types/toast';

const TOAST_DURATION = 3000;

interface ToastState {
  toasts: Toast[];
  showToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  showToast: (type, message) => {
    const isDuplicate = get().toasts.some(
      (toast) => toast.type === type && toast.message === message,
    );
    if (isDuplicate) return;

    const id = crypto.randomUUID();

    set((state) => ({
      toasts: [...state.toasts, { id, type, message }],
    }));

    setTimeout(() => {
      get().removeToast(id);
    }, TOAST_DURATION);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export default useToastStore;
