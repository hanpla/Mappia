export type ToastType = 'success' | 'error' | 'information';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}
