import React from 'react';
import { Check, Shield, TrendingDown, Truck, RotateCcw, HeartHandshake, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const PILLARS = [
    {
      number: '01',
      title: 'Carefully Selected Products',
      description: 'We do not sell thousands of random items. Every pan, canister, and lamp is physically tested for durability, food safety, and aesthetic beauty before entering our collection.',
      metric: 'Top 5% of factory samples selected'
    },
    {
      number: '02',
      title: 'Competitive Direct Pricing',
      description: 'By sourcing directly from certified manufacturers and avoiding multi-tier middleman markups, we deliver luxury-grade finishes at fair, accessible prices in Bangladeshi Taka.',
      metric: 'Up to 30% savings vs department stores'
    },
    {
      number: '03',
      title: 'Reliable Delivery Across 64 Districts',
      description: 'Partnered with Bangladesh’s leading logistics hubs (Steadfast & Pathao) with verified doorstep transit insurance. Delivered within 24–48 hours in Dhaka and 2–4 days nationwide.',
      metric: '99.4% on-time delivery record'
    },
    {
      number: '04',
      title: '100% Risk-Free Secure Checkout',
      description: 'No credit card? No problem. Inspect your package at your doorstep and pay Cash on Delivery (COD). We also support seamless instant bKash, Nagad, and 128-bit SSL card payments.',
      metric: 'Zero advance required on COD'
    },
    {
      number: '05',
      title: 'Customer-Friendly 7-Day Returns',
      description: 'If any product arrives damaged or fails to meet your expectations, simply message our WhatsApp support desk for a swift replacement or 100% refund without painful paperwork.',
      metric: 'No-hassle exchange policy'
    },
    {
      number: '06',
      title: 'Quality-Focused Shopping Experience',
      description: 'Clean interface, zero spammy ads, accurate product dimensions, transparent stock counters, and real photos that depict precisely what arrives at your front door.',
      metric: '4.9/5 average customer rating'
    }
  ];

  return (
    <section id="why-xurmin" className="py-16 sm:py-24 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-800 uppercase">
            The XURMIN Standard
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight text-balance">
            Why Discerning Households Choose XURMIN
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Built on a simple philosophy: everyday tools should be well-made, beautifully styled, fairly priced, and delivered reliably anywhere in Bangladesh.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 sm:p-7 rounded-2xl bg-stone-50/80 border border-stone-200/80 flex flex-col justify-between hover:bg-stone-50 hover:border-stone-300 transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                    {pillar.number}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-500">
                    Verified Promise
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-stone-900 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center gap-2 text-xs font-medium text-stone-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{pillar.metric}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
