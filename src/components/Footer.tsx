import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Truck, ArrowRight, Check } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenTracking: () => void;
  onOpenPolicyModal?: (policyTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTracking,
  onOpenPolicyModal
}) => {
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubscribed, setFooterSubscribed] = useState(false);

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail && footerEmail.includes('@')) {
      setFooterSubscribed(true);
      setFooterEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-2xl font-black tracking-tight text-white">
                XURMIN
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block mb-1" />
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              A modern online e-commerce platform offering quality home, kitchen, lifestyle and everyday-use products to customers in Bangladesh. Carefully selected for modern living.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-stone-200">
                  Fast & Reliable Delivery Across Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cash on Delivery & bKash Supported</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors text-xs font-bold"
              >
                FB
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors text-xs font-bold"
              >
                IG
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors text-xs font-bold"
              >
                YT
              </a>
              <a
                href="#whatsapp"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-900 flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors text-xs font-bold"
              >
                WA
              </a>
            </div>
          </div>

          {/* Column 2: Product Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('kitchen')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Kitchen Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('dining')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Dining & Storage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cleaning')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cleaning & Organization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('lifestyle')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Lifestyle Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('new-arrivals')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service & Policies (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-stone-300 font-semibold"
                >
                  <span>Track Your Order</span>
                  <span className="text-[10px] bg-stone-800 text-amber-300 px-1.5 py-0.5 rounded">Live</span>
                </button>
              </li>
              <li>
                <a href="#returns" className="hover:text-white transition-colors">
                  Return & Refund Policy (7 Days)
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-white transition-colors">
                  Shipping Policy & Rates
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About XURMIN
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Contact Us
            </h4>

            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono text-stone-200">+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@xurmin.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Level 5, Gulshan Avenue, Dhaka-1212, Bangladesh</span>
              </div>
            </div>

            {/* Quick newsletter input */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-stone-300 mb-1.5">
                Join our VIP Club
              </p>
              {!footerSubscribed ? (
                <form onSubmit={handleFooterSubmit} className="flex gap-1.5">
                  <input
                    type="email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="Your email..."
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs transition-colors shrink-0"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Subscribed successfully!
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Bangladesh Payment Options Showcase */}
        <div className="pt-8 border-t border-stone-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-stone-400 text-center md:text-left space-y-1">
            <p className="font-semibold text-stone-300">
              Accepted Payment Methods in Bangladesh:
            </p>
            <p className="text-[11px] text-stone-500">
              Cash on Delivery (No Advance) · bKash Merchant · Nagad Online · Visa & Mastercard · SSLCommerz Secured
            </p>
          </div>

          {/* Payment Badges (Clean, high-fidelity badges) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-2.5 py-1.5 bg-stone-900 border border-stone-800 rounded-md text-[11px] font-bold text-emerald-400 font-mono">
              Cash on Delivery
            </span>
            <span className="px-2.5 py-1.5 bg-pink-950/80 border border-pink-900/60 rounded-md text-[11px] font-bold text-pink-300 font-mono">
              bKash
            </span>
            <span className="px-2.5 py-1.5 bg-amber-950/80 border border-amber-900/60 rounded-md text-[11px] font-bold text-amber-300 font-mono">
              Nagad
            </span>
            <span className="px-2.5 py-1.5 bg-blue-950/80 border border-blue-900/60 rounded-md text-[11px] font-bold text-blue-300 font-mono">
              Visa / Master
            </span>
            <span className="px-2.5 py-1.5 bg-stone-900 border border-stone-800 rounded-md text-[11px] font-medium text-stone-400">
              SSL 128-bit
            </span>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 border-t border-stone-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} XURMIN Bangladesh. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Modern Living</span>
            <span>·</span>
            <span>Kitchen & Home Essentials</span>
            <span>·</span>
            <span>Dhaka, Bangladesh</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
