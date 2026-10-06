import React, { useState, useEffect } from 'react';
import { Sparkles, Timer, ArrowRight, Copy, Check, Tag } from 'lucide-react';

interface SpecialOfferProps {
  onShopDeals: () => void;
  onApplyCoupon?: (code: string) => void;
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({ onShopDeals, onApplyCoupon }) => {
  // Live Countdown state (e.g. 18 hours, 45 minutes, 30 seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('SAVE15');
    setCopied(true);
    if (onApplyCoupon) {
      onApplyCoupon('SAVE15');
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="deals" className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Surface */}
        <div className="relative rounded-3xl bg-stone-900 text-white overflow-hidden p-8 sm:p-12 lg:p-16 shadow-xl border border-stone-800">
          
          {/* Subtle warm ambient backdrop glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-700/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest bg-stone-800/90 border border-stone-700 px-3 py-1 rounded-md">
                <Tag className="w-3.5 h-3.5" />
                <span>Limited-Time Festive Deals</span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Upgrade Your Home & Kitchen for Less.
              </h2>

              {/* Subheadline & Value Prop */}
              <p className="text-stone-300 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
                Enjoy up to 29% instant discount on cast iron cookware, airtight storage, and Scandinavian home accents. Plus get an extra 15% off with coupon code.
              </p>

              {/* Coupon Box */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5">
                  <span className="text-xs text-stone-400 mr-2">Voucher Code:</span>
                  <span className="font-mono text-sm font-bold text-amber-300 tracking-wider">SAVE15</span>
                  <button
                    onClick={handleCopyCode}
                    className="ml-3 p-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy coupon code"
                    aria-label="Copy voucher code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <span className="text-xs text-emerald-400 font-medium">
                    Copied & applied to cart!
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onShopDeals}
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <span>Shop Promotional Deals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-stone-400 text-center sm:text-left">
                  Valid across all districts in Bangladesh
                </span>
              </div>

            </div>

            {/* Right Column: Live Countdown Box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-md bg-stone-850/80 backdrop-blur-md rounded-2xl border border-stone-700/80 p-6 sm:p-8 text-center space-y-6">
                
                <div className="flex items-center justify-center gap-2 text-stone-400 text-xs font-semibold uppercase tracking-wider">
                  <Timer className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Offer Expires In</span>
                </div>

                {/* Countdown Digits */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 sm:p-4">
                    <span className="font-display font-black text-3xl sm:text-4xl text-white font-mono tabular-nums block">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider font-medium mt-1 block">
                      Hours
                    </span>
                  </div>

                  <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 sm:p-4">
                    <span className="font-display font-black text-3xl sm:text-4xl text-white font-mono tabular-nums block">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider font-medium mt-1 block">
                      Minutes
                    </span>
                  </div>

                  <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 sm:p-4">
                    <span className="font-display font-black text-3xl sm:text-4xl text-amber-400 font-mono tabular-nums block">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider font-medium mt-1 block">
                      Seconds
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-800 text-xs text-stone-400 space-y-1">
                  <p>✓ Minimum order value: No minimum required</p>
                  <p>✓ Applicable on Cash on Delivery & bKash orders</p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
