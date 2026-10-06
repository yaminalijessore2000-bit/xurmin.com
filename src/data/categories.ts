import { CategoryInfo, Review } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'kitchen',
    title: 'Kitchen Essentials',
    itemCount: 24,
    description: 'Chef-grade cast iron, stainless tools, and ergonomic cookware engineered for daily culinary adventures.',
    highlightText: 'Cast Iron & Utensils',
    accentColor: '#3A3935',
    visualType: 'skillet'
  },
  {
    id: 'home',
    title: 'Home Accessories',
    itemCount: 18,
    description: 'Sculptural ceramics, ambient lighting, and artisanal decorative accents that elevate your living spaces.',
    highlightText: 'Vases & Decor',
    accentColor: '#8C6C58',
    visualType: 'vase'
  },
  {
    id: 'dining',
    title: 'Dining & Storage',
    itemCount: 20,
    description: 'Airtight pantry containers, borosilicate carafes, and bamboo organizers for an orderly kitchen.',
    highlightText: 'Pantry & Glassware',
    accentColor: '#455E51',
    visualType: 'storagejars'
  },
  {
    id: 'cleaning',
    title: 'Cleaning & Organization',
    itemCount: 16,
    description: 'High-performance microfibers, rolling organizers, and smart storage systems designed to declutter.',
    highlightText: 'Mops & Storage',
    accentColor: '#2B576C',
    visualType: 'mop'
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle Products',
    itemCount: 22,
    description: 'Rechargeable ambient lighting, pure combed cotton bath linens, and wellness products for modern comfort.',
    highlightText: 'Lighting & Linens',
    accentColor: '#80684C',
    visualType: 'lamp'
  },
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    itemCount: 14,
    description: 'Fresh seasonal drops curated specifically for urban homes across Dhaka, Chittagong, and Sylhet.',
    highlightText: 'Latest Drops',
    accentColor: '#6B4335',
    visualType: 'vase'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    name: 'Tanvir Ahmed',
    location: 'Gulshan-2, Dhaka',
    rating: 5,
    date: '3 days ago',
    comment: 'The cast iron skillet exceeded my expectations. Heavy, retains heat wonderfully, and the wooden handle remains cool. Delivered within 24 hours via Cash on Delivery in Gulshan. Truly premium experience.',
    productPurchased: 'XURMIN Nordica Matte Cast Iron Skillet (26cm)',
    verified: true,
    initials: 'TA',
    ratingBreakdown: { quality: 5, delivery: 5 }
  },
  {
    id: 'rev-02',
    name: 'Nusrat Jahan',
    location: 'Dhanmondi 27, Dhaka',
    rating: 5,
    date: '1 week ago',
    comment: 'The 6-piece airtight pantry canisters solved our monsoon dampness problem. Spices and biscuits stay crisp. Very clean aesthetic and the one-touch seal is super satisfying.',
    productPurchased: 'Modular Airtight Spice & Pantry Canister Set',
    verified: true,
    initials: 'NJ',
    ratingBreakdown: { quality: 5, delivery: 5 }
  },
  {
    id: 'rev-03',
    name: 'Kazi Farhan',
    location: 'GEC Circle, Chittagong',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Ordered to Chittagong and received within 3 days safely packaged. The French press carafe glass is thick and the bamboo top looks gorgeous on our breakfast table. bKash payment was smooth.',
    productPurchased: 'XURMIN AeroBoron French Press (800ml)',
    verified: true,
    initials: 'KF',
    ratingBreakdown: { quality: 5, delivery: 4 }
  },
  {
    id: 'rev-04',
    name: 'Farzana Rahman',
    location: 'Uttara Sector 7, Dhaka',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The cordless touch lamp is a lifesaver during sudden power cuts, yet looks like an expensive designer lamp from an interior boutique. Battery backup lasts all evening easily.',
    productPurchased: 'Ambient Touch Glow Wireless Bedside Lamp',
    verified: true,
    initials: 'FR',
    ratingBreakdown: { quality: 5, delivery: 5 }
  },
  {
    id: 'rev-05',
    name: 'Shahriar Hossain',
    location: 'Zindabazar, Sylhet',
    rating: 5,
    date: '1 month ago',
    comment: 'Outstanding build quality on the 360° spin mop. Tile floors dry streak-free and the dual chamber bucket mechanism is so sturdy. Excellent customer support on WhatsApp!',
    productPurchased: '360° Microfiber Spin Mop with Dual-Chamber Bucket',
    verified: true,
    initials: 'SH',
    ratingBreakdown: { quality: 5, delivery: 5 }
  }
];

