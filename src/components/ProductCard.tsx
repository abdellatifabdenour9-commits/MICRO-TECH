import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, GitCompare, Eye, Battery, Cpu, Database, CpuIcon, Check, BadgeAlert } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onOpenOrderModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onOpenOrderModal,
}) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare 
  } = useStore();

  const formattedPrice = new Intl.NumberFormat('ar-DZ').format(product.price);
  const formattedOriginalPrice = product.originalPrice 
    ? new Intl.NumberFormat('ar-DZ').format(product.originalPrice) 
    : null;

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Calculate discount percentage
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div 
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 text-right"
      dir="rtl"
      id={`product-card-${product.id}`}
    >
      
      {/* Badges Overlay */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
        {/* Condition badge */}
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold tracking-wide shadow-md ${
          product.condition === 'new' 
            ? 'bg-emerald-600 text-white' 
            : 'bg-neutral-800 border border-neutral-700 text-neutral-200'
        }`}>
          {product.condition === 'new' ? 'جديد علبة' : 'مستورد نظيف جداً'}
        </span>

        {/* Discount badge */}
        {discountPercent > 0 && (
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-red-600 text-white shadow-md animate-pulse">
            تخفيض -{discountPercent}%
          </span>
        )}

        {/* Stock warning */}
        {product.countInStock <= 2 && product.countInStock > 0 && (
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-md">
            كمية محدودة جداً ({product.countInStock})
          </span>
        )}

        {product.countInStock === 0 && (
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-neutral-950 border border-neutral-800 text-neutral-400 shadow-md">
            منتهي من المخزون
          </span>
        )}
      </div>

      {/* Wishlist & Compare actions triggers */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
            isLiked 
              ? 'bg-red-500/20 border-red-500/40 text-red-500 scale-110' 
              : 'bg-neutral-950/45 border-neutral-800 text-neutral-400 hover:text-red-500 hover:bg-neutral-950'
          }`}
          title={isLiked ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
            isCompared 
              ? 'bg-blue-500/20 border-blue-500/40 text-blue-400 scale-110' 
              : 'bg-neutral-950/45 border-neutral-800 text-neutral-400 hover:text-blue-500 hover:bg-neutral-950'
          }`}
          title={isCompared ? 'إزالة من المقارنة' : 'أضف للمقارنة side-by-side'}
        >
          <GitCompare size={16} className={isCompared ? 'animate-pulse' : ''} />
        </button>
      </div>

      {/* Product Image */}
      <div 
        onClick={() => onOpenDetails(product)}
        className="w-full aspect-[4/3] bg-neutral-950/50 overflow-hidden relative cursor-pointer group-hover:opacity-95"
      >
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <span className="flex items-center gap-1 text-xs font-bold text-white bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full shadow-lg">
            <Eye size={12} />
            <span>عرض المواصفات كاملة</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Brand and rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-blue-400 tracking-wider font-mono">
            {product.brand.toUpperCase()}
          </span>
          {product.batteryHealth && (
            <div className="flex items-center gap-1 text-neutral-400 text-[10px]">
              <Battery size={11} className="text-emerald-500" />
              <span>البطارية: {product.batteryHealth}</span>
            </div>
          )}
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => onOpenDetails(product)}
          className="text-sm font-bold text-neutral-100 hover:text-blue-400 transition-colors cursor-pointer leading-tight mb-3 line-clamp-1 h-5"
        >
          {product.name}
        </h3>

        {/* Quick Specs HUD panel */}
        <div className="grid grid-cols-2 gap-2 p-2 bg-black/40 border border-white/5 rounded-xl mb-4 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <Cpu size={12} className="text-neutral-500 shrink-0" />
            <span className="truncate" title={product.cpu}>{product.cpu}</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-300">
            <Database size={12} className="text-neutral-500 shrink-0" />
            <span className="truncate">{product.ram}</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-300 col-span-2 border-t border-white/5 pt-1.5 mt-0.5">
            <CpuIcon size={12} className="text-neutral-500 shrink-0" />
            <span className="truncate" title={product.gpu}>{product.gpu}</span>
          </div>
        </div>

        {/* Description Snippet */}
        <p className="text-[11px] text-neutral-450 text-neutral-400 leading-snug line-clamp-2 h-8 mb-4 font-sans">
          {product.description}
        </p>

        {/* Pricing tag */}
        <div className="flex items-baseline justify-between mt-auto pt-3 border-t border-neutral-850">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-emerald-400">
                {formattedPrice}
              </span>
              <span className="text-[10px] font-bold text-neutral-400">د.ج</span>
            </div>
            {formattedOriginalPrice && (
              <span className="text-xs text-neutral-500 line-through font-sans">
                {formattedOriginalPrice} د.ج
              </span>
            )}
          </div>
          
          <div className="text-[10px] text-neutral-300 bg-black/40 border border-white/5 py-1 px-2 rounded-lg font-mono">
            SSD: {product.storage}
          </div>
        </div>
      </div>

      {/* Actions Footer Panel */}
      <div className="p-4 pt-0 grid grid-cols-5 gap-2">
        <button
          onClick={() => onOpenDetails(product)}
          className="col-span-2 flex items-center justify-center gap-1 px-2 py-2.5 text-xs font-semibold rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
          title="عرض التفاصيل والمواصفات الكاملة"
        >
          <Eye size={13} className="shrink-0" />
          <span>التفاصيل</span>
        </button>

        <button
          onClick={() => {
            if (product.countInStock > 0) {
              onOpenOrderModal(product);
            }
          }}
          disabled={product.countInStock === 0}
          className={`col-span-3 flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md ${
            product.countInStock > 0 
              ? 'glass-button-primary active:scale-95' 
              : 'bg-white/5 text-neutral-500 border border-white/5 cursor-not-allowed shadow-none'
          }`}
        >
          <span>شراء سريع</span>
        </button>
      </div>

    </div>
  );
};
