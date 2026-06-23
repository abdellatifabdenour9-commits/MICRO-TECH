import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Clock, Tag, Sparkles, Battery, Check, ShoppingCart, Percent } from 'lucide-react';

interface SpecialOffersProps {
  onOpenDetails: (product: Product) => void;
  onOpenOrderModal: (product: Product) => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  onOpenDetails,
  onOpenOrderModal,
}) => {
  const { products } = useStore();

  // Highlight products with original price that are laptops or bestseller
  const offerProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);

  // Countdown State: target 48 hours from now
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 14,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          // Reset just for demo
          return { days: 2, hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-neutral-950 text-white min-h-[70vh]" id="special-offers" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Page title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-650/10 text-red-500 border border-red-500/15 text-xs font-bold mb-3">
            <Percent size={14} className="animate-spin" />
            <span>عرض حصري ومحدود لفترة وجيزة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-white">
            صفحة التخفيضات الكبرى وعروض الفلاش
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            حواسيب بمواصفات خارقة وبطاريات أصلية مستوردة بخصومات هائلة ملموسة تصل حتى 25,000 د.ج. جميع العروض تشمل التوصيل وفحص الجهاز والضمان!
          </p>
        </div>

        {/* Global Countdown Board */}
        <div className="mb-12 p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 text-center max-w-xl mx-auto relative overflow-hidden shadow-xl shadow-blue-500/3">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl" />
          <p className="text-xs text-neutral-400 mb-3 block font-bold flex items-center justify-center gap-1.5">
            <Clock size={14} className="text-red-500 animate-pulse" />
            ينتهي العرض الخاص الحالي التنازلي بعد:
          </p>

          <div className="grid grid-cols-4 gap-3 text-center max-w-xs sm:max-w-md mx-auto">
            <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-2xl">
              <span className="text-xl sm:text-2xl font-black text-blue-500 font-sans">{timeLeft.seconds}</span>
              <span className="text-[10px] text-neutral-500 block font-medium">ثانية</span>
            </div>
            <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-2xl">
              <span className="text-xl sm:text-2xl font-black text-blue-500 font-sans">{timeLeft.minutes}</span>
              <span className="text-[10px] text-neutral-500 block font-medium">دقيقة</span>
            </div>
            <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-2xl">
              <span className="text-xl sm:text-2xl font-black text-blue-500 font-sans">{timeLeft.hours}</span>
              <span className="text-[10px] text-neutral-500 block font-medium">ساعة</span>
            </div>
            <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-2xl">
              <span className="text-xl sm:text-2xl font-black text-blue-500 font-sans">{timeLeft.days}</span>
              <span className="text-[10px] text-neutral-500 block font-medium">يوم</span>
            </div>
          </div>
        </div>

        {/* Dynamic List */}
        {offerProducts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-neutral-800 bg-neutral-900/20 text-neutral-500 text-sm">
            لا توجد تخفيضات نشطة حالياً. ندرج عروضاً جديدة دورياً، ترقبوا!
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {offerProducts.map((prod) => {
              const discountAmt = prod.originalPrice! - prod.price;
              const discountPercent = Math.round((discountAmt / prod.originalPrice!) * 100);

              const formattedPrice = new Intl.NumberFormat('ar-DZ').format(prod.price);
              const formattedOriginalPrice = new Intl.NumberFormat('ar-DZ').format(prod.originalPrice!);

              return (
                <div 
                  key={prod.id}
                  className="rounded-3xl border border-neutral-800 bg-neutral-900/20 p-6 flex flex-col sm:flex-row gap-6 hover:border-blue-500/30 transition-all shadow-lg"
                >
                  {/* Left Column: Image wrapper & percentage bubble */}
                  <div className="w-full sm:w-44 aspect-square rounded-2xl bg-neutral-950 overflow-hidden shrink-0 relative border border-neutral-850">
                    <img 
                      src={prod.images[0]} 
                      alt={prod.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-red-650 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-xl shadow-md">
                      تخفيض {discountPercent}%
                    </div>
                  </div>

                  {/* Right Column: Spec content & Pricing info */}
                  <div className="flex-grow flex flex-col justify-between text-right">
                    <div>
                      {/* Brand & status */}
                      <div className="flex items-center justify-between mb-1.5 col-span-2">
                        <span className="text-[10px] font-bold text-blue-400 font-mono">{prod.brand.toUpperCase()}</span>
                        {prod.batteryHealth && (
                          <span className="text-[10px] text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded-lg flex items-center gap-1">
                            <Battery size={10} className="text-emerald-500" />
                            {prod.batteryHealth}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-neutral-100 hover:text-blue-400 transition-colors cursor-pointer mb-2 line-clamp-1">
                        {prod.name}
                      </h3>

                      {/* Specs pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4 text-[10px] text-neutral-300">
                        <span className="bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-850">{prod.cpu}</span>
                        <span className="bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-850">{prod.ram}</span>
                        <span className="bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-850">{prod.storage} SSD</span>
                      </div>
                    </div>

                    {/* Stock tracker progress bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1 font-sans">
                        <span>الكمية المحجوزة بالمستودع</span>
                        <span className="font-bold text-amber-500">متبقي {prod.countInStock} قطع فقط!</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all rounded-full"
                          style={{ width: `${Math.min(100, (prod.countInStock / 15) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Pricing info */}
                    <div className="pt-3 border-t border-neutral-850 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-500 block">سعر العرض الحصري</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-extrabold text-emerald-400">{formattedPrice}</span>
                          <span className="text-[10px] font-bold text-neutral-400">د.ج</span>
                        </div>
                        <span className="text-xs text-neutral-500 line-through block font-sans">قبل العرض: {formattedOriginalPrice} د.ج</span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => onOpenOrderModal(prod)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 text-center"
                        >
                          طلب سريع
                        </button>
                        <button
                          onClick={() => onOpenDetails(prod)}
                          className="text-[10px] text-neutral-400 hover:text-white underline text-center"
                        >
                          تفاصيل أكثر
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
