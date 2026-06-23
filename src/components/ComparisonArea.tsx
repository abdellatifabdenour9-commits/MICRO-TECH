import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Battery, Cpu, Database, Info, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ComparisonAreaProps {
  onClose: () => void;
  onOpenOrder: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
}

export const ComparisonArea: React.FC<ComparisonAreaProps> = ({
  onClose,
  onOpenOrder,
  onOpenDetails,
}) => {
  const { compareList, toggleCompare } = useStore();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn" dir="rtl" id="comparison-area">
      <div className="w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative my-8">
        
        {/* Header toolbar */}
        <div className="p-5 border-b border-neutral-850 flex items-center justify-between bg-neutral-950">
          <div>
            <h2 className="text-lg font-extrabold text-white">مقارنة العتاد والحواسيب الذكية</h2>
            <p className="text-xs text-neutral-400">قارن بين مواصفات وقيم الأجهزة المعروضة لتسهيل اختيارك الأفضل</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Comparison Body */}
        {compareList.length === 0 ? (
          <div className="p-16 text-center text-neutral-500 text-xs sm:text-sm font-sans">
            <Info size={36} className="mx-auto text-blue-500/50 mb-3" />
            <p className="mb-2 text-neutral-300 font-bold">قائمة مقارنة العتاد فارغة!</p>
            <p className="max-w-xs mx-auto text-xs">اضغط على زر <span className="inline-flex p-1 bg-neutral-800 text-blue-400 rounded-lg"><Trash2 size={12} className="rotate-180" /></span> المتواجد على كل بطاقة منتج لإضافته ومقارنة تفاصيله عتادياً.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Scroll indicator for smartphones */}
            <div className="sm:hidden text-center py-2 bg-blue-600/10 text-blue-400 border-b border-blue-600/20 text-[10px] font-bold">
              ← اسحب الجدول لليمين أو اليسار لمشاهدة بقية الأجهزة →
            </div>

            <table className="w-full table-auto text-right text-xs">
              <thead className="bg-neutral-950/40">
                <tr className="border-b border-neutral-850">
                  <th className="p-4 font-bold text-neutral-400 w-40 min-w-[124px] bg-neutral-950/80">المواصفات الأساسية</th>
                  {compareList.map(prod => (
                    <th key={prod.id} className="p-4 text-center min-w-[180px] border-r border-neutral-850 align-top relative">
                      {/* Delete icon */}
                      <button
                        onClick={() => toggleCompare(prod)}
                        className="absolute top-2 left-2 p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-500 hover:bg-neutral-950 transition-colors"
                        title="حذف من المقارنة"
                      >
                        <Trash2 size={13} />
                      </button>

                      {/* Micro card */}
                      <div className="mt-4 flex flex-col items-center">
                        <img 
                          src={prod.images[0]} 
                          alt="" 
                          className="w-20 aspect-[4/3] object-cover rounded-lg border border-neutral-800 mb-2"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[10px] font-mono text-blue-500 font-black">{prod.brand.toUpperCase()}</span>
                        <h4 className="font-bold text-neutral-100 hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer max-w-[160px] text-center" onClick={() => onOpenDetails(prod)}>
                          {prod.name}
                        </h4>
                        <span className="text-emerald-400 font-black font-sans mt-1">
                          {new Intl.NumberFormat('ar-DZ').format(prod.price)} د.ج
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850">
                {/* Condition row */}
                <tr>
                  <td className="p-4 font-bold text-neutral-400 bg-neutral-950/20">حالة الجهاز</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-4 text-center border-r border-neutral-850">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${prod.condition === 'new' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-neutral-850 text-neutral-300'}`}>
                        {prod.condition === 'new' ? 'جديد رسمي في العلبة' : 'مستورد أوروبي نظيف جداً'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* CPU row */}
                <tr>
                  <td className="p-4 font-bold text-neutral-400 bg-neutral-950/20">المعالج الرئيسي (CPU)</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-4 text-center border-r border-neutral-850 text-neutral-200 font-medium">
                      <div className="flex flex-col items-center gap-1">
                        <Cpu size={14} className="text-neutral-500" />
                        <span className="font-sans text-[11px] leading-tight">{prod.cpu}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* RAM row */}
                <tr>
                  <td className="p-4 font-bold text-neutral-400 bg-neutral-950/20">الذاكرة العشوائية (RAM)</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-4 text-center border-r border-neutral-850 text-neutral-200 font-sans font-medium">
                      <div className="flex flex-col items-center gap-1">
                        <Database size={14} className="text-neutral-500" />
                        <span>{prod.ram}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Storage row */}
                <tr>
                  <td className="p-4 font-bold text-neutral-400 bg-neutral-950/20">التخزين (Storage)</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-4 text-center border-r border-neutral-850 text-neutral-200 font-sans font-bold">
                      {prod.storage}
                    </td>
                  ))}
                </tr>

                {/* GPU row */}
                <tr>
                  <td className="p-4 font-bold text-neutral-400 bg-neutral-950/20">كرت الشاشة (GPU)</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-4 text-center border-r border-neutral-850 text-neutral-300 font-sans text-[11px]">
                      {prod.gpu}
                    </td>
                  ))}
                </tr>

                {/* Screen row */}
                <tr>
                  <td className="p-4 font-bold text-neutral-400 bg-neutral-950/20">مقاس ودقة الشاشة</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-4 text-center border-r border-neutral-850 text-neutral-300">
                      {prod.screen || '14" FHD IPS'}
                    </td>
                  ))}
                </tr>

                {/* Battery health row */}
                <tr>
                  <td className="p-4 font-bold text-neutral-400 bg-neutral-950/20">حالة صحة البطارية</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-4 text-center border-r border-neutral-850 text-neutral-200">
                      <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold">
                        <Battery size={13} fill="currentColor" />
                        <span>{prod.batteryHealth || 'معاينة تامة في المحل'}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Stock row */}
                <tr>
                  <td className="p-4 font-bold text-neutral-400 bg-neutral-950/20">المخزون المتوفر</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-4 text-center border-r border-neutral-850">
                      <span className={prod.countInStock > 0 ? 'text-emerald-500 font-bold' : 'text-neutral-500'}>
                        {prod.countInStock > 0 ? `متوفر (${prod.countInStock} أجهزة)` : 'غير متوفر'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Actions row */}
                <tr className="bg-neutral-950/10">
                  <td className="p-4 font-bold text-neutral-400 bg-neutral-950/20 border-b-0">اتخاذ إجراء</td>
                  {compareList.map(prod => (
                    <td key={prod.id} className="p-4 text-center border-r border-neutral-850 border-b-0">
                      <div className="flex flex-col gap-2 max-w-[160px] mx-auto">
                        <button
                          onClick={() => {
                            if (prod.countInStock > 0) {
                              onClose();
                              onOpenOrder(prod);
                            }
                          }}
                          disabled={prod.countInStock === 0}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                            prod.countInStock > 0 
                              ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                              : 'bg-neutral-850 text-neutral-500 cursor-not-allowed'
                          }`}
                        >
                          شراء سريع
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onOpenDetails(prod);
                          }}
                          className="w-full py-2 px-3 bg-neutral-950 border border-neutral-800 hover:bg-neutral-850 text-neutral-300 text-[11px] font-semibold rounded-xl"
                        >
                          تصفح المعرض
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};
