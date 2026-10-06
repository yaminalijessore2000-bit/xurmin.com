import React from 'react';
import { CheckCircle2, ShoppingBag, Heart, Tag, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'coupon' | 'info';
  title: string;
  subtitle?: string;
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  onOpenCart?: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  toasts,
  onDismiss,
  onOpenCart
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-stone-900 text-white p-3.5 rounded-xl shadow-xl border border-stone-850 flex items-center justify-between gap-3 animate-slide-up"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'cart' && <ShoppingBag className="w-4 h-4 text-amber-400 shrink-0" />}
            {toast.type === 'wishlist' && <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />}
            {toast.type === 'coupon' && <Tag className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'info' && <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />}
            
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-white truncate">{toast.title}</h5>
              {toast.subtitle && (
                <p className="text-[11px] text-stone-400 truncate">{toast.subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {toast.type === 'cart' && onOpenCart && (
              <button
                onClick={onOpenCart}
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                View
              </button>
            )}
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-stone-400 hover:text-white p-1 rounded-sm cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
