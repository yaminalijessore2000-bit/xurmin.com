import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, PackageSearch, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenTracking: () => void;
  onSelectCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenTracking,
  onSelectCategory
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Slim Promotional Announcement Bar */}
      {showBanner && (
        <div className="bg-stone-900 text-stone-200 px-4 py-2 text-xs font-medium tracking-wide flex items-center justify-between border-b border-stone-800">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center w-full">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="truncate">
              Free Delivery across Bangladesh on orders over ৳2,500 <span className="opacity-60 hidden sm:inline">·</span> <span className="text-amber-300">Cash on Delivery & bKash</span>
            </span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white p-1 shrink-0 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar Contract: 3-Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <a
              href="#"
              className="font-display text-2xl sm:text-3xl font-extrabold tracking-tighter text-stone-900 hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <span>XURMIN</span>
              <span className="w-2 h-2 rounded-full bg-amber-600 inline-block mb-1" />
            </a>
          </div>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a
              href="#products"
              onClick={() => onSelectCategory('all')}
              className="hover:text-stone-900 transition-colors whitespace-nowrap"
            >
              Best Sellers
            </a>
            <a
              href="#categories"
              className="hover:text-stone-900 transition-colors whitespace-nowrap"
            >
              Categories
            </a>
            <a
              href="#deals"
              className="hover:text-amber-800 text-stone-700 font-semibold transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <span>Special Deals</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">-25%</span>
            </a>
            <a
              href="#why-xurmin"
              className="hover:text-stone-900 transition-colors whitespace-nowrap"
            >
              Why XURMIN
            </a>
            <a
              href="#reviews"
              className="hover:text-stone-900 transition-colors whitespace-nowrap"
            >
              Reviews
            </a>
            <button
              onClick={onOpenTracking}
              className="hover:text-stone-900 transition-colors whitespace-nowrap flex items-center gap-1 text-stone-600"
            >
              <PackageSearch className="w-4 h-4 text-stone-500" />
              <span>Track Order</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 rounded-full transition-colors relative"
              aria-label="Search products"
              title="Search store"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              className="p-2 sm:p-2.5 text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 rounded-full transition-colors relative"
              aria-label="View Wishlist"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 bg-stone-900 hover:bg-stone-800 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all shadow-xs active:scale-98 whitespace-nowrap"
              aria-label="View shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-amber-500 text-stone-950 text-[10px] font-black rounded-full flex items-center justify-center font-mono">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono font-semibold">
                ৳{cartTotal.toLocaleString()}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 py-4 px-2 space-y-3 bg-[#FAF9F6]">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium text-stone-700">
              <a
                href="#products"
                onClick={() => {
                  onSelectCategory('all');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                Best Sellers
              </a>
              <a
                href="#categories"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                Categories
              </a>
              <a
                href="#deals"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors font-semibold"
              >
                Special Deals (-25%)
              </a>
              <button
                onClick={() => {
                  onOpenTracking();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors text-left flex items-center gap-1.5"
              >
                <PackageSearch className="w-4 h-4 text-stone-600" />
                <span>Track Order</span>
              </button>
            </div>
            
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Cash on Delivery in Bangladesh
              </span>
              <span>Need help? 01700-000000</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
