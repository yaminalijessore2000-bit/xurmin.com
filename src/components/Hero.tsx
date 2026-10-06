import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

interface HeroProps {
  onShopNow: () => void;
  onExploreCategories: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onExploreCategories }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-stone-200/60 bg-gradient-to-b from-[#FAF9F6] via-[#F8F6F0] to-[#FAF9F6]">
      {/* Background radial atmosphere */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-amber-100/40 via-stone-200/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Conversion Messaging */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Quiet 1-line text kicker (Zero-pill discipline) */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-900/80">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
              <span>Premium Home & Everyday Lifestyle Store</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-500">Bangladesh</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.1] text-balance">
              Smart Shopping for a Better Everyday Life.
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover quality products for your home, kitchen and everyday lifestyle — carefully selected for modern living. Enjoy fast delivery and hassle-free Cash on Delivery across all 64 districts in Bangladesh.
            </p>

            {/* Clean Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-stone-900 hover:bg-stone-850 active:bg-black text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={onExploreCategories}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300/90 px-6 py-3.5 rounded-xl font-medium text-sm transition-all hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                <span>Explore Categories</span>
              </button>
            </div>

            {/* Core Trust Indicators with Typographic Separators */}
            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-3 gap-2 text-left">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 leading-tight">Secure Shopping</h4>
                  <p className="text-[11px] text-stone-500">100% Genuine & COD</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 leading-tight">Quality Products</h4>
                  <p className="text-[11px] text-stone-500">Pre-inspected Grade</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-stone-700 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 leading-tight">Fast Delivery</h4>
                  <p className="text-[11px] text-stone-500">24-48h in Dhaka</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Product Showcase */}
          <div className="lg:col-span-6 w-full">
            <HeroVisual onExploreClick={onShopNow} />
          </div>

        </div>
      </div>
    </section>
  );
};
