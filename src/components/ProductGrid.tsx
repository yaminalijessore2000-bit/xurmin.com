import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  wishlistIds: string[];
  onSelectCategory: (category: ProductCategory) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  wishlistIds,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  onQuickView
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  // Filter Categories Tabs
  const CATEGORY_TABS: Array<{ id: ProductCategory; label: string }> = [
    { id: 'all', label: 'All Products' },
    { id: 'kitchen', label: 'Kitchen Essentials' },
    { id: 'home', label: 'Home Accessories' },
    { id: 'dining', label: 'Dining & Storage' },
    { id: 'cleaning', label: 'Cleaning & Organization' },
    { id: 'lifestyle', label: 'Lifestyle Products' },
    { id: 'new-arrivals', label: 'New Arrivals' }
  ];

  // Filtered & Sorted items
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory === 'new-arrivals') {
      list = list.filter(p => p.isNewArrival);
    } else if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.discountedPrice - b.discountedPrice);
      case 'price-desc':
        return list.sort((a, b) => b.discountedPrice - a.discountedPrice);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'popular':
      default:
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [products, selectedCategory, sortBy]);

  return (
    <section id="products" className="py-16 sm:py-24 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-amber-800 uppercase">
                Customer Favorites
              </span>
              <span className="text-xs bg-amber-50 text-amber-850 px-2 py-0.5 rounded font-mono font-medium">
                Verified Reviews
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Best Selling Everyday Essentials
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl">
              High-utility, durable products tested and praised by modern households across Bangladesh.
            </p>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-2 text-xs font-medium text-stone-600 self-start md:self-end">
            <SlidersHorizontal className="w-4 h-4 text-stone-400" />
            <span className="hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Tab Bar (Segmented Controls - allowed by Frontend Constitution) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100/90 text-stone-700 hover:bg-stone-200 hover:text-stone-950'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* If category has zero items fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
            <p className="text-stone-600 font-medium">No products match this filter.</p>
            <button
              onClick={() => onSelectCategory('all')}
              className="mt-3 text-xs font-bold text-amber-700 hover:underline cursor-pointer"
            >
              View all products
            </button>
          </div>
        )}

        {/* Fast Delivery Assurance Bar */}
        <div className="mt-12 p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-stone-900">Delivery Update:</span>
            <span>All orders placed today are dispatched within 24 hours.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-stone-500">Dhaka: 24-48 Hours</span>
            <span>·</span>
            <span className="font-mono text-stone-500">Other Districts: 2-4 Days</span>
          </div>
        </div>

      </div>
    </section>
  );
};
