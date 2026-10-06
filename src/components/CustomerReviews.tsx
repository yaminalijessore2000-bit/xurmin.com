import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data/categories';

export const CustomerReviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'dhaka' | 'other'>('all');

  const filteredReviews = REVIEWS.filter((rev) => {
    if (activeTab === 'dhaka') return rev.location.includes('Dhaka');
    if (activeTab === 'other') return !rev.location.includes('Dhaka');
    return true;
  });

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-amber-800 uppercase">
              Social Proof & Trust
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Customer Reviews from Across Bangladesh
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl">
              Authentic feedback from verified homemakers, chefs, and lifestyle enthusiasts who order from XURMIN.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs self-start md:self-end">
            <div className="text-center pr-4 border-r border-stone-100">
              <span className="font-display text-3xl font-black text-stone-900 font-mono">4.9</span>
              <div className="flex items-center text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-xs text-stone-600 space-y-0.5">
              <p className="font-bold text-stone-900">3,800+ Verified Orders</p>
              <p className="text-emerald-700 font-medium">98% Positive Recommendation</p>
              <p className="text-stone-400 text-[11px]">Updated today</p>
            </div>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 mb-8 text-xs font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-stone-900 text-white font-semibold'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            All Reviews ({REVIEWS.length})
          </button>
          <button
            onClick={() => setActiveTab('dhaka')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'dhaka'
                ? 'bg-stone-900 text-white font-semibold'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            Dhaka City
          </button>
          <button
            onClick={() => setActiveTab('other')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'other'
                ? 'bg-stone-900 text-white font-semibold'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            Chittagong, Sylhet & Other Districts
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-stone-300 transition-all"
            >
              <div className="space-y-3">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">
                    {rev.date}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm text-stone-700 leading-relaxed font-normal italic">
                  "{rev.comment}"
                </p>

                {/* Purchased product reference */}
                <div className="pt-2 text-xs text-stone-500">
                  <span className="text-stone-400">Purchased: </span>
                  <span className="font-medium text-stone-800">{rev.productPurchased}</span>
                </div>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar */}
                  <div className="w-9 h-9 rounded-full bg-stone-900 text-amber-200 flex items-center justify-center font-mono font-bold text-xs">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 leading-tight">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {rev.location}
                    </p>
                  </div>
                </div>

                {rev.verified && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold" title="Verified Customer">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
