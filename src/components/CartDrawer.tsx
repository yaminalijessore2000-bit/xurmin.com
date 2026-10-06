import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { ProductVisual } from './ProductVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: string | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onUpdateQuantity,
  onRemoveItem,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'outside'>('dhaka');

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  const freeDeliveryThreshold = 2500;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : deliveryArea === 'dhaka' ? 60 : 120;

  // Coupon discount calculation
  let discountAmount = 0;
  if (appliedCoupon === 'SAVE15') {
    discountAmount = Math.round(subtotal * 0.15);
  } else if (appliedCoupon === 'WELCOME200') {
    discountAmount = Math.min(200, subtotal);
  } else if (appliedCoupon === 'XURMIN10') {
    discountAmount = Math.round(subtotal * 0.1);
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon. Try SAVE15 or WELCOME200');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-display text-lg font-bold text-stone-900">
                Shopping Cart ({items.reduce((acc, cur) => acc + cur.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-amber-50/70 border-b border-amber-200/60 p-3 sm:px-5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1 font-medium text-stone-700">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                {isFreeDelivery ? (
                  <span className="text-emerald-700 font-bold">You unlocked FREE Delivery across Bangladesh!</span>
                ) : (
                  <span>
                    Add <strong className="font-mono text-stone-900">৳{remainingForFreeDelivery.toLocaleString()}</strong> more for FREE delivery
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-stone-500 font-bold">
                {freeDeliveryPercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-600 transition-all duration-500 rounded-full"
                style={{ width: `${freeDeliveryPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Itemized List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-stone-900">Your cart is empty</h3>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Discover quality home and kitchen essentials carefully selected for your everyday life.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3.5 rounded-xl border border-stone-200/90 shadow-2xs flex gap-3.5 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                    <ProductVisual product={item.product} className="h-full" />
                  </div>

                  {/* Info & Quantity Adjuster */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1 leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-900">
                        ৳{item.product.discountedPrice.toLocaleString()}
                      </span>
                      {item.product.discountPercentage > 0 && (
                        <span className="text-[10px] text-stone-400 line-through font-mono">
                          ৳{item.product.regularPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-900 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs font-bold text-stone-900">
                        ৳{(item.product.discountedPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Breakdown & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-4">
              
              {/* Delivery Zone Selector */}
              <div className="flex items-center justify-between text-xs bg-stone-50 p-2 rounded-lg border border-stone-200/80">
                <span className="text-stone-600 font-medium">Delivery Destination:</span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryZone"
                      checked={deliveryArea === 'dhaka'}
                      onChange={() => setDeliveryArea('dhaka')}
                      className="accent-stone-900 text-xs"
                    />
                    <span className="text-stone-700">Inside Dhaka (৳60)</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryZone"
                      checked={deliveryArea === 'outside'}
                      onChange={() => setDeliveryArea('outside')}
                      className="accent-stone-900 text-xs"
                    />
                    <span className="text-stone-700">Outside Dhaka (৳120)</span>
                  </label>
                </div>
              </div>

              {/* Coupon Form */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Coupon Code (e.g. SAVE15)"
                      className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>
                  )}
                </form>
              ) : (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-mono font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon: {appliedCoupon}</span>
                    <span className="text-emerald-700 font-normal">(-৳{discountAmount.toLocaleString()})</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-stone-900">৳{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="font-mono">-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-semibold">FREE</span>
                    ) : (
                      `৳${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-950">
                  <span>Total Amount</span>
                  <span className="font-mono text-base font-extrabold text-stone-950">
                    ৳{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-850 active:bg-black text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Cash on Delivery Available
                </span>
                <span>·</span>
                <span>bKash / Nagad / Card</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
