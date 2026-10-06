import React, { useState, useMemo } from 'react';
import { X, Search, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return products.slice(0, 4); // show trending if empty
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 text-center">
        <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all border border-stone-200">
          
          {/* Search Header */}
          <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50/70">
            <Search className="w-5 h-5 text-stone-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cookware, canisters, vases, mop, lamps..."
              className="w-full bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-stone-400 hover:text-stone-600 text-xs px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Category Suggestions */}
          <div className="px-4 py-2.5 bg-stone-100/50 border-b border-stone-200/60 flex items-center gap-2 overflow-x-auto text-[11px] text-stone-600 no-scrollbar">
            <span className="font-semibold text-stone-400 shrink-0">Popular:</span>
            {['Cast Iron', 'Pantry Storage', 'Ceramics', 'Floor Care', 'Rechargeable Lamp'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 bg-white hover:bg-stone-200/80 rounded-md border border-stone-200 text-stone-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="p-4 max-h-96 overflow-y-auto space-y-2">
            <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
              {query ? `Results (${searchResults.length})` : 'Popular Everyday Items'}
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <p className="text-stone-500 text-xs">No matching products found for "{query}".</p>
                <p className="text-[11px] text-stone-400">Try searching for skillet, storage, lamp, or vase.</p>
              </div>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                    <ProductVisual product={product} className="h-full" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                      {product.categoryLabel}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 truncate group-hover:text-amber-800">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-xs font-black text-stone-900">
                        ৳{product.discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-stone-400 line-through font-mono">
                        ৳{product.regularPrice.toLocaleString()}
                      </span>
                      <div className="flex items-center text-amber-500 text-[10px] ml-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="font-bold text-stone-700 ml-0.5">{product.rating}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="p-2 rounded-lg bg-stone-100 hover:bg-stone-900 text-stone-700 hover:text-white transition-colors shrink-0"
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-3 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-500">
            Press <kbd className="px-1.5 py-0.5 bg-stone-200 rounded font-mono text-[10px]">ESC</kbd> to exit
          </div>

        </div>
      </div>
    </div>
  );
};
