
export interface Toast {
  color?: string;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastData extends Toast {
  id: string;
  open: boolean;
  dismissTimeout?: NodeJS.Timeout;
  duration: number;
  color: string;
}

export const toasts = () => ({
  toasts: {} as { [id: string]: ToastData },

  update(id: string, data: Partial<ToastData>) {
    this.toasts[id] = Object.assign({}, this.toasts[id], data);
  },

  append(toast: Toast) {
    const id = Math.random().toString(36).slice(2, 7)
    setTimeout(() => {
      this.show(id);
    }, 200)
    this.toasts[id] = Object.assign({ duration: 10000, color: '', }, toast, {
      id,
      open: false,
    });
    this.startDismiss(id);
  },

  show(id: string) {
    this.update(id, { open: true });
  },

  dismiss(id: string) {
    this.update(id, { open: false });
    this.stopDismiss(id);
    setTimeout(() => {
      this.remove(id);
    }, 200);
  },

  remove(id: string) {
    delete this.toasts[id]
  },

  stopDismiss(id: string) {
    const { dismissTimeout } = this.toasts[id];
    if (dismissTimeout === undefined) return;
    clearTimeout(dismissTimeout);
    this.update(id, { dismissTimeout: undefined })
  },

  startDismiss(id: string) {
    const dismissTimeout = setTimeout(() => {
      this.dismiss(id);
    }, this.toasts[id].duration);
    this.update(id, { dismissTimeout });
  },
})

export const triggerToast = (toast: Toast) => {
  window.dispatchEvent(new CustomEvent("app:toast", { detail: toast }));
}
