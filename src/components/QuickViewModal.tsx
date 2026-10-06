import React, { useState } from 'react';
import { X, Star, Heart, Check, ShoppingBag, Truck, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onBuyNow
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-2xl transition-all border border-stone-200">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Visual Column */}
            <div className="md:col-span-6 bg-[#F5F3EF] p-6 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-stone-200">
              <div className="flex items-center justify-between z-10">
                <span className="bg-stone-900 text-white text-xs font-mono font-bold px-2 py-0.5 rounded">
                  -{product.discountPercentage}% OFF
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                  {product.stockStatus}
                </span>
              </div>

              <div className="py-6">
                <ProductVisual product={product} isQuickView={true} />
              </div>

              <div className="text-xs text-stone-500 flex items-center justify-between pt-2 border-t border-stone-200/60">
                <span>SKU: <strong className="font-mono text-stone-800">{product.sku}</strong></span>
                <span>Category: <strong className="text-stone-800">{product.categoryLabel}</strong></span>
              </div>
            </div>

            {/* Right Product Details Column */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                {/* Brand & Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    {product.categoryLabel}
                  </span>
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-1.5 rounded-full transition-colors ${
                      isWishlisted ? 'text-rose-600 bg-rose-50' : 'text-stone-400 hover:text-stone-900'
                    }`}
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Product Name */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-950 leading-snug">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-stone-900 font-mono">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount} customer ratings)</span>
                </div>

                {/* Pricing in BDT */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-baseline gap-3">
                  <span className="font-display text-2xl font-black text-stone-950 font-mono">
                    ৳{product.discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-stone-400 line-through font-mono">
                    ৳{product.regularPrice.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded ml-auto">
                    Save ৳{(product.regularPrice - product.discountedPrice).toLocaleString()}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Features */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Key Highlights
                  </h4>
                  <ul className="space-y-1 text-xs text-stone-600">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specs */}
                {(product.dimensions || product.material) && (
                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-stone-50 rounded-lg text-[11px] text-stone-600">
                    {product.material && (
                      <div>
                        <span className="font-semibold text-stone-700">Material:</span> {product.material}
                      </div>
                    )}
                    {product.dimensions && (
                      <div>
                        <span className="font-semibold text-stone-700">Specs:</span> {product.dimensions}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Actions */}
              <div className="space-y-3 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-stone-600 hover:text-stone-900 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-mono font-bold text-stone-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-stone-600 hover:text-stone-900 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">
                    Subtotal: ৳{(product.discountedPrice * quantity).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAdd}
                    className={`py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      added
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-stone-700" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuy}
                    className="py-3 bg-stone-900 hover:bg-stone-850 active:bg-black text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>

                {/* Assurance footer */}
                <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-stone-600" /> Fast Delivery across Bangladesh
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Cash on Delivery
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
