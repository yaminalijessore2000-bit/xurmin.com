import React from 'react';
import { ArrowRight, Utensils, Home, Package, Sparkles, Lamp, RefreshCw } from 'lucide-react';
import { CategoryInfo, ProductCategory } from '../types';

interface CategoriesProps {
  categories: CategoryInfo[];
  onSelectCategory: (categoryId: ProductCategory) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ categories, onSelectCategory }) => {
  // Category mini icons
  const getCategoryIcon = (id: ProductCategory) => {
    switch (id) {
      case 'kitchen':
        return <Utensils className="w-5 h-5 text-amber-800" />;
      case 'home':
        return <Home className="w-5 h-5 text-stone-700" />;
      case 'dining':
        return <Package className="w-5 h-5 text-emerald-800" />;
      case 'cleaning':
        return <RefreshCw className="w-5 h-5 text-sky-800" />;
      case 'lifestyle':
        return <Lamp className="w-5 h-5 text-amber-700" />;
      case 'new-arrivals':
        return <Sparkles className="w-5 h-5 text-rose-800" />;
      default:
        return <Package className="w-5 h-5 text-stone-700" />;
    }
  };

  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-amber-800 uppercase">
              Curated Collections
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Featured Categories
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl">
              Explore thoughtfully selected everyday essentials designed to bring order, beauty, and utility into your home.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            <span>6 Primary Collections</span>
            <span className="mx-2">·</span>
            <span>Over 100+ Catalog Items</span>
          </div>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            return (
              <div
                key={cat.id}
                className="group relative bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle corner accent tint */}
                <div 
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 pointer-events-none"
                  style={{ backgroundColor: cat.accentColor }}
                />

                <div className="space-y-4">
                  {/* Category Top Row: Icon + Count */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-stone-100 flex items-center justify-center border border-stone-200/70 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-300">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <span className="text-xs font-mono text-stone-500 font-medium">
                      {cat.itemCount} Products
                    </span>
                  </div>

                  {/* Title & Highlight */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-stone-900 group-hover:text-amber-850 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs font-semibold text-stone-500 mt-0.5">
                      {cat.highlightText}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Explore Action Button */}
                <div className="pt-6 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-500 group-hover:text-stone-900 transition-colors">
                    View Selection
                  </span>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      const el = document.getElementById('products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 group-hover:text-amber-700 transition-colors cursor-pointer"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
