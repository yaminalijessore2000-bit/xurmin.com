import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onQuickView
}) => {
  const [addedRecently, setAddedRecently] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const handleQuick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl border border-stone-200/90 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-stone-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Media Container */}
      <div className="relative w-full overflow-hidden bg-[#F5F3EF]">
        <ProductVisual product={product} />

        {/* Discount Badge & Status Tag */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="bg-stone-900 text-white text-[11px] font-bold font-mono px-2 py-0.5 rounded shadow-xs tracking-tight">
            -{product.discountPercentage}%
          </span>
          {product.badge && (
            <span className="bg-amber-100 text-amber-900 border border-amber-200/80 text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-2xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Action Controls: Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={handleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/85 text-stone-700 hover:text-stone-950 hover:bg-white border border-stone-200/60'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={handleQuick}
            aria-label="Quick view product details"
            title="Quick View"
            className="p-2 rounded-full bg-white/85 hover:bg-white text-stone-700 hover:text-stone-950 backdrop-blur-md transition-all border border-stone-200/60 shadow-xs opacity-0 group-hover:opacity-100 hidden sm:block"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Stock urgency indicator */}
        <div className="absolute bottom-2 left-3 z-10">
          <span className="text-[10px] font-medium text-stone-600 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-sm">
            {product.stockStatus}
          </span>
        </div>
      </div>

      {/* Card Content & Pricing */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-stone-400">SKU: {product.sku}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-display text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-stone-900 ml-1 font-mono">{product.rating}</span>
            </div>
            <span className="text-stone-400">({product.reviewCount})</span>
            <span className="text-stone-300">·</span>
            <span className="text-emerald-700 font-medium text-[11px]">Free delivery ৳2.5k+</span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-lg sm:text-xl text-stone-950 font-mono tracking-tight">
                ৳{product.discountedPrice.toLocaleString()}
              </span>
              <span className="text-xs text-stone-400 line-through font-mono">
                ৳{product.regularPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-medium">VAT & Tax Included</p>
          </div>

          <button
            onClick={handleAdd}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all shadow-xs cursor-pointer active:scale-95 whitespace-nowrap ${
              addedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {addedRecently ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