export const TRACKING_DATABASE: Record<string, any> = {
  'XM-84920': {
    orderId: 'XM-84920',
    customerName: 'Tanvir Ahmed',
    phoneNumber: '01712-345678',
    district: 'Dhaka City',
    address: 'House 42, Road 11, Gulshan-2, Dhaka',
    itemsSummary: '1× Nordica Matte Cast Iron Skillet (26cm), 1× Chef Utensil Set',
    subtotal: 4950,
    shippingFee: 0,
    discountAmount: 495,
    total: 4455,
    paymentMethod: 'Cash on Delivery (COD)',
    status: 'Out for Delivery',
    courier: 'Steadfast Express (Delivery Rider: Md. Rafiqul, 01844-998877)',
    trackingCode: 'SF-DK-908122',
    estimatedDeliveryDate: 'Today by 5:00 PM',
    steps: [
      { title: 'Order Placed & Confirmed', time: 'Yesterday, 10:15 AM', done: true, description: 'Order verified by XURMIN desk team' },
      { title: 'Quality Check & Packed', time: 'Yesterday, 3:30 PM', done: true, description: 'Item passed 3-point inspection and packed in cushioned eco-box' },
      { title: 'Handed to Courier Hub', time: 'Yesterday, 7:45 PM', done: true, description: 'Dispatched via Steadfast Tejgaon Sorting Hub' },
      { title: 'Out for Doorstep Delivery', time: 'Today, 9:20 AM', done: true, description: 'Assigned to area rider Md. Rafiqul for Gulshan-2 doorstep drop' },
      { title: 'Delivered', time: 'Pending', done: false, description: 'Sign upon delivery & pay COD ৳4,455' }
    ]
  },
  'XM-91042': {
    orderId: 'XM-91042',
    customerName: 'Samira Begum',
    phoneNumber: '01819-876543',
    district: 'Chattogram',
    address: 'Flat 4B, Green View Tower, Nasirabad, Chattogram',
    itemsSummary: '1× Modular Airtight Spice & Pantry Canister Set (6 pcs)',
    subtotal: 1890,
    shippingFee: 120,
    discountAmount: 0,
    total: 2010,
    paymentMethod: 'bKash Online',
    status: 'In Transit',
    courier: 'Pathao Courier Chittagong Hub',
    trackingCode: 'PT-CTG-773412',
    estimatedDeliveryDate: 'Tomorrow by 2:00 PM',
    steps: [
      { title: 'Order Placed & Paid via bKash', time: '2 days ago, 4:20 PM', done: true, description: 'bKash TrxID #8K92L001 verified' },
      { title: 'Packed at Central Warehouse', time: 'Yesterday, 11:00 AM', done: true, description: 'Reinforced bubble-wrapped packaging' },
      { title: 'Inter-district Transit', time: 'Yesterday, 9:00 PM', done: true, description: 'En route to Nasirabad Chittagong Station Hub' },
      { title: 'Out for Doorstep Delivery', time: 'Tomorrow, 9:00 AM', done: false, description: 'Scheduled for delivery tomorrow' },
      { title: 'Delivered', time: 'Pending', done: false, description: 'Recipient signature verification' }
    ]
  }
};
