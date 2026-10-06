import React from 'react';
import { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  className?: string;
  isQuickView?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ product, className = '', isQuickView = false }) => {
  const { visualType } = product;

  // Render authentic stylized vector art for each product type with realistic lighting and materials
  const renderVisualArtwork = () => {
    switch (visualType) {
      case 'skillet':
        return (
          <svg viewBox="0 0 320 240" className="w-full h-full object-contain filter drop-shadow-md">
            <defs>
              <radialGradient id="skilletMetal" cx="45%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#3C3C3A" />
                <stop offset="65%" stopColor="#222220" />
                <stop offset="100%" stopColor="#141413" />
              </radialGradient>
              <linearGradient id="beechHandle" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C99B6A" />
                <stop offset="50%" stopColor="#AE7E4D" />
                <stop offset="100%" stopColor="#8A5A2B" />
              </linearGradient>
              <filter id="shadowHeavy" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.25" />
              </filter>
            </defs>
            {/* Soft ground shadow */}
            <ellipse cx="150" cy="180" rx="95" ry="24" fill="#000000" opacity="0.12" />
            {/* Cast iron pan body */}
            <circle cx="130" cy="120" r="76" fill="url(#skilletMetal)" filter="url(#shadowHeavy)" />
            <circle cx="130" cy="120" r="66" fill="#1C1C1A" stroke="#383835" strokeWidth="2.5" />
            <circle cx="130" cy="120" r="54" fill="#242422" opacity="0.8" />
            {/* Interior seasoning sheen */}
            <ellipse cx="120" cy="108" rx="36" ry="24" fill="#FFFFFF" opacity="0.04" />
            {/* Spout left */}
            <path d="M 54 116 Q 48 120 54 124 Z" fill="#222220" />
            {/* Spout right */}
            <path d="M 206 116 Q 212 120 206 124 Z" fill="#222220" />
            {/* Stainless steel neck bracket */}
            <rect x="195" y="112" width="22" height="16" rx="3" fill="#A8ACB2" />
            <rect x="198" y="115" width="16" height="10" rx="1.5" fill="#CFD3D8" />
            {/* Solid Beechwood Handle */}
            <rect x="210" y="110" width="86" height="20" rx="9" fill="url(#beechHandle)" transform="rotate(-6 210 110)" />
            {/* Hanging eyelet loop */}
            <circle cx="288" cy="102" r="4.5" fill="#4A341E" />
            {/* Wood grain subtleties */}
            <line x1="225" y1="117" x2="275" y2="111" stroke="#E2BF99" strokeWidth="0.8" opacity="0.4" />
            <line x1="230" y1="123" x2="270" y2="118" stroke="#784B1F" strokeWidth="0.8" opacity="0.5" />
          </svg>
        );

      case 'frenchpress':
        return (
          <svg viewBox="0 0 320 240" className="w-full h-full object-contain filter drop-shadow-md">
            <defs>
              <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#EAF1F8" stopOpacity="0.15" />
                <stop offset="85%" stopColor="#D5E4F2" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="coffeeBrew" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A2613" />
                <stop offset="50%" stopColor="#301608" />
                <stop offset="100%" stopColor="#1E0C04" />
              </linearGradient>
              <linearGradient id="bambooLid" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D8AF79" />
                <stop offset="50%" stopColor="#BE925A" />
                <stop offset="100%" stopColor="#A77A41" />
              </linearGradient>
            </defs>
            {/* Ground shadow */}
            <ellipse cx="160" cy="205" rx="55" ry="12" fill="#000000" opacity="0.12" />
            {/* Glass handle */}
            <path d="M 205 85 C 235 85, 235 155, 205 155" fill="none" stroke="#BED3E6" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
            <path d="M 205 85 C 235 85, 235 155, 205 155" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            {/* Glass cylinder */}
            <rect x="115" y="65" width="90" height="135" rx="10" fill="url(#glassBody)" stroke="#9CB8D1" strokeWidth="2" />
            {/* Coffee brew liquid inside */}
            <rect x="117" y="115" width="86" height="83" rx="8" fill="url(#coffeeBrew)" opacity="0.88" />
            {/* Stainless steel plunger rod */}
            <line x1="160" y1="28" x2="160" y2="120" stroke="#CBD2D8" strokeWidth="4" strokeLinecap="round" />
            {/* Plunger mesh disc */}
            <rect x="119" y="118" width="82" height="6" rx="2" fill="#E6EAEE" stroke="#909AA3" strokeWidth="1" />
            <line x1="122" y1="121" x2="198" y2="121" stroke="#6C757E" strokeWidth="1.5" strokeDasharray="2,2" />
            {/* Spout */}
            <path d="M 115 72 L 105 70 L 115 78 Z" fill="#9CB8D1" opacity="0.7" />
            {/* Bamboo Lid */}
            <rect x="110" y="56" width="100" height="12" rx="4" fill="url(#bambooLid)" stroke="#8F632E" strokeWidth="1" />
            {/* Top plunger knob */}
            <ellipse cx="160" cy="24" rx="14" ry="7" fill="url(#bambooLid)" />
            {/* Highlight gleam */}
            <rect x="122" y="72" width="6" height="110" rx="3" fill="#FFFFFF" opacity="0.45" />
          </svg>
        );

      case 'knifeblock':
        return (
          <svg viewBox="0 0 320 240" className="w-full h-full object-contain filter drop-shadow-md">
            <defs>
              <linearGradient id="acaciaBlock" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9B6239" />
                <stop offset="45%" stopColor="#7E4723" />
                <stop offset="100%" stopColor="#5E3113" />
              </linearGradient>
              <linearGradient id="steelBlade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F5F7FA" />
                <stop offset="50%" stopColor="#D2D7DC" />
                <stop offset="100%" stopColor="#ADB3BA" />
              </linearGradient>
            </defs>
            {/* Shadow */}
            <ellipse cx="160" cy="208" rx="80" ry="14" fill="#000000" opacity="0.14" />
            {/* Heavy steel base plate */}
            <rect x="100" y="196" width="120" height="12" rx="4" fill="#2E3339" stroke="#484F56" strokeWidth="1.5" />
            <rect x="102" y="197" width="116" height="2" fill="#717A85" />
            {/* Acacia angled magnetic board */}
            <polygon points="120,50 200,50 185,196 135,196" fill="url(#acaciaBlock)" stroke="#4A260F" strokeWidth="1.5" />
            {/* Wood grain striations */}
            <line x1="130" y1="70" x2="178" y2="185" stroke="#BA7C4D" strokeWidth="1.5" opacity="0.5" />
            <line x1="145" y1="58" x2="162" y2="190" stroke="#4F270F" strokeWidth="1.2" opacity="0.6" />
            {/* Chef Knife 1 (Santoku) */}
            <path d="M 140 30 L 140 50 L 148 165 L 134 165 L 135 50 Z" fill="url(#steelBlade)" stroke="#929CA6" strokeWidth="0.8" />
            <rect x="135" y="10" width="8" height="35" rx="3" fill="#1C1F22" />
            {/* Chef Knife 2 (Utility) */}
            <path d="M 165 42 L 165 58 L 171 150 L 161 150 L 162 58 Z" fill="url(#steelBlade)" stroke="#929CA6" strokeWidth="0.8" />
            <rect x="162" y="24" width="7" height="30" rx="2.5" fill="#1C1F22" />
            {/* Embedded magnet ring indicator */}
            <circle cx="160" cy="115" r="3" fill="#D29966" opacity="0.4" />
          </svg>
        );

      case 'storagejars':
        return (
          <svg viewBox="0 0 320 240" className="w-full h-full object-contain filter drop-shadow-md">
            <defs>
              <linearGradient id="jarGlass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                <stop offset="25%" stopColor="#E2EBF2" stopOpacity="0.15" />
                <stop offset="80%" stopColor="#D0DFED" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="spicesTurmeric" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5B025" />
                <stop offset="100%" stopColor="#D98A07" />
              </linearGradient>
              <linearGradient id="spicesCumin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A87544" />
                <stop offset="100%" stopColor="#7E5025" />
              </linearGradient>
            </defs>
            {/* Shadows */}
            <ellipse cx="120" cy="195" rx="42" ry="10" fill="#000000" opacity="0.1" />
            <ellipse cx="205" cy="192" rx="40" ry="10" fill="#000000" opacity="0.1" />
            {/* Back Jar (Large - Cumin / Brown Rice) */}
            <rect x="165" y="85" width="80" height="110" rx="8" fill="url(#jarGlass)" stroke="#A9C1D6" strokeWidth="1.5" />
            <rect x="167" y="115" width="76" height="78" rx="6" fill="url(#spicesCumin)" opacity="0.85" />
            {/* Back Lid */}
            <rect x="162" y="74" width="86" height="14" rx="4" fill="#3D444B" />
            <circle cx="205" cy="81" r="3.5" fill="#EAECEE" />
            {/* Front Jar (Medium - Golden Turmeric / Pulses) */}
            <rect x="80" y="105" width="78" height="92" rx="8" fill="url(#jarGlass)" stroke="#A9C1D6" strokeWidth="1.5" />
            <rect x="82" y="132" width="74" height="63" rx="6" fill="url(#spicesTurmeric)" opacity="0.9" />
            {/* Front Lid with one-touch button */}
            <rect x="77" y="93" width="84" height="14" rx="4" fill="#24282D" />
            <circle cx="119" cy="100" r="4" fill="#E5AA38" />
            {/* Minimalist label */}
            <rect x="94" y="145" width="50" height="22" rx="2" fill="#FFFFFF" opacity="0.92" />
            <line x1="102" y1="152" x2="136" y2="152" stroke="#2B2B28" strokeWidth="1.5" />
            <line x1="106" y1="159" x2="132" y2="159" stroke="#8A8A85" strokeWidth="1" />
          </svg>
        );

      case 'vase':
        return (
          <svg viewBox="0 0 320 240" className="w-full h-full object-contain filter drop-shadow-md">
            <defs>
              <linearGradient id="ceramicSandstone" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DFD5C6" />
                <stop offset="35%" stopColor="#EFE8DC" />
                <stop offset="70%" stopColor="#D5C7B3" />
                <stop offset="100%" stopColor="#BAAA94" />
              </linearGradient>
            </defs>
            {/* Shadow */}
            <ellipse cx="160" cy="208" rx="48" ry="12" fill="#000000" opacity="0.12" />
            {/* Botanical Dried Palm / Eucalyptus stem */}
            <path d="M 160 100 Q 155 30 180 15" fill="none" stroke="#75624E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 180 15 Q 192 18 195 28 Q 185 30 180 15 Z" fill="#877561" opacity="0.85" />
            <path d="M 172 32 Q 160 40 162 52 Q 172 48 172 32 Z" fill="#93826D" opacity="0.85" />
            <path d="M 168 56 Q 185 62 184 74 Q 172 70 168 56 Z" fill="#877561" opacity="0.85" />
            {/* Sculptural Vase Silhouette */}
            <path d="M 142 80 L 178 80 C 182 105, 205 130, 205 165 C 205 198, 185 204, 160 204 C 135 204, 115 198, 115 165 C 115 130, 138 105, 142 80 Z" 
              fill="url(#ceramicSandstone)" stroke="#BAAA94" strokeWidth="1.2" />
            {/* Textural Ribbing Grooves */}
            <path d="M 125 140 C 145 146, 175 146, 195 140" fill="none" stroke="#BAAA94" strokeWidth="1.5" opacity="0.6" />
            <path d="M 120 156 C 145 163, 175 163, 200 156" fill="none" stroke="#BAAA94" strokeWidth="1.5" opacity="0.6" />
            <path d="M 118 172 C 145 180, 175 180, 202 172" fill="none" stroke="#BAAA94" strokeWidth="1.5" opacity="0.6" />
            <path d="M 122 188 C 145 194, 175 194, 198 188" fill="none" stroke="#BAAA94" strokeWidth="1.5" opacity="0.6" />
            {/* Neck Rim */}
            <ellipse cx="160" cy="80" rx="18" ry="4.5" fill="#C5B6A2" stroke="#AA9A85" strokeWidth="1" />
          </svg>
        );

      case 'mop':
        return (
          <svg viewBox="0 0 320 240" className="w-full h-full object-contain filter drop-shadow-md">
            <defs>
              <linearGradient id="bucketBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B7391" />
                <stop offset="60%" stopColor="#2A566E" />
                <stop offset="100%" stopColor="#1B3E52" />
              </linearGradient>
            </defs>
            {/* Shadow */}
            <ellipse cx="165" cy="205" rx="75" ry="15" fill="#000000" opacity="0.12" />
            {/* Dual Chamber Bucket */}
            <rect x="100" y="115" width="130" height="85" rx="14" fill="url(#bucketBlue)" stroke="#19384A" strokeWidth="1.5" />
            {/* Left wash chamber basket */}
            <rect x="108" y="122" width="54" height="70" rx="8" fill="#1C3847" />
            <circle cx="135" cy="155" r="18" fill="none" stroke="#68A5C7" strokeWidth="2.5" strokeDasharray="4,3" />
            {/* Right spin dryer stainless basket */}
            <rect x="168" y="122" width="54" height="70" rx="8" fill="#2E3C44" />
            <ellipse cx="195" cy="142" rx="20" ry="12" fill="#D9DFE5" stroke="#97A4AF" strokeWidth="1.5" />
            <ellipse cx="195" cy="142" rx="14" ry="8" fill="#697682" />
            {/* Bucket handle */}
            <path d="M 98 140 C 98 90, 232 90, 232 140" fill="none" stroke="#E5EAEE" strokeWidth="4" strokeLinecap="round" />
            {/* Mop pole angled */}
            <line x1="85" y1="20" x2="135" y2="155" stroke="#CBD5DF" strokeWidth="5" strokeLinecap="round" />
            <line x1="82" y1="18" x2="100" y2="65" stroke="#E86E38" strokeWidth="6" strokeLinecap="round" />
            {/* Circular Microfiber disc */}
            <ellipse cx="135" cy="156" rx="28" ry="12" fill="#FFFFFF" stroke="#BAC7D5" strokeWidth="1" />
            <path d="M 110 156 Q 135 168 160 156" fill="none" stroke="#2A566E" strokeWidth="2" strokeDasharray="3,3" />
          </svg>
        );

      case 'utensils':
        return (
          <svg viewBox="0 0 320 240" className="w-full h-full object-contain filter drop-shadow-md">
            <defs>
              <linearGradient id="crockMatte" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4A4E53" />
                <stop offset="45%" stopColor="#5D6268" />
                <stop offset="100%" stopColor="#3E4246" />
              </linearGradient>
            </defs>
            {/* Shadow */}
            <ellipse cx="160" cy="204" rx="46" ry="12" fill="#000000" opacity="0.12" />
            {/* Acacia handles sticking up */}
            <line x1="140" y1="130" x2="120" y2="50" stroke="#C49666" strokeWidth="6" strokeLinecap="round" />
            <line x1="160" y1="130" x2="160" y2="35" stroke="#C49666" strokeWidth="6" strokeLinecap="round" />
            <line x1="180" y1="130" x2="200" y2="45" stroke="#C49666" strokeWidth="6" strokeLinecap="round" />
            {/* Silicone heads */}
            {/* Left Spatula head */}
            <path d="M 110 25 L 132 32 L 126 55 L 105 48 Z" fill="#587565" rx="3" />
            {/* Center Slotted Spoon */}
            <ellipse cx="160" cy="30" rx="15" ry="22" fill="#587565" />
            <line x1="160" y1="20" x2="160" y2="38" stroke="#3D5246" strokeWidth="2" />
            <line x1="154" y1="24" x2="154" y2="34" stroke="#3D5246" strokeWidth="1.5" />
            <line x1="166" y1="24" x2="166" y2="34" stroke="#3D5246" strokeWidth="1.5" />
            {/* Right Whisk wire head */}
            <ellipse cx="205" cy="40" rx="14" ry="18" fill="none" stroke="#D3D9E0" strokeWidth="2" />
            <ellipse cx="205" cy="40" rx="8" ry="16" fill="none" stroke="#A9B2BC" strokeWidth="1.5" />
            {/* Counter Ceramic Crock Body */}
            <rect x="125" y="110" width="70" height="90" rx="8" fill="url(#crockMatte)" stroke="#323539" strokeWidth="1" />
            <ellipse cx="160" cy="110" rx="35" ry="8" fill="#3A3E42" stroke="#25272A" strokeWidth="1" />
            {/* Natural wood base collar */}
            <rect x="127" y="190" width="66" height="10" rx="2" fill="#B38250" />
          </svg>
        );

      case 'lamp':
        return (
          <svg viewBox="0 0 320 240" className="w-full h-full object-contain filter drop-shadow-md">
            <defs>
              <radialGradient id="lampGlow" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#FFDE99" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FFBF52" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="lampStem" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E2B77A" />
                <stop offset="50%" stopColor="#F5D39E" />
                <stop offset="100%" stopColor="#C99B5B" />
              </linearGradient>
            </defs>
            {/* Ambient warm light halo */}
            <circle cx="160" cy="85" r="75" fill="url(#lampGlow)" />
            {/* Ground shadow */}
            <ellipse cx="160" cy="208" rx="42" ry="10" fill="#000000" opacity="0.12" />
            {/* Weighted brass base */}
            <ellipse cx="160" cy="200" rx="34" ry="8" fill="url(#lampStem)" stroke="#9E763D" strokeWidth="1" />
            {/* Slender aluminum stem */}
            <line x1="160" y1="85" x2="160" y2="198" stroke="url(#lampStem)" strokeWidth="6" strokeLinecap="round" />
            {/* Brass touch touchpoint ring */}
            <circle cx="160" cy="155" r="4.5" fill="#FFE8BF" stroke="#9E763D" strokeWidth="1" />
            {/* Mushroom dome shade */}
            <path d="M 115 85 C 115 48, 205 48, 205 85 Z" fill="#2E2B27" stroke="#1D1A17" strokeWidth="1.5" />
            {/* Underside frosted diffuser */}
            <ellipse cx="160" cy="85" rx="45" ry="9" fill="#FFF2D4" stroke="#E2B77A" strokeWidth="1" />
            <ellipse cx="160" cy="85" rx="35" ry="6" fill="#FFFFFF" opacity="0.8" />
          </svg>
        );

      case 'towels':
        return (
          <svg viewBox="0 0 320 240" className="w-full h-full object-contain filter drop-shadow-md">
            {/* Shadow */}
            <ellipse cx="160" cy="204" rx="72" ry="14" fill="#000000" opacity="0.1" />
            {/* Bottom Folded Bath Sheet (Slate Olive) */}
            <rect x="95" y="155" width="130" height="38" rx="10" fill="#6B7973" stroke="#525E59" strokeWidth="1" />
            <path d="M 95 174 Q 160 178 225 174" fill="none" stroke="#5A6660" strokeWidth="1.5" strokeDasharray="3,3" />
            {/* Middle Folded Bath Sheet (Warm Stone) */}
            <rect x="105" y="125" width="115" height="34" rx="9" fill="#AEAC9F" stroke="#8F8C7F" strokeWidth="1" />
            <path d="M 105 142 Q 160 146 220 142" fill="none" stroke="#969488" strokeWidth="1.5" strokeDasharray="3,3" />
            {/* Top Folded Hand Towel (Cream Honeycomb) */}
            <rect x="115" y="98" width="95" height="30" rx="8" fill="#EAE5D9" stroke="#C5BFB1" strokeWidth="1" />
            <path d="M 115 113 Q 160 117 210 113" fill="none" stroke="#CCC6B8" strokeWidth="1.5" strokeDasharray="3,3" />
            {/* Cotton ribbon tie with card */}
            <rect x="156" y="94" width="8" height="98" fill="#4B3A2C" opacity="0.75" />
            <rect x="150" y="130" width="20" height="26" rx="2" fill="#FAF8F5" stroke="#D1CCC2" strokeWidth="1" />
            <line x1="154" y1="138" x2="166" y2="138" stroke="#4B3A2C" strokeWidth="1" />
          </svg>
        );

      case 'organizer':
        return (
          <svg viewBox="0 0 320 240" className="w-full h-full object-contain filter drop-shadow-md">
            {/* Shadow */}
            <ellipse cx="160" cy="200" rx="85" ry="14" fill="#000000" opacity="0.1" />
            {/* Main low-profile trunk body */}
            <polygon points="65,150 255,150 240,190 80,190" fill="#425048" stroke="#2B3630" strokeWidth="1.5" />
            {/* Folding lid top */}
            <polygon points="65,150 100,105 270,105 255,150" fill="#58675F" stroke="#3A4640" strokeWidth="1.5" />
            {/* Transparent clear window */}
            <polygon points="120,138 145,115 225,115 205,138" fill="#E2EBE5" opacity="0.45" stroke="#90A197" strokeWidth="1" />
            {/* Side fabric pull handles */}
            <rect x="68" y="160" width="10" height="18" rx="2" fill="#E2AA60" />
            {/* Four 360 wheels at base */}
            <circle cx="90" cy="196" r="6" fill="#1C211E" stroke="#525B55" strokeWidth="1.5" />
            <circle cx="130" cy="196" r="6" fill="#1C211E" stroke="#525B55" strokeWidth="1.5" />
            <circle cx="190" cy="196" r="6" fill="#1C211E" stroke="#525B55" strokeWidth="1.5" />
            <circle cx="230" cy="196" r="6" fill="#1C211E" stroke="#525B55" strokeWidth="1.5" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-stone-400">
            <span className="text-sm font-medium">XURMIN Living</span>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden select-none flex items-center justify-center bg-[#F5F3EF] transition-colors ${
        isQuickView ? 'h-80 sm:h-96' : 'h-60 sm:h-64'
      } ${className}`}
    >
      {/* Subtle architectural ambient background gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-200/50 via-transparent to-amber-50/40 pointer-events-none" />
      
      {/* Material Accent Dot */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
        <span 
          className="w-2.5 h-2.5 rounded-full border border-white/60 shadow-xs" 
          style={{ backgroundColor: product.colorTone }}
          title={product.material}
        />
        <span className="text-[11px] font-medium tracking-wider uppercase text-stone-500">
          {product.categoryLabel.split(' ')[0]}
        </span>
      </div>

      {/* Render Artwork */}
      <div className="w-full h-full p-4 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
        {renderVisualArtwork()}
      </div>
    </div>
  );
};
