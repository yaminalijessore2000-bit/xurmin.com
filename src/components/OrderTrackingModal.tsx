import React, { useState } from 'react';
import { X, Search, Package, Truck, CheckCircle2, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { TRACKING_DATABASE } from '../data/categories';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrderId
}) => {
  const [searchQuery, setSearchQuery] = useState(recentOrderId || 'XM-84920');
  const [trackedOrder, setTrackedOrder] = useState<any>(
    TRACKING_DATABASE[recentOrderId || 'XM-84920'] || TRACKING_DATABASE['XM-84920']
  );
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    if (!query) return;

    if (TRACKING_DATABASE[query]) {
      setTrackedOrder(TRACKING_DATABASE[query]);
      setErrorMsg('');
    } else {
      // Simulate live order fallback
      setTrackedOrder({
        orderId: query,
        customerName: 'Customer',
        phoneNumber: '017XXXXXXXX',
        district: 'Dhaka City',
        address: 'Delivery in progress to your designated address',
        itemsSummary: 'XURMIN Curated Order Items',
        subtotal: 2850,
        shippingFee: 0,
        discountAmount: 285,
        total: 2565,
        paymentMethod: 'Cash on Delivery (COD)',
        status: 'In Transit',
        courier: 'Steadfast Courier (Tracking: SF-BD-10928)',
        trackingCode: 'SF-BD-10928',
        estimatedDeliveryDate: 'Within 24-48 Hours',
        steps: [
          { title: 'Order Verified', time: 'Yesterday', done: true, description: 'Order confirmed and registered in warehouse' },
          { title: 'Quality Check & Packed', time: 'Today, 8:00 AM', done: true, description: 'Securely packaged with tamper seal' },
          { title: 'In Transit with Courier', time: 'Today, 11:30 AM', done: true, description: 'Dispatched to regional delivery hub' },
          { title: 'Out for Delivery', time: 'Pending', done: false, description: 'Courier rider will call you prior to delivery' },
          { title: 'Delivered', time: 'Pending', done: false, description: 'Package inspection and handover' }
        ]
      });
      setErrorMsg('');
    }
  };

  const handleLoadSample = (sampleId: string) => {
    setSearchQuery(sampleId);
    setTrackedOrder(TRACKING_DATABASE[sampleId]);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-2xl transition-all border border-stone-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-stone-900 leading-tight">
                  Track Your XURMIN Order
                </h3>
                <p className="text-[11px] text-stone-500">
                  Real-time status across all 64 districts in Bangladesh
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Search Input Box */}
            <form onSubmit={handleSearch} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                    placeholder="Enter Order ID (e.g. XM-84920) or Phone Number..."
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono uppercase text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold cursor-pointer shrink-0 transition-colors"
                >
                  Track Now
                </button>
              </div>

              {/* Sample Quick Chips */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 pt-1">
                <span>Try sample orders:</span>
                <button
                  type="button"
                  onClick={() => handleLoadSample('XM-84920')}
                  className="bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded font-mono text-stone-800 transition-colors cursor-pointer"
                >
                  XM-84920 (Dhaka COD)
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('XM-91042')}
                  className="bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded font-mono text-stone-800 transition-colors cursor-pointer"
                >
                  XM-91042 (Chattogram bKash)
                </button>
              </div>
            </form>

            {/* Order Details Banner */}
            {trackedOrder && (
              <div className="space-y-6">
                
                {/* Meta summary card */}
                <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Order Reference</span>
                      <h4 className="font-mono text-lg font-black text-stone-900">{trackedOrder.orderId}</h4>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Estimated Delivery</span>
                      <p className="text-xs font-bold text-emerald-700">{trackedOrder.estimatedDeliveryDate}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
                    <div>
                      <span className="text-stone-400">Recipient:</span>{' '}
                      <strong className="text-stone-900">{trackedOrder.customerName}</strong> ({trackedOrder.phoneNumber})
                    </div>
                    <div>
                      <span className="text-stone-400">Courier Partner:</span>{' '}
                      <strong className="text-stone-900">{trackedOrder.courier}</strong>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-stone-400">Destination:</span>{' '}
                      <span className="text-stone-800 font-medium">{trackedOrder.address}</span>
                    </div>
                    <div className="sm:col-span-2 pt-1 border-t border-stone-200/60 flex items-center justify-between text-xs">
                      <span>{trackedOrder.itemsSummary}</span>
                      <span className="font-mono font-bold text-stone-900">
                        {trackedOrder.paymentMethod}: ৳{trackedOrder.total?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Steps Timeline */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Shipment Progress Timeline
                  </h4>

                  <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                    {trackedOrder.steps?.map((step: any, idx: number) => (
                      <div key={idx} className="relative">
                        {/* Status Dot */}
                        <div
                          className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                            step.done
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-200 text-stone-500'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <h5 className={`text-xs font-bold ${step.done ? 'text-stone-900' : 'text-stone-400'}`}>
                              {step.title}
                            </h5>
                            <span className="text-[11px] font-mono text-stone-400">
                              {step.time}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help prompt */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs text-stone-600">
                  <span>Questions about this delivery?</span>
                  <a
                    href="tel:+880170000000"
                    className="font-bold text-stone-900 hover:text-amber-800 flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" /> Call Support
                  </a>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
