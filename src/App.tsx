/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, CartItem, ProductCategory, OrderDetails } from './types';
import { PRODUCTS } from './data/products';
import { CATEGORIES } from './data/categories';

// Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { Categories } from './components/Categories';
import { ProductGrid } from './components/ProductGrid';
import { SpecialOffer } from './components/SpecialOffer';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerReviews } from './components/CustomerReviews';
import { HowItWorks } from './components/HowItWorks';
import { Newsletter } from './components/Newsletter';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

// Interactive Drawers & Modals
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickViewModal } from './components/QuickViewModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { NotificationToast, ToastMessage } from './components/NotificationToast';

export default function App() {
  // Cart State (Initialized with 1 flagship item to showcase cart calculations immediately)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1
    }
  ]);

  // Wishlist State (Array of product IDs)
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[1].id]);

  // Coupon State
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Category Filtering
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [recentOrderId, setRecentOrderId] = useState<string | undefined>(undefined);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], title: string, subtitle?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev.slice(-2), { id, type, title, subtitle }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    addToast(
      'cart',
      `Added ${quantity}x ${product.name.split(' ')[0]} to cart`,
      `৳${(product.discountedPrice * quantity).toLocaleString()}`
    );
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast('wishlist', 'Removed from Wishlist', product.name);
        return prev.filter((id) => id !== product.id);
      } else {
        addToast('wishlist', 'Saved to Wishlist', product.name);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  // Coupon Handlers
  const handleApplyCoupon = (code: string): boolean => {
    const validCodes = ['SAVE15', 'WELCOME200', 'XURMIN10'];
    if (validCodes.includes(code.toUpperCase())) {
      setAppliedCoupon(code.toUpperCase());
      addToast('coupon', `Voucher Applied: ${code.toUpperCase()}`, 'Discount reflected at checkout');
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Navigation scroll helper
  const handleScrollToProducts = (category?: ProductCategory) => {
    if (category) {
      setSelectedCategory(category);
    }
    const el = document.getElementById('products');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToCategories = () => {
    const el = document.getElementById('categories');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Quick Buy Now
  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  // Order Placement
  const handleOrderPlaced = (order: OrderDetails) => {
    setRecentOrderId(order.orderId);
    addToast('info', `Order ${order.orderId} Confirmed!`, 'SMS receipt dispatched to courier desk');
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, cur) => acc + cur.product.discountedPrice * cur.quantity,
    0
  );

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      
      {/* 3-Zone Navigation Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onSelectCategory={(cat) => handleScrollToProducts(cat as ProductCategory)}
      />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <Hero
          onShopNow={() => handleScrollToProducts('all')}
          onExploreCategories={handleScrollToCategories}
        />

        {/* 2. TRUST SECTION */}
        <TrustBadges />

        {/* 3. FEATURED CATEGORIES */}
        <Categories
          categories={CATEGORIES}
          onSelectCategory={(catId) => handleScrollToProducts(catId)}
        />

        {/* 4. BEST SELLING PRODUCTS (WooCommerce Grid) */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          wishlistIds={wishlistIds}
          onSelectCategory={setSelectedCategory}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 5. SPECIAL OFFER / PROMOTION */}
        <SpecialOffer
          onShopDeals={() => handleScrollToProducts('all')}
          onApplyCoupon={handleApplyCoupon}
        />

        {/* 6. WHY CHOOSE XURMIN */}
        <WhyChooseUs />

        {/* 7. CUSTOMER REVIEWS */}
        <CustomerReviews />

        {/* 8. HOW IT WORKS */}
        <HowItWorks />

        {/* 9. NEWSLETTER / EXCLUSIVE OFFER */}
        <Newsletter onApplyVoucher={handleApplyCoupon} />

        {/* 10. FINAL CONVERSION CTA */}
        <FinalCta
          onStartShopping={() => handleScrollToProducts('all')}
          onTrackOrder={() => setIsTrackingOpen(true)}
        />
      </main>

      {/* 11. COMPREHENSIVE FOOTER */}
      <Footer
        onSelectCategory={(cat) => handleScrollToProducts(cat)}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onBuyNow={handleBuyNow}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        recentOrderId={recentOrderId}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* Notification Toast */}
      <NotificationToast
        toasts={toasts}
        onDismiss={removeToast}
        onOpenCart={() => setIsCartOpen(true)}
      />

    </div>
  );
}
