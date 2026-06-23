import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { WILAYAS_ALGERIA } from '../data';
import { X, Trash2, ShoppingBag, Truck, Check, ChevronLeft, PhoneCall } from 'lucide-react';

interface CartCheckoutDrawerProps {
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CartCheckoutDrawer: React.FC<CartCheckoutDrawerProps> = ({
  onClose,
  onOrderSuccess,
}) => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    createOrder 
  } = useStore();

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');

  // Customer checkout Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerState, setCustomerState] = useState('Sétif - 19');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const formattedTotal = new Intl.NumberFormat('ar-DZ').format(cartTotal);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) return;

    const newOrder = createOrder(
      customerName,
      customerPhone,
      customerState,
      customerAddress,
      customerNotes
    );

    onOrderSuccess(newOrder.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end" dir="rtl" id="cart-drawer">
      {/* Background click close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Main Drawer Container */}
      <div className="w-full max-w-md h-full bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col justify-between text-right shadow-2xl animate-slideLeft">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-850">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600/15 text-blue-400">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-sm sm:text-base">
                {step === 'cart' ? 'سلة المشتريات الفورية' : 'إتمام الشراء وشحن العتاد'}
              </h2>
              <p className="text-[10px] text-neutral-400 font-sans">
                {step === 'cart' ? `متبقي خطوة للتوصيل لـ 58 ولاية` : 'املأ معلوماتك ليتصل بك وكيل المبيعات'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* STEP 1: CART LISTING CONTAINER */}
        {step === 'cart' && (
          <div className="flex-grow overflow-y-auto py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-neutral-500 font-sans">
                <ShoppingBag size={48} className="text-neutral-700 mb-3" />
                <p className="font-bold text-neutral-300 text-sm">سلتك خالية تماماً!</p>
                <p className="text-[11px] text-center max-w-xs mt-1">تصفح اللابتوبات الاستيراد وإختر العتاد المناسب تالياً.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {cart.map((item, idx) => {
                  const itemPrice = new Intl.NumberFormat('ar-DZ').format(item.product.price);
                  return (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl bg-neutral-950/40 border border-neutral-850 flex gap-4 text-xs font-medium relative hover:border-blue-500/25 transition-all"
                    >
                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="absolute top-2 left-2 text-neutral-500 hover:text-red-500 transition-colors"
                        title="حذف من السلة"
                      >
                        <Trash2 size={13} />
                      </button>

                      {/* Image */}
                      <img 
                        src={item.product.images[0]} 
                        alt="" 
                        className="w-16 h-14 object-cover rounded-xl border border-neutral-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      {/* Info */}
                      <div className="flex-grow pr-1 space-y-1">
                        <span className="text-[9px] font-mono text-blue-500 uppercase tracking-widest block font-black">{item.product.brand}</span>
                        <h4 className="font-bold text-neutral-100 line-clamp-1 max-w-[190px] leading-tight">
                          {item.product.name}
                        </h4>
                        
                        <div className="flex items-center justify-between pt-1.5">
                          {/* Price */}
                          <span className="font-bold text-emerald-400">{itemPrice} د.ج</span>
                          
                          {/* Quantity control */}
                          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-850 p-1 rounded-lg">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="w-5 h-5 flex items-center justify-center hover:bg-neutral-800 text-neutral-300 rounded"
                            >
                              -
                            </button>
                            <span className="px-1 text-neutral-200 font-bold font-sans">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => {
                                if (item.quantity < item.product.countInStock) {
                                  updateCartQuantity(item.product.id, item.quantity + 1);
                                }
                              }}
                              className="w-5 h-5 flex items-center justify-center hover:bg-neutral-800 text-neutral-300 rounded"
                            >
                              +
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
        )}

        {/* STEP 2: CHECKOUT FORM CONTAINER */}
        {step === 'checkout' && (
          <form onSubmit={handleCheckoutSubmit} className="flex-grow overflow-y-auto py-4 space-y-4 text-xs">
            <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-xl text-neutral-300 leading-normal mb-2 flex items-start gap-2">
              <Truck size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <span>الدفع عند الاستلام بضمان الفحص الكامل للجهاز في الـ 58 ولاية جزائرية!</span>
            </div>

            {/* Complete Name */}
            <div>
              <label className="text-neutral-400 block mb-1">الاسم الكامل للزبون</label>
              <input
                type="text"
                required
                placeholder="الاسم واللقب كما في الهوية"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full text-right p-3 bg-neutral-950 border border-neutral-850 rounded-xl text-neutral-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Active Phone */}
            <div>
              <label className="text-neutral-400 block mb-1">رقم الهاتف النشط للتأكيد الشحن</label>
              <input
                type="text"
                required
                placeholder="مثال: 0791764469"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full text-right p-3 bg-neutral-950 border border-neutral-850 rounded-xl text-neutral-200 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Algerian Wilaya Drop down */}
              <div className="col-span-1">
                <label className="text-neutral-400 block mb-1">الولاية الجزائرية (Wilaya)</label>
                <select
                  value={customerState}
                  onChange={(e) => setCustomerState(e.target.value)}
                  className="w-full p-3 bg-neutral-950 border border-neutral-850 rounded-xl text-neutral-200 focus:outline-none"
                >
                  {WILAYAS_ALGERIA.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exact address code */}
              <div className="col-span-1">
                <label className="text-neutral-400 block mb-1">البلدية والحي بدقة</label>
                <input
                  type="text"
                  required
                  placeholder="بلدية، حي، رقم الباب"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full text-right p-3 bg-neutral-950 border border-neutral-850 rounded-xl text-neutral-200 focus:outline-none"
                />
              </div>
            </div>

            {/* Special Instructions/Remarks */}
            <div>
              <label className="text-neutral-400 block mb-1">ملاحظات تسليم خاصة (اختياري)</label>
              <textarea
                rows={2}
                placeholder="مثال: يرجى الاتصال بي قبل الشحن للتأكيد، أو الاتصال بالفترة الصباحية فقط"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full text-right p-2.5 bg-neutral-950 border border-neutral-850 rounded-xl text-neutral-200 focus:outline-none"
              />
            </div>

            {/* Visual breakdown of costs */}
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-850 text-right space-y-2 mt-4">
              <div className="flex justify-between text-neutral-400">
                <span>سعر الأجهزة الكلي:</span>
                <span className="font-sans font-bold">{formattedTotal} د.ج</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>سعر الشحن السريع (للولاية):</span>
                <span className="text-emerald-500 font-bold">بمكالمة التأكيد (حسب البعد)</span>
              </div>
              <div className="flex justify-between text-white font-bold border-t border-neutral-850 pt-2 text-xs sm:text-sm">
                <span>المبلغ المستحق الدفع (عند المعاينة):</span>
                <span className="text-base font-black text-emerald-400 font-sans">{formattedTotal} د.ج</span>
              </div>
            </div>

            {/* Back to Step 1 */}
            <button
              type="button"
              onClick={() => setStep('cart')}
              className="w-full pt-2 text-center text-[10px] text-neutral-400 hover:text-white underline"
            >
              العودة لتعديل المنتجات المضافة
            </button>
          </form>
        )}

        {/* Drawer Footer controls */}
        <div className="border-t border-neutral-850 pt-4 space-y-3">
          {step === 'cart' ? (
            <div className="space-y-3">
              {/* Core Pricing indicator before checking */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400 font-medium">المبلغ الإجمالي المستحق:</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-emerald-400">{formattedTotal}</span>
                  <span className="text-[10px] font-bold text-neutral-400">د.ج</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (cart.length > 0) {
                    setStep('checkout');
                  }
                }}
                disabled={cart.length === 0}
                className={`w-full flex items-center justify-center gap-1.5 py-3.5 bg-blue-600 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md ${
                  cart.length > 0 
                    ? 'hover:bg-blue-500 text-white shadow-blue-600/10 active:scale-95' 
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <span>الذهاب لملء معلومات التوصيل</span>
                <ChevronLeft size={16} />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-2">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="col-span-2 py-3 bg-neutral-950 border border-neutral-850 hover:bg-neutral-850 text-neutral-300 font-bold text-xs rounded-xl transition-all"
              >
                رجوع
              </button>

              <button
                type="button"
                onClick={handleCheckoutSubmit}
                disabled={!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()}
                className={`col-span-3 py-3 font-bold text-xs rounded-xl transition-all shadow-md text-center text-white ${
                  customerName.trim() && customerPhone.trim() && customerAddress.trim()
                    ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/10 active:scale-95'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                سجل طلبي وشحن الآن
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
