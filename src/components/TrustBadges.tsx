import React from 'react';
import { ShieldCheck, Truck, Headphones, CheckCircle, CreditCard } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const BADGES = [
    {
      icon: CheckCircle,
      title: 'Curated Quality Products',
      subtitle: 'Inspected for durability',
      description: 'Handpicked household and kitchen essentials crafted to endure daily use.',
      highlight: '30-Day Guarantee'
    },
    {
      icon: CreditCard,
      title: '100% Secure Payment',
      subtitle: 'Cash on Delivery & bKash',
      description: 'Pay safely at your doorstep or via verified bKash, Nagad, and secure cards.',
      highlight: 'Zero Risk'
    },
    {
      icon: Truck,
      title: 'Fast Delivery Across BD',
      subtitle: 'Covering 64 Districts',
      description: 'Express 24-48 hour delivery in Dhaka City; 2 to 4 days nationwide shipping.',
      highlight: 'Reliable Couriers'
    },
    {
      icon: Headphones,
      title: 'Dedicated Customer Support',
      subtitle: '7 Days a Week Assistance',
      description: 'Direct phone and WhatsApp support for orders, inquiries, and easy returns.',
      highlight: 'Quick Response'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-4 rounded-xl transition-all hover:bg-stone-50/80"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 text-stone-900 border border-stone-200/70">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-bold text-stone-900 leading-snug">
                      {badge.title}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-amber-800">
                    {badge.subtitle}
                  </p>
                  <p className="text-xs text-stone-500 leading-relaxed pt-0.5">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
