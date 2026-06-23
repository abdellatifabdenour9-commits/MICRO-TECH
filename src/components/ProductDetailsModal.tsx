import React, { useState } from 'react';
import { Product, Review } from '../types';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  MessageSquare, 
  Battery, 
  Cpu, 
  Database, 
  Tv, 
  ShieldCheck, 
  Star, 
  ShoppingBag, 
  Calendar,
  Send
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onOpenOrder: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onOpenOrder,
}) => {
  const { reviews, addReview } = useStore();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Review submission state
  const [username, setUsername] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const productReviews = reviews.filter(r => r.productId === product.id);

  const formattedPrice = new Intl.NumberFormat('ar-DZ').format(product.price);
  const formattedOriginalPrice = product.originalPrice 
    ? new Intl.NumberFormat('ar-DZ').format(product.originalPrice) 
    : null;

  // Build a custom WhatsApp url message
  const buildWhatsAppUrl = () => {
    const phoneNumber = "213791764469"; // Store owner Algerian number 0791 76 44 69
    const text = `السلام عليكم محل Micro Tech، أريد الاستفسار عن أو طلب هذا الجهاز:
*الجهاز:* ${product.name}
*المواصفات الأساسية:*
- المعالج: ${product.cpu}
- الرام: ${product.ram}
- التخزين: ${product.storage}
- كرت الشاشة: ${product.gpu}
- حالة البطارية: ${product.batteryHealth || 'معاينة تامة'}
- السعر: ${formattedPrice} د.ج
أرجو التواصل لتأكيد التوصيل وشكراً!`;
    
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !comment.trim()) return;

    addReview(product.id, username, userRating, comment);
    setUsername('');
    setComment('');
    setUserRating(5);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn" dir="rtl" id="details-modal">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header/Close bar */}
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-neutral-950/80 border border-neutral-800 text-neutral-400 hover:text-white transition-all hover:rotate-90"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Right Column: Interactive Gallery */}
          <div className="p-6 bg-neutral-950 flex flex-col gap-4 border-l border-neutral-850">
            {/* Active Image frame */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-neutral-900 overflow-hidden border border-neutral-800 relative">
              <img
                src={product.images[activeImageIdx] || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600'}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 rounded-lg text-[10px] font-mono text-neutral-300">
                {activeImageIdx + 1} / {product.images.length}
              </span>
            </div>

            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx ? 'border-blue-500 scale-102' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Core Badges on specs */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-850 text-right">
                <span className="text-[10px] text-neutral-400 block mb-1">حالة البطارية الأساسية</span>
                <div className="flex items-center gap-1.5 text-xs text-neutral-200">
                  <Battery size={14} className="text-emerald-500 animate-pulse" />
                  <span className="font-bold">{product.batteryHealth || 'فوق 90% (ممتازة)'}</span>
                </div>
              </div>
              <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-850 text-right">
                <span className="text-[10px] text-neutral-400 block mb-1">المصدر والحالة</span>
                <div className="flex items-center gap-1.5 text-xs text-neutral-200">
                  <ShieldCheck size={14} className="text-blue-500" />
                  <span className="font-bold">{product.condition === 'new' ? 'جديد رسمي في العلبة' : 'مستورد أوروبي شبه جديد'}</span>
                </div>
              </div>
            </div>
            
            {/* Algerian Delivery & Warranty Info */}
            <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-850 text-xs text-neutral-300 leading-relaxed font-sans space-y-2">
              <p className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                شروط ومعلومات الشراء:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-400 pr-2">
                <li>ضمان محل موثق من <b>3 إلى 6 أشهر</b> شامل للقطع الأساسية.</li>
                <li>توصيل يالدين متاح لـ <b>58 ولاية</b> (يتراوح بين 24 إلى 48 ساعة).</li>
                <li><b>افحص حاسوبك تماماً</b> قبل دفع الفلس لضمان الشفافية التامة.</li>
              </ul>
            </div>
          </div>

          {/* Left Column: Specs Details, WhatsApp trigger & reviews */}
          <div className="p-6 overflow-y-auto max-h-[85vh] lg:max-h-[90vh]">
            {/* Title & Brand */}
            <div className="mb-4">
              <span className="text-xs font-bold text-blue-550 text-blue-400 uppercase tracking-widest font-mono">
                {product.brand} COMPUTER CO.
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1 leading-snug">
                {product.name}
              </h2>
            </div>

            {/* Ratings and reviews indicators */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={15} 
                    className={i < Math.round(product.rating) ? "fill-current" : "text-neutral-700"} 
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-300">{product.rating}</span>
              <span className="text-neutral-500 text-xs">•</span>
              <span className="text-xs text-neutral-400">({productReviews.length} تقييم حقيقي)</span>
            </div>

            {/* Pricing Tag Panel */}
            <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-850 flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] text-neutral-500 block">السعر الحالي بالدينار الجزائري</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-2xl font-black text-emerald-400">{formattedPrice}</span>
                  <span className="text-xs font-bold text-neutral-400">د.ج</span>
                </div>
              </div>
              {formattedOriginalPrice && (
                <div className="text-left font-sans">
                  <span className="text-xs text-neutral-500 line-through block">{formattedOriginalPrice} د.ج</span>
                  <span className="text-[10px] font-black bg-red-600/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-lg mt-0.5 block text-center">
                    توفير {new Intl.NumberFormat('ar-DZ').format(product.originalPrice! - product.price)} د.ج
                  </span>
                </div>
              )}
            </div>

            {/* core technical quick parameters */}
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-bold text-neutral-200 border-r-2 border-blue-500 pr-2">المواصفات الرئيسية</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-950/30 rounded-xl space-y-1">
                  <span className="text-neutral-500 text-[10px] flex items-center gap-1">CPU <Cpu size={10} /></span>
                  <p className="font-bold text-neutral-200 truncate" title={product.cpu}>{product.cpu}</p>
                </div>
                <div className="p-3 bg-neutral-950/30 rounded-xl space-y-1">
                  <span className="text-neutral-500 text-[10px] flex items-center gap-1">RAM <Database size={10} /></span>
                  <p className="font-bold text-neutral-200 truncate">{product.ram}</p>
                </div>
                <div className="p-2.5 bg-neutral-950/30 rounded-xl space-y-1">
                  <span className="text-neutral-500 text-[10px] flex items-center gap-1">GPU <Cpu size={10} /></span>
                  <p className="font-bold text-neutral-200 truncate" title={product.gpu}>{product.gpu}</p>
                </div>
                <div className="p-2.5 bg-neutral-950/30 rounded-xl space-y-1">
                  <span className="text-neutral-500 text-[10px] flex items-center gap-1">Screen <Tv size={10} /></span>
                  <p className="font-bold text-neutral-200 truncate">{product.screen || '14" FHD IPS'}</p>
                </div>
              </div>
            </div>

            {/* Custom Specs items */}
            {product.specs && product.specs.length > 0 && (
              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-bold text-neutral-200 border-r-2 border-blue-500 pr-2">معلومات العتاد التفصيلية</h3>
                <div className="border border-neutral-850 rounded-2xl overflow-hidden text-xs">
                  {product.specs.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`grid grid-cols-12 p-3 ${idx % 2 === 0 ? 'bg-neutral-950/30' : 'bg-neutral-900/50'} border-b border-neutral-850/40 last:border-0`}
                    >
                      <span className="col-span-4 text-neutral-500 font-bold">{item.label}</span>
                      <span className="col-span-8 text-neutral-200 font-sans">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description Paragraph */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-neutral-200 mb-2 border-r-2 border-blue-500 pr-2">وصف العتاد العام</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans pr-2">
                {product.description}
              </p>
            </div>

            {/* Ordering CTA triggers */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-600/10 active:scale-95 text-center"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.894 0c3.18 0 6.171 1.242 8.413 3.496C22.548 5.75 23.8 8.749 23.8 11.933c-.004 6.57-5.328 11.894-11.895 11.894-1.996-.001-3.957-.502-5.713-1.455L0 24zm6.59-4.846c1.66.983 3.308 1.494 5.302 1.495 5.564 0 10.093-4.524 10.097-10.08-.002-2.69-1.047-5.223-2.944-7.123C17.15 1.545 14.62 1.5 11.898 1.5c-5.568 0-10.1 4.525-10.104 10.081-.001 2.003.528 3.951 1.53 5.679L2.247 21.6l4.4-1.446zm12.515-5.529c-.324-.162-1.916-.946-2.207-1.052-.293-.105-.507-.158-.718.162-.213.318-.82.1.318-1.004.1-1.03-.213.264-.315-.105-.105-.327-.162-1.921-.937-2.61-.606-.541-1.011-.893-1.011-.893s-.404.352-.607.893c-.623.689-1.503.689-1.503.689s.345.347.561.424c.732.261.345 1.503.345 1.503s.069 2.062.906 3.033c.839.972 1.83 1.529 3.013 1.81.93.22 1.854.128 2.529.028.752-.113 2.31-.944 2.633-1.856.324-.913.324-1.698.228-1.856-.097-.158-.358-.264-.683-.426z"/>
                </svg>
                <span>استفسار / طلب عبر واتساب</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenOrder(product);
                }}
                disabled={product.countInStock === 0}
                className={`py-3 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg active:scale-95 text-center ${
                  product.countInStock > 0 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/10' 
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed shadow-none'
                }`}
              >
                <span>شراء سريع وملء التوصيل</span>
              </button>
            </div>

            {/* Customer reviews display section */}
            <div className="border-t border-neutral-850 pt-6 space-y-6">
              <h3 className="text-sm font-bold text-neutral-200 border-r-2 border-blue-500 pr-2">تقييمات وآراء العملاء</h3>

              {/* Reviews List */}
              {productReviews.length === 0 ? (
                <div className="p-4 rounded-xl text-center bg-neutral-950/20 text-neutral-500 text-xs">
                  لا توجد تقييمات مضافة لهذا المنتج حالياً. كن أول من يضيف تجربة شرائه!
                </div>
              ) : (
                <div className="space-y-3">
                  {productReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-neutral-950/30 border border-neutral-850 text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-neutral-200">{rev.userName}</span>
                        <div className="flex text-amber-500 gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={11} 
                              className={i < rev.rating ? "fill-current" : "text-neutral-850"} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-neutral-400 font-sans leading-relaxed mb-1 pr-1">{rev.comment}</p>
                      <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-2 border-t border-neutral-850/40 pt-1.5">
                        <span className="text-emerald-500 font-medium">✓ مشترٍ مؤكد بضمان المحل</span>
                        <span className="font-mono flex items-center gap-1">
                          <Calendar size={10} />
                          {rev.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Leave review form */}
              <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-neutral-950/50 border border-neutral-850 space-y-3.5 text-xs">
                <span className="font-bold text-neutral-300 block mb-1">أضف تقييمك وتجربتك مع الجهاز</span>
                
                {successMsg && (
                  <div className="p-2 text-center text-[11px] rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    تم إرسال تقييمك بنجاح وسيتعدل متوسط التقييم للجهاز فوراً!
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">الاسم والولاية</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: صالح من بسكرة"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">تقييمك بالنجوم</label>
                    <select
                      value={userRating}
                      onChange={(e) => setUserRating(Number(e.target.value))}
                      className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5 ممتاز)</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5 جيد جداً)</option>
                      <option value={3}>⭐⭐⭐ (3/5 مقبول)</option>
                      <option value={2}>⭐⭐ (2/5 سيء)</option>
                      <option value={1}>⭐ (1/5 سيء جداً)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">تعليقك وتجربتك</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="اكتب تجربتك مع كفاءة المعالج، البطارية، أو المعاملة بالمحل..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200 placeholder-neutral-650 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-750 hover:text-white transition-all font-bold"
                >
                  <Send size={12} />
                  <span>إرسال التقييم الآن</span>
                </button>
              </form>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
