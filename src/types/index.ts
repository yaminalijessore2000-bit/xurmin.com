export type ProductCategory = 
  | 'all'
  | 'kitchen'
  | 'home'
  | 'dining'
  | 'cleaning'
  | 'lifestyle'
  | 'new-arrivals';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  regularPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
  features: string[];
  stockStatus: 'In Stock' | 'Only 3 Left' | 'In High Demand';
  tags: string[];
  visualType: 'skillet' | 'frenchpress' | 'knifeblock' | 'storagejars' | 'vase' | 'mop' | 'utensils' | 'lamp' | 'towels' | 'organizer';
  colorTone: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  sku: string;
  dimensions?: string;
  material?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  title: string;
  itemCount: number;
  description: string;
  highlightText: string;
  accentColor: string;
  visualType: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productPurchased: string;
  verified: boolean;
  initials: string;
  ratingBreakdown: {
    quality: number;
    delivery: number;
  };
}

export interface TrackingStep {
  title: string;
  time: string;
  done: boolean;
  description: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  district: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  status: 'Confirmed' | 'Packing' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
  courier: string;
  estimatedDeliveryDate: string;
  steps: TrackingStep[];
}
