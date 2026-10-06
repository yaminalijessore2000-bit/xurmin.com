import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-500" />
              <h2 className="font-display text-lg font-bold text-stone-900">
                Saved Items ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <Heart className="w-8 h-8 stroke-1" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-stone-900">Your wishlist is empty</h3>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Tap the heart icon on any product card to save items you want to purchase later.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-3.5 rounded-xl border border-stone-200/90 shadow-2xs flex gap-3.5 items-center"
                >
                  <div className="w-18 h-18 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                    <ProductVisual product={product} className="h-full" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1 leading-snug">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-900">
                        ৳{product.discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-stone-400 line-through font-mono">
                        ৳{product.regularPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product);
                        }}
                        className="w-full py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 bg-white border-t border-stone-200">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => onAddToCart(p));
                  onClose();
                }}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Move All ({wishlistProducts.length}) to Cart</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
