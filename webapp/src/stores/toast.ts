import { create } from 'zustand';

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message: string, timer = 3000) => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message }] }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, timer);
  },
}));


interface ToastState {
  toasts: { id: number, message: string }[],
  addToast: (message: string, timer?: number) => void
}
