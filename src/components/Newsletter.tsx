import React, { useState } from 'react';
import { Mail, Check, Sparkles, ArrowRight, Gift } from 'lucide-react';

interface NewsletterProps {
  onApplyVoucher?: (code: string) => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onApplyVoucher }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubscribed(true);
    if (onApplyVoucher) {
      onApplyVoucher('WELCOME200');
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white p-8 sm:p-12 lg:p-16 border border-stone-800 shadow-xl overflow-hidden text-center max-w-4xl mx-auto">
          
          {/* Subtle warm accent flare */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-stone-800 border border-stone-700 text-amber-300 text-xs font-semibold px-3 py-1 rounded-md">
              <Gift className="w-3.5 h-3.5" />
              <span>৳200 Welcome Gift on First Order</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Get Exclusive Offers & New Product Updates
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Join 12,000+ subscribers across Bangladesh. Receive secret seasonal discounts, restock alerts, and modern home organizing tips straight to your inbox.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubmit} className="pt-2 max-w-md mx-auto space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full pl-10 pr-4 py-3 bg-stone-800/90 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md active:scale-98 whitespace-nowrap cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {error && (
                  <p className="text-xs text-rose-400 font-medium text-left">
                    {error}
                  </p>
                )}

                <p className="text-[11px] text-stone-400 pt-1">
                  We respect your privacy. No spam, ever. Unsubscribe at any time with 1 click.
                </p>
              </form>
            ) : (
              <div className="bg-stone-800/90 border border-emerald-500/50 rounded-2xl p-6 text-center space-y-3 animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  Welcome to the XURMIN Community!
                </h3>
                <p className="text-xs text-stone-300">
                  Your coupon code for <span className="text-amber-300 font-bold">৳200 OFF</span> has been unlocked:
                </p>
                <div className="inline-block bg-stone-900 border border-stone-700 px-4 py-2 rounded-lg font-mono text-sm font-bold text-amber-300 tracking-wider">
                  WELCOME200
                </div>
                <p className="text-[11px] text-emerald-400">
                  ✓ Automatically applied to your shopping cart subtotal!
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
