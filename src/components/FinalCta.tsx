import React from 'react';
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, Headphones } from 'lucide-react';

interface FinalCtaProps {
  onStartShopping: () => void;
  onTrackOrder: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onStartShopping, onTrackOrder }) => {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-stone-200/80 text-center relative overflow-hidden">
      {/* Subtle background circular watermark gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-amber-50 via-stone-100 to-amber-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-4">
          <span className="text-xs font-bold tracking-widest text-amber-800 uppercase">
            Elevate Your Everyday
          </span>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight text-balance leading-[1.1]">
            Ready to Shop Smarter?
          </h2>

          <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Discover products that make everyday life easier. Enjoy effortless Cash on Delivery, prompt doorstep shipping, and dependable customer care across Bangladesh.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onStartShopping}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-stone-900 hover:bg-stone-850 active:bg-black text-white px-9 py-4 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onTrackOrder}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 px-7 py-4 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
          >
            <span>Track Existing Order</span>
          </button>
        </div>

        {/* 3 Value Pillars */}
        <div className="pt-8 border-t border-stone-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-semibold text-stone-600">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Cash on Delivery Available
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-stone-700" />
            Fast Delivery in 64 Districts
          </span>
          <span className="flex items-center gap-1.5">
            <Headphones className="w-4 h-4 text-amber-700" />
            7-Day Easy Returns
          </span>
        </div>

      </div>
    </section>
  );
};
