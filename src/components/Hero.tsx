import React from 'react';
import { ShoppingBag, ArrowUpRight, ShieldCheck, CheckCircle, Truck, Info, ThumbsUp } from 'lucide-react';

interface HeroProps {
  onBrowseProducts: () => void;
  onContactWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBrowseProducts, onContactWhatsApp }) => {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 text-white pt-16 pb-20 px-4 md:px-6 md:pt-24 md:pb-32 border-b border-neutral-900" id="hero-section">
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Graphics Area / Futuristic Tech laptop mock */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-2xl bg-neutral-900/60 border border-neutral-800 p-4 shadow-2xl flex flex-col justify-between overflow-hidden group">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
            
            {/* Simulated Specs HUD */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-mono text-neutral-400 tracking-wider">LIVE STOCK CHECK</span>
              </div>
              <span className="text-[11px] font-sans font-bold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full">أجهزة الكابا الأصلية</span>
            </div>
            
            {/* Major Highlight Laptop Display */}
            <div className="my-auto py-8 flex flex-col items-center relative z-10">
              <div className="relative w-72 h-44 cursor-pointer transform group-hover:scale-105 transition-all">
                {/* Screen */}
                <div className="absolute top-0 inset-x-4 h-36 rounded-t-xl bg-neutral-950 border border-neutral-750 flex flex-col items-center justify-center p-3 text-center shadow-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-neutral-950 opacity-90" />
                  <div className="z-10 flex flex-col items-center">
                    <span className="text-[10px] font-mono text-blue-500 font-bold mb-1">MICRO TECH 2026</span>
                    <span className="text-sm font-bold text-neutral-100 font-sans tracking-tight">Core i7 11th Gen • 16GB RAM</span>
                    <span className="text-[11px] text-emerald-400 mt-2 font-medium">95% ممتازة البطارية</span>
                  </div>
                </div>
                {/* Keyboard base & hinge */}
                <div className="absolute bottom-4 left-0 right-0 h-4.5 bg-neutral-800 border-t border-neutral-700 rounded-b-xl shadow-xl flex justify-center">
                  <div className="w-16 h-1 bg-neutral-900 rounded-full mt-1.5" />
                </div>
                {/* Shadow */}
                <div className="absolute bottom-1 inset-x-8 h-2 bg-black/60 rounded-full blur-md" />
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-neutral-400">جميع اللابتوبات مستوردة من الشركات الأوروبية ومفحوصة بدقة</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 border-t border-neutral-800 pt-3 text-center z-10">
              <div className="p-2 bg-neutral-950/50 rounded-xl">
                <p className="text-lg font-bold text-blue-500">100%</p>
                <p className="text-[9px] text-neutral-400 font-medium">أصلي ومضمون</p>
              </div>
              <div className="p-2 bg-neutral-950/50 rounded-xl">
                <p className="text-lg font-bold text-emerald-500">+58</p>
                <p className="text-[9px] text-neutral-400 font-medium">توصيل للولايات</p>
              </div>
              <div className="p-2 bg-neutral-950/50 rounded-xl">
                <p className="text-lg font-bold text-neutral-200">24h</p>
                <p className="text-[9px] text-neutral-400 font-medium">دعم واستشارة</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Slogan Text Info */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center text-right" dir="rtl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-550/10 text-blue-400 text-xs font-bold w-fit mb-6 self-start lg:self-end border border-blue-500/15">
            <ShieldCheck size={14} />
            <span>نضمن لك الجودة والاعتمادية الأوروبية</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            حاسوبك القادم <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-emerald-400">
              يبدأ من هنا
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed max-w-xl self-start lg:self-end mb-8 font-sans">
            نوفر حواسيب أوروبية أصلية ومضمونة (HP, Dell, Lenovo) بأسعار تنافسية وخيارات متعددة للتخصيص، مع شحن سريع آمن لباب منزلك في جميع ولايات الجزائر الـ 58. والدفع بعد المعاينة الكاملة!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-start lg:justify-end">
            <button
              onClick={onBrowseProducts}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-sm font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 text-white"
            >
              <ShoppingBag size={18} />
              <span>تصفح المنتجات المتوفرة</span>
              <ArrowUpRight size={16} />
            </button>
            <button
              onClick={onContactWhatsApp}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-neutral-900 border border-neutral-850 hover:bg-neutral-850 text-sm font-semibold rounded-xl text-neutral-200 transition-all"
            >
              <span>تواصل مباشر عبر واتساب</span>
              <svg className="w-4 h-4 fill-emerald-500" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.894 0c3.18 0 6.171 1.242 8.413 3.496C22.548 5.75 23.8 8.749 23.8 11.933c-.004 6.57-5.328 11.894-11.895 11.894-1.996-.001-3.957-.502-5.713-1.455L0 24zm6.59-4.846c1.66.983 3.308 1.494 5.302 1.495 5.564 0 10.093-4.524 10.097-10.08-.002-2.69-1.047-5.223-2.944-7.123C17.15 1.545 14.62 1.5 11.898 1.5c-5.568 0-10.1 4.525-10.104 10.081-.001 2.003.528 3.951 1.53 5.679L2.247 21.6l4.4-1.446zm12.515-5.529c-.324-.162-1.916-.946-2.207-1.052-.293-.105-.507-.158-.718.162-.213.318-.82.1.318-1.004.1-1.03-.213.264-.315-.105-.105-.327-.162-1.921-.937-2.61-.606-.541-1.011-.893-1.011-.893s-.404.352-.607.893c-.623.689-1.503.689-1.503.689s.345.347.561.424c.732.261.345 1.503.345 1.503s.069 2.062.906 3.033c.839.972 1.83 1.529 3.013 1.81.93.22 1.854.128 2.529.028.752-.113 2.31-.944 2.633-1.856.324-.913.324-1.698.228-1.856-.097-.158-.358-.264-.683-.426z"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
