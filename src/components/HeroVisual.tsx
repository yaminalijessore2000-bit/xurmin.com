import React from 'react';
import { ShieldCheck, Truck, Star, Sparkles } from 'lucide-react';

interface HeroVisualProps {
  onExploreClick: () => void;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ onExploreClick }) => {
  return (
    <div className="relative w-full aspect-4/3 lg:aspect-16/10 rounded-2xl bg-gradient-to-br from-[#EFECE6] via-[#F4F1EA] to-[#E8E4DC] p-6 sm:p-8 flex items-center justify-center overflow-hidden border border-stone-200/80 shadow-sm">
      {/* Decorative ambient rays */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-stone-300/40 blur-3xl pointer-events-none" />

      {/* Flagship Product Composition Artwork */}
      <div className="relative z-10 w-full max-w-lg h-full flex items-center justify-center">
        <svg viewBox="0 0 480 340" className="w-full h-full filter drop-shadow-xl">
          <defs>
            <radialGradient id="heroSkillet" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#454542" />
              <stop offset="60%" stopColor="#252523" />
              <stop offset="100%" stopColor="#141412" />
            </radialGradient>
            <linearGradient id="heroWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9945D" />
              <stop offset="100%" stopColor="#875625" />
            </linearGradient>
            <linearGradient id="heroGlass" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#E0ECF7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
            </linearGradient>
            <radialGradient id="lampWarmth" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFDE99" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFDE99" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Table countertop surface */}
          <polygon points="20,290 460,290 440,320 40,320" fill="#D8D2C6" opacity="0.6" />
          <line x1="20" y1="290" x2="460" y2="290" stroke="#B8B0A2" strokeWidth="2" />

          {/* Ambient Table Lamp in background */}
          <circle cx="90" cy="140" r="60" fill="url(#lampWarmth)" />
          <ellipse cx="90" cy="275" rx="26" ry="6" fill="#000000" opacity="0.1" />
          <line x1="90" y1="130" x2="90" y2="274" stroke="#BCA37F" strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx="90" cy="274" rx="22" ry="5" fill="#D4BD99" />
          <path d="M 60 130 C 60 95, 120 95, 120 130 Z" fill="#292623" />
          <ellipse cx="90" cy="130" rx="30" ry="7" fill="#FFE8BF" />

          {/* Sculptural Ripple Ceramic Vase (Sandstone) */}
          <ellipse cx="380" cy="282" rx="36" ry="8" fill="#000000" opacity="0.1" />
          {/* Botanical sprig */}
          <path d="M 380 180 Q 370 100 410 80" fill="none" stroke="#685542" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="410" cy="80" r="6" fill="#887460" />
          <circle cx="395" cy="110" r="7" fill="#7C6854" />
          <circle cx="375" cy="140" r="8" fill="#887460" />
          {/* Vase Body */}
          <path d="M 366 170 L 394 170 C 398 190, 412 215, 412 245 C 412 278, 396 282, 380 282 C 364 282, 348 278, 348 245 C 348 215, 362 190, 366 170 Z" 
            fill="#DDD4C5" stroke="#BAAEA0" strokeWidth="1.5" />
          <ellipse cx="380" cy="170" rx="14" ry="4" fill="#C7BBAA" />

          {/* AeroBoron French Press (Glass & Bamboo) */}
          <ellipse cx="170" cy="280" rx="38" ry="8" fill="#000000" opacity="0.12" />
          <rect x="135" cy="160" width="68" height="118" rx="8" fill="url(#heroGlass)" stroke="#ADC5D9" strokeWidth="1.8" />
          <rect x="137" y="200" width="64" height="74" rx="6" fill="#3D1D0D" opacity="0.9" />
          <line x1="169" y1="130" x2="169" y2="205" stroke="#CCD3D9" strokeWidth="3" />
          <rect x="131" y="152" width="76" height="10" rx="3" fill="#BF9257" />
          <ellipse cx="169" cy="126" rx="11" ry="5" fill="#BF9257" />
          {/* Glass Handle */}
          <path d="M 203 175 C 228 175, 228 235, 203 235" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.9" />

          {/* Central Flagship: XURMIN Cast Iron Skillet */}
          <ellipse cx="280" cy="275" rx="85" ry="20" fill="#000000" opacity="0.15" />
          <circle cx="260" cy="225" r="68" fill="url(#heroSkillet)" stroke="#383834" strokeWidth="3" />
          <circle cx="260" cy="225" r="58" fill="#1C1C1A" stroke="#2B2B28" strokeWidth="2" />
          {/* Beech Handle */}
          <rect x="325" y="217" width="85" height="18" rx="8" fill="url(#heroWood)" transform="rotate(-8 325 217)" />
          <rect x="318" y="218" width="14" height="15" rx="2" fill="#B0B6BD" />
          <circle cx="395" cy="208" r="4" fill="#4B3118" />
          {/* Olive oil sheen */}
          <ellipse cx="250" cy="216" rx="30" ry="18" fill="#FFFFFF" opacity="0.05" />
        </svg>
      </div>

      {/* Floating Interactive Product Tag 1 */}
      <div className="absolute top-6 left-6 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-200 shadow-sm transition-transform hover:-translate-y-0.5">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <div>
          <p className="text-xs font-semibold text-stone-900 leading-tight">Nordica Skillet (26cm)</p>
          <p className="text-[11px] text-stone-500">100% Pre-seasoned Cast Iron</p>
        </div>
      </div>

      {/* Floating Trust Metric Card (Bottom Left) */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-stone-200/90 shadow-md max-w-xs transition-transform hover:-translate-y-0.5">
        <div className="flex items-center gap-1.5 text-amber-500 mb-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-stone-900 ml-1">4.9 / 5</span>
        </div>
        <p className="text-xs text-stone-600 font-medium">
          Loved by <span className="font-semibold text-stone-900">3,800+ homes</span> across Dhaka, Chittagong, Sylhet & 64 districts.
        </p>
      </div>

      {/* Floating Fast Delivery Badge (Top Right) */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 bg-stone-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl shadow-md">
        <Truck className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-xs font-medium">Cash on Delivery Available</span>
      </div>
    </div>
  );
};
