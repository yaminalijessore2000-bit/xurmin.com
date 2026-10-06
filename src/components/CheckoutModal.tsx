import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, ArrowLeft, Copy, Check } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: string | null;
  onClearCart: () => void;
  onOrderPlaced: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onClearCart,
  onOrderPlaced
}) => {
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka City');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [bkashTrxId, setBkashTrxId] = useState('');

  // Step state: 'form' | 'confirmed'
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [formError, setFormError] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  // Pricing math
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  const isFreeDelivery = subtotal >= 2500;
  const isDhaka = district.toLowerCase().includes('dhaka');
  const deliveryFee = isFreeDelivery ? 0 : isDhaka ? 60 : 120;

  let discountAmount = 0;
  if (appliedCoupon === 'SAVE15') {
    discountAmount = Math.round(subtotal * 0.15);
  } else if (appliedCoupon === 'WELCOME200') {
    discountAmount = Math.min(200, subtotal);
  } else if (appliedCoupon === 'XURMIN10') {
    discountAmount = Math.round(subtotal * 0.1);
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 11) {
      setFormError('Please enter a valid 11-digit Bangladeshi phone number (e.g. 017XXXXXXXX)');
      return;
    }
    if (!address.trim()) {
      setFormError('Please enter your detailed delivery address');
      return;
    }
    if (paymentMethod === 'bkash' && !bkashTrxId.trim()) {
      setFormError('Please enter the 10-character bKash Transaction ID (TrxID)');
      return;
    }

    setFormError('');

    const newOrderId = `XM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderDetails = {
      orderId: newOrderId,
      customerName: name,
      phoneNumber: phone,
      address,
      district,
      items: [...items],
      subtotal,
      shippingFee: deliveryFee,
      discountAmount,
      total: finalTotal,
      paymentMethod,
      status: 'Confirmed',
      createdAt: 'Just now',
      courier: isDhaka ? 'Steadfast Courier Dhaka Hub' : 'Steadfast Inter-District Courier Hub',
      estimatedDeliveryDate: isDhaka ? 'Tomorrow by 5:00 PM' : '2 to 3 Business Days',
      steps: [
        {
          title: 'Order Confirmed',
          time: 'Just now',
          done: true,
          description: `Order verified for ${name}. Invoice generated.`
        },
        {
          title: 'Quality Check & Packing',
          time: 'Next step',
          done: false,
          description: 'Cushioned eco-box packaging with tamper seal'
        },
        {
          title: 'Handover to Courier',
          time: 'Estimated tomorrow morning',
          done: false,
          description: 'Assigned to Steadfast express rider'
        },
        {
          title: 'Delivered',
          time: isDhaka ? 'Tomorrow afternoon' : 'Within 3 days',
          done: false,
          description: paymentMethod === 'cod' ? `Pay ৳${finalTotal.toLocaleString()} on delivery` : 'Prepaid verified'
        }
      ]
    };

    setConfirmedOrder(newOrder);
    setStep('confirmed');
    onOrderPlaced(newOrder);
    onClearCart();
  };

  const handleCopyOrderId = () => {
    if (confirmedOrder) {
      navigator.clipboard?.writeText(confirmedOrder.orderId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={step === 'form' ? onClose : undefined}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all border border-stone-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
            <div>
              <span className="font-display text-sm font-bold text-amber-800 tracking-wider uppercase">
                XURMIN Checkout
              </span>
              <h3 className="font-display text-lg font-bold text-stone-900">
                {step === 'form' ? 'Delivery & Payment Details' : 'Order Successfully Placed!'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Step */}
          {step === 'form' ? (
            <form onSubmit={handlePlaceOrder} className="p-5 sm:p-6 space-y-6">
              
              {/* Order Quick Summary Pill */}
              <div className="bg-[#FAF9F6] p-3.5 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-stone-800">
                    {items.reduce((a, b) => a + b.quantity, 0)} Items in Order
                  </span>
                  <span className="text-stone-400 mx-2">·</span>
                  <span className="text-stone-500">Free delivery threshold: ৳2,500</span>
                </div>
                <div className="font-mono font-bold text-sm text-stone-900">
                  Total: ৳{finalTotal.toLocaleString()}
                </div>
              </div>

              {/* Form Error Banner */}
              {formError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
                  {formError}
                </div>
              )}

              {/* Section 1: Customer Information */}
              <div className="space-y-4">
                <h4 className="font-display text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
                  1. Customer & Delivery Address
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mobile Number (for SMS & Courier) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      District / City *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                    >
                      <option value="Dhaka City">Dhaka City (৳60 / 24-48h)</option>
                      <option value="Dhaka Suburbs (Savar/Gazipur)">Dhaka Suburbs (৳80)</option>
                      <option value="Chattogram">Chattogram (৳120 / 2-3 days)</option>
                      <option value="Sylhet">Sylhet (৳120 / 2-3 days)</option>
                      <option value="Rajshahi">Rajshahi (৳120 / 2-4 days)</option>
                      <option value="Khulna">Khulna (৳120 / 2-4 days)</option>
                      <option value="Barishal">Barishal (৳120 / 2-4 days)</option>
                      <option value="Rangpur">Rangpur (৳120 / 2-4 days)</option>
                      <option value="Mymensingh">Mymensingh (৳120 / 2-3 days)</option>
                      <option value="Other 64 Districts">Other District in Bangladesh (৳120)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Detailed Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Flat #, Road #, Area"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Call before delivery, leave with security guard"
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Section 2: Payment Method */}
              <div className="space-y-3">
                <h4 className="font-display text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
                  2. Choose Payment Method
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* COD */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-50 shadow-xs ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-stone-900"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-stone-900">Cash on Delivery (COD)</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1 rounded">
                          Recommended
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Inspect items upon arrival and pay rider in cash. Zero advance fee.
                      </p>
                    </div>
                  </label>

                  {/* bKash */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-600 bg-pink-50/50 shadow-xs ring-1 ring-pink-600'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                      className="mt-1 accent-pink-600"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-pink-700">bKash Online</span>
                        <span className="text-[10px] bg-pink-100 text-pink-800 font-semibold px-1 rounded">
                          Instant
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Pay via bKash Merchant Number <strong className="font-mono text-stone-800">01700-000000</strong>
                      </p>
                    </div>
                  </label>

                  {/* Nagad */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'nagad'
                        ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'nagad'}
                      onChange={() => setPaymentMethod('nagad')}
                      className="mt-1 accent-amber-600"
                    />
                    <div>
                      <span className="text-xs font-bold text-amber-800">Nagad Payment</span>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Direct digital wallet payment with zero additional surcharge.
                      </p>
                    </div>
                  </label>

                  {/* Card Payment */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 accent-blue-600"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900">Visa / Mastercard</span>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Secured with 128-bit SSL bank gateway encryption.
                      </p>
                    </div>
                  </label>

                </div>

                {/* bKash Transaction ID field if bKash selected */}
                {paymentMethod === 'bkash' && (
                  <div className="p-3 bg-pink-50/80 rounded-xl border border-pink-200 space-y-2">
                    <p className="text-xs text-pink-900">
                      Please send <strong>৳{finalTotal.toLocaleString()}</strong> via "Make Payment" to Merchant bKash Wallet: <code className="bg-pink-100 px-1 py-0.5 rounded font-mono font-bold">01700-000000</code> and enter TrxID below:
                    </p>
                    <input
                      type="text"
                      value={bkashTrxId}
                      onChange={(e) => setBkashTrxId(e.target.value.toUpperCase())}
                      placeholder="e.g. 9B38K1104Z"
                      className="w-full px-3 py-2 bg-white border border-pink-300 rounded-lg text-xs font-mono uppercase text-stone-900 focus:outline-none focus:ring-1 focus:ring-pink-600"
                    />
                  </div>
                )}
              </div>

              {/* Order Final Summary Box */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Items Subtotal</span>
                  <span className="font-mono">৳{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Voucher Discount</span>
                    <span className="font-mono">-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Delivery ({district})</span>
                  <span className="font-mono font-semibold">
                    {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : `৳${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-black text-stone-900">
                  <span>Grand Total to Pay</span>
                  <span className="font-mono text-base text-stone-900">
                    ৳{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-stone-900 hover:bg-stone-850 active:bg-black text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Confirm & Place Order</span>
              </button>

              <p className="text-[11px] text-stone-500 text-center">
                By placing this order, you agree to XURMIN’s 7-Day Easy Return Policy and Terms of Service.
              </p>

            </form>
          ) : (
            /* Order Confirmed Screen */
            <div className="p-6 sm:p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Order Successfully Verified
                </span>
                <h3 className="font-display text-2xl font-black text-stone-900">
                  Thank You, {confirmedOrder?.customerName}!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  We have received your order and our dispatch team has begun preparing your package. A confirmation SMS has been dispatched to <span className="font-mono font-semibold text-stone-800">{confirmedOrder?.phoneNumber}</span>.
                </p>
              </div>

              {/* Order ID Box */}
              <div className="bg-[#FAF9F6] border border-stone-200 rounded-2xl p-4 sm:p-5 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">Your Order ID</span>
                    <p className="font-mono text-lg font-black text-stone-900">{confirmedOrder?.orderId}</p>
                  </div>
                  <button
                    onClick={handleCopyOrderId}
                    className="inline-flex items-center gap-1 text-xs bg-stone-200/80 hover:bg-stone-300 text-stone-800 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="text-xs space-y-1.5 text-stone-600">
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-semibold text-stone-900 capitalize">
                      {confirmedOrder?.paymentMethod === 'cod' ? 'Cash on Delivery' : confirmedOrder?.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Payable:</span>
                    <span className="font-mono font-bold text-stone-900">৳{confirmedOrder?.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Arrival:</span>
                    <span className="font-semibold text-emerald-700">{confirmedOrder?.estimatedDeliveryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Destination:</span>
                    <span className="text-right truncate max-w-[200px]">{confirmedOrder?.address}, {confirmedOrder?.district}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
