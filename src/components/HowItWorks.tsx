import React from 'react';
import { Search, ShoppingCart, Truck, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const STEPS = [
    {
      step: '01',
      title: 'Choose Your Product',
      description: 'Explore our curated catalog of kitchen, home, and lifestyle essentials. Read clear dimensions, material details, and authentic customer reviews.',
      icon: Search,
      perk: 'Accurate photos & dimensions'
    },
    {
      step: '02',
      title: 'Place Your Order',
      description: 'Checkout in less than 60 seconds. Choose Cash on Delivery (zero upfront cost) or instant secure payment via bKash, Nagad, or cards.',
      icon: ShoppingCart,
      perk: 'No pre-payment required on COD'
    },
    {
      step: '03',
      title: 'Receive at Your Doorstep',
      description: 'Your package is inspected, securely cushioned, and dispatched via express courier straight to your home anywhere in Bangladesh.',
      icon: Truck,
      perk: 'Doorstep inspection before paying'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold tracking-widest text-amber-800 uppercase">
            Simple 3-Step Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            How Shopping Works on XURMIN
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            From seamless product discovery to rapid doorstep fulfillment across Bangladesh.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Subtle connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 border-t border-dashed border-stone-300 -translate-y-6 pointer-events-none -z-0" />

          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative z-10 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-display font-extrabold text-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xl font-bold text-stone-300">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-stone-900">
                    {item.step}. {item.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-stone-100 flex items-center gap-2 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{item.perk}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
