import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Product } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { SpecialOffers } from './components/SpecialOffers';
import { ComparisonArea } from './components/ComparisonArea';
import { AdminPanel } from './components/AdminPanel';
import { ContactForm } from './components/ContactForm';
import { FAQ } from './components/FAQ';
import { WhatsAppChat } from './components/WhatsAppChat';
import { CartCheckoutDrawer } from './components/CartCheckoutDrawer';
import { 
  Star, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Filter, 
  X, 
  SlidersHorizontal,
  ThumbsUp,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
  ShoppingBag,
  Clock,
  Undo2
} from 'lucide-react';

function StoreLayout() {
  const { 
    products, 
    reviews, 
    wishlist, 
    addToCart, 
    toggleWishlist,
    isAdminMode 
  } = useStore();

  // Navigation states
  const [activeTab, setActiveTab] = useState<string>('store');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  
  // Filtering parameters
  const [priceRange, setPriceRange] = useState<number>(300000);
  const [filterCondition, setFilterCondition] = useState<string>('الكل');

  // Modals / Drawers states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Success Checkout Code Order tracking
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);

  // Custom Toast state
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const CATEGORIES = [
    'الكل', 'حواسيب محمولة', 'حواسيب مكتبية', 'شاشات', 
    'ملحقات الحاسوب', 'لوحات المفاتيح', 'الفأرات', 'قطع الغيار', 'أجهزة الألعاب'
  ];

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Filter products based on active filters
  const filteredProducts = products.filter(prod => {
    const matchesSearch = searchQuery.trim() === '' || 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.cpu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.gpu.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'الكل' || prod.category === selectedCategory;
    const matchesPrice = prod.price <= priceRange;
    const matchesCondition = filterCondition === 'الكل' || 
      (filterCondition === 'new' && prod.condition === 'new') || 
      (filterCondition === 'used' && prod.condition === 'used');

    return matchesSearch && matchesCategory && matchesPrice && matchesCondition;
  });

  // Hot bestsellers and latest items
  const bestsellerProducts = products.filter(p => p.isBestseller).slice(0, 4);
  const latestProducts = products.filter(p => p.isNewArrival).slice(0, 4);

  const resetFilters = () => {
    setSelectedCategory('الكل');
    setPriceRange(300000);
    setFilterCondition('الكل');
    setSearchQuery('');
  };

  const handleOpenOrderModalDirectly = (prod: Product) => {
    addToCart(prod, 1);
    setIsCartOpen(true);
    triggerToast(`تم إضافة ${prod.name} إلى السلة، املأ الطلب الآن!`);
  };

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-blue-600 selection:text-white flex flex-col justify-between relative" dir="rtl">
      
      {/* Dynamic Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Floating Instant Alert Banner Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl glass-panel shadow-2xl flex items-center gap-3 animate-slideLeft text-xs text-neutral-200">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Success order confirmation checkout custom Dialog modal */}
      {successOrderId && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel-heavy text-center max-w-sm w-full space-y-4">
            <span className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 text-xl font-bold animate-bounce">
              ✓
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">تم تسجيل طلبيتك بنجاح برقم {successOrderId}!</h3>
            <p className="text-xs text-neutral-450 font-sans leading-relaxed">
              لقد سجلنا طلب شحن حاسوبك، سيتصل بك مهندس المبيعات لدينا هاتفياً للتأكيد والشحن الفوري لولايتك. نشكرك على ثقتك في Micro Tech!
            </p>
            <button
              onClick={() => setSuccessOrderId(null)}
              className="w-full py-2.5 glass-button-primary text-white rounded-xl text-xs font-bold"
            >
              مفهوم، العودة للمتجر
            </button>
          </div>
        </div>
      )}

      {/* MASTER TAB ROUTER */}
      <main className="flex-grow">
        
        {/* TAB 1: STORE / HOME */}
        {activeTab === 'store' && (
          <div className="space-y-4 animate-fadeIn">
            
            {/* Show Hero only when not filtering excessively or searching to preserve elegant flow */}
            {!searchQuery && selectedCategory === 'الكل' && filterCondition === 'الكل' && (
              <>
                <Hero 
                  onBrowseProducts={() => {
                    const el = document.getElementById('products-explore');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onContactWhatsApp={() => {
                    const url = "https://wa.me/213791764469?text=السلام%20عليكم%20محل%20Micro%20Tech،%20أريد%20الاستفسار%20عن%20الحواسيب%20المتوفرة";
                    window.open(url, '_blank');
                  }}
                />
                <Features />
              </>
            )}

            {/* PRODUCTS GALLERY ARCHITECTURE SECTION */}
            <section className="py-12" id="products-explore">
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* Advanced filter title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-white">تصفح المعرض والمخزون الحالي</h2>
                    <p className="text-xs text-neutral-400 mt-1">اضبط الفلاتر والأسعار للوصول للجهاز المناسب لميزانية الشراء الخاصة بك</p>
                  </div>

                  {/* Category badging slider */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-2 rounded-xl border shrink-0 transition-all font-semibold ${
                          selectedCategory === cat 
                            ? 'bg-blue-650/70 backdrop-blur-md border-blue-500 text-white shadow-md shadow-blue-600/20 scale-[1.02]' 
                            : 'bg-white/[0.04] backdrop-blur-md border-white/5 text-neutral-300 hover:text-white hover:bg-white/[0.08] hover:border-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filters Grid Panel HUD */}
                <div className="p-4 rounded-2xl glass-panel grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-xs font-semibold">
                  
                  {/* Filter condition */}
                  <div className="space-y-1.5 p-1">
                    <span className="text-neutral-300 block font-bold">حالة عتاد الجهاز المطلوب</span>
                    <div className="grid grid-cols-3 gap-1 bg-black/40 backdrop-blur-sm p-1 rounded-xl border border-white/5">
                      <button
                        onClick={() => setFilterCondition('الكل')}
                        className={`py-1.5 text-center rounded-lg transition-all ${filterCondition === 'الكل' ? 'bg-white/[0.08] text-white border border-white/10' : 'text-neutral-450 hover:text-white'}`}
                      >
                        الكل
                      </button>
                      <button
                        onClick={() => setFilterCondition('used')}
                        className={`py-1.5 text-center rounded-lg transition-all ${filterCondition === 'used' ? 'bg-white/[0.08] text-white border border-white/10' : 'text-neutral-450 hover:text-white'}`}
                      >
                        مستعمل
                      </button>
                      <button
                        onClick={() => setFilterCondition('new')}
                        className={`py-1.5 text-center rounded-lg transition-all ${filterCondition === 'new' ? 'bg-white/[0.08] text-white border border-white/10' : 'text-neutral-450 hover:text-white'}`}
                      >
                        جديد
                      </button>
                    </div>
                  </div>

                  {/* Slider limits */}
                  <div className="space-y-1.5 p-1 md:col-span-2">
                    <div className="flex justify-between items-center text-neutral-300 font-bold">
                      <span>الحد الأقصى للسعر بالدينار الجزائري</span>
                      <span className="text-emerald-400 font-black font-sans">{new Intl.NumberFormat('ar-DZ').format(priceRange)} د.ج</span>
                    </div>
                    <input
                      type="range"
                      min={5000}
                      max={300000}
                      step={5000}
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-blue-500 h-1.5 bg-black/40 border border-white/5 rounded-lg cursor-pointer mt-3"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-450 font-sans">
                      <span>5,000 د.ج</span>
                      <span>300,000 د.ج</span>
                    </div>
                  </div>

                  {/* Reset action triggers */}
                  <div className="flex items-end justify-end p-1">
                    {(selectedCategory !== 'الكل' || priceRange < 300000 || filterCondition !== 'الكل' || searchQuery !== '') ? (
                      <button
                        onClick={resetFilters}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 glass-button text-neutral-250 border border-white/10 rounded-xl transition-all font-bold"
                      >
                        <Undo2 size={14} />
                        <span>إعادة ضبط التصفية</span>
                      </button>
                    ) : (
                      <div className="text-[10px] text-neutral-500 text-center w-full pb-2 select-none font-sans">
                        تم تفعيل التصفية التلقائية الفورية بالكامل ✓
                      </div>
                    )}
                  </div>

                </div>
                {/* Primary products show case grid */}
                {filteredProducts.length === 0 ? (
                  <div className="p-16 text-center border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-3xl max-w-lg mx-auto mb-12">
                    <p className="font-bold text-neutral-300 mb-2">عذراً، لم نجد أي حاسوب يطابق هذه الخيارات حالياً!</p>
                    <p className="text-xs text-neutral-500 mb-6 font-sans">قد تجد طلبيتك في عتاد آخر، أو تفضل بإعادة تصفير فلاتر السعر أو كيو البحث.</p>
                    <button
                      onClick={resetFilters}
                      className="px-6 py-2.5 glass-button-primary hover:bg-blue-500 font-bold text-xs rounded-xl"
                    >
                      مزامنة وإعادة تصفير الفلاتر
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard 
                        key={product.id}
                        product={product}
                        onOpenDetails={(p) => setSelectedProduct(p)}
                        onOpenOrderModal={handleOpenOrderModalDirectly}
                      />
                    ))}
                  </div>
                )}

              </div>
            </section>

            {/* MARKETING BOOST SECTION: BESTSELLERS & TRIPLE PROMISES */}
            {searchQuery === '' && selectedCategory === 'الكل' && (
              <>
                {/* Bestsellers section container */}
                <section className="py-12 bg-transparent border-t border-white/5">
                  <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <h3 className="text-lg md:text-xl font-black mb-6 border-r-4 border-blue-500 pr-3 text-right">الأجهزة الأكثر مبيعاً وتقييماً</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {bestsellerProducts.map((prod) => (
                        <div 
                          key={prod.id} 
                          onClick={() => setSelectedProduct(prod)}
                          className="p-4 rounded-2xl glass-card transition-all cursor-pointer text-right group animate-fadeIn"
                        >
                          <img src={prod.images[0]} alt="" className="w-full aspect-video object-cover rounded-xl mb-3" referrerPolicy="no-referrer" />
                          <span className="text-[9px] font-mono text-blue-400 block uppercase font-bold">{prod.brand}</span>
                          <h4 className="font-bold font-sans text-xs text-neutral-200 group-hover:text-blue-400 line-clamp-1 truncate mt-0.5">{prod.name}</h4>
                          <span className="text-xs font-black text-emerald-400 mt-2 block">
                            {new Intl.NumberFormat('ar-DZ').format(prod.price)} د.ج
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Testimonials Carousel آراء العملاء */}
                <section className="py-16 bg-transparent border-t border-white/5">
                  <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
                    <div className="max-w-xl mx-auto mb-12">
                      <h2 className="text-xl sm:text-2xl font-black text-white mb-2">آراء وتقييمات عملائنا الحاضرين</h2>
                      <p className="text-xs text-neutral-450 font-sans leading-normal">نسعد بخدمتكم في الـ 58 ولاية، وهذه انطباعات بعض الزبائن بعد معاينة طرودهم واستلام حواسيبهم.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {reviews.slice(0, 3).map((rev, idx) => (
                        <div 
                          key={idx}
                          className="p-6 rounded-2xl glass-card text-right flex flex-col justify-between"
                          id={`testimonial-item-${idx}`}
                        >
                          <div>
                            {/* Stars rating */}
                            <div className="flex text-amber-500 gap-0.5 mb-3.5">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} size={13} className="fill-current" />
                              ))}
                            </div>
                            <p className="text-neutral-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                              "{rev.comment}"
                            </p>
                          </div>
                          
                          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-450">
                            <span className="font-bold">{rev.userName}</span>
                            <span className="text-emerald-400 font-medium">✓ مشترٍ مؤكد بضمان المحل</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* FAQ container */}
                <FAQ />
              </>
            )}

          </div>
        )}

        {/* TAB 2: SPECIAL OFFERS */}
        {activeTab === 'offers' && (
          <SpecialOffers 
            onOpenDetails={(p) => setSelectedProduct(p)}
            onOpenOrder={(p) => handleOpenOrderModalDirectly(p)}
            onOpenOrderModal={handleOpenOrderModalDirectly}
          />
        )}

        {/* TAB 3: CONTACT & ABOUT US */}
        {activeTab === 'about' && (
          <ContactForm />
        )}

        {/* TAB 4: ADMIN MODULE */}
        {activeTab === 'admin' && isAdminMode && (
          <AdminPanel />
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-12 text-neutral-400 text-xs text-right mt-12" id="store-footer" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-sans font-bold text-lg text-white">MICRO <span className="text-blue-500">TECH</span></h4>
            <p className="text-neutral-400 font-sans leading-relaxed">
              تخصصنا وخبرتنا في بيع وتأمين أرقى اللابتوبات والحواسيب الاستيراد من أوروبا في الجزائر بأسعار لا تتردد وضمان موثق.
            </p>
            <p className="text-[11px] text-neutral-500">نهج مكتبة ثانوية هواري بومدين، برهوم، الجزائر.</p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="font-bold text-neutral-200">الأقسام والتصنيفات</h5>
            <ul className="space-y-1.5 text-neutral-400 text-[11px]">
              <li><button onClick={() => { setSelectedCategory('حواسيب محمولة'); setActiveTab('store'); }} className="hover:text-white transition-colors">حواسيب محمولة (Laptops)</button></li>
              <li><button onClick={() => { setSelectedCategory('حواسيب مكتبية'); setActiveTab('store'); }} className="hover:text-white transition-colors">حواسيب مكتبية (Desktops)</button></li>
              <li><button onClick={() => { setSelectedCategory('شاشات'); setActiveTab('store'); }} className="hover:text-white transition-colors">شاشات عرض ديل (Monitors)</button></li>
              <li><button onClick={() => { setSelectedCategory('لوحات المفاتيح'); setActiveTab('store'); }} className="hover:text-white transition-colors">مستلزمات وملحقات الجيمنج</button></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="font-bold text-neutral-200">الروابط السريعة</h5>
            <ul className="space-y-1.5 text-neutral-400 text-[11px]">
              <li><button onClick={() => setActiveTab('store')} className="hover:text-white transition-colors">الكل بالمتجر</button></li>
              <li><button onClick={() => setActiveTab('offers')} className="hover:text-white transition-colors">العروض الفلاشية</button></li>
              <li><button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">من نحن ومقر المحل</button></li>
              <li><a href="tel:213791764469" className="hover:text-white transition-colors flex items-center gap-1">📞 اتصل: 0791 76 44 69</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3 p-4 bg-neutral-900/35 border border-neutral-850 rounded-2xl">
            <h5 className="font-bold text-neutral-200 text-[11px]">الامتياز التجاري</h5>
            <p className="text-[10px] text-neutral-450 text-neutral-400 leading-normal font-sans">
              يتم تغليف حاسوبك الكابا بثلاث ورقات حماية عازلة للصدمات وشحنها عبر يالدين للتوصيل الآمن لكافة الولايات الجزائرية.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-550 text-neutral-550 text-neutral-400 text-[11px]">
          <span>© 2026 Micro Tech Berhoum - جميع الحقوق محفوظة لمستوردي لابتوبات الكابا الأوروبية</span>
          <span>تصميم تقني احترافي لمتجر حواسيب الجزائر</span>
        </div>
      </footer>

      {/* WHATSAPP SUPPORT CHAT FLAVOR BUTTON */}
      <WhatsAppChat />

      {/* DETAILED PRODUCT SPECS MODAL WINDOW */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenOrder={handleOpenOrderModalDirectly}
        />
      )}

      {/* SHOPPING CART AND DELIVERY DETAILED CHECKOUT FORM */}
      {isCartOpen && (
        <CartCheckoutDrawer 
          onClose={() => setIsCartOpen(false)}
          onOrderSuccess={(orderId) => {
            setSuccessOrderId(orderId);
            triggerToast(`تهانينا! طلبيتك رقم ${orderId} قد سُجلت بالمחל وسيتصل بك الفني لتأكيد التوصيل.`);
          }}
        />
      )}

      {/* WISHLIST SIDEBAR DRAWER OVERLAY (المفضلة) */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end" dir="rtl" id="wishlist-drawer">
          <div className="absolute inset-0 -z-10" onClick={() => setIsWishlistOpen(false)} />
          <div className="w-full max-w-sm h-full bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col justify-between text-right shadow-2xl animate-slideLeft">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-850">
                <h3 className="font-extrabold text-white">قائمة الأجهزة المفضلة</h3>
                <button onClick={() => setIsWishlistOpen(false)} className="p-1 text-neutral-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              {/* Wishlist items content */}
              <div className="py-4 space-y-4 max-h-[75vh] overflow-y-auto">
                {wishlist.length === 0 ? (
                  <div className="p-12 text-center text-neutral-500 text-xs font-sans">
                    لا توجد أجهزة مفضلة محفوظة حالياً!
                  </div>
                ) : (
                  wishlist.map(item => (
                    <div key={item.id} className="p-3 bg-black/40 rounded-xl border border-white/5 flex gap-4 text-xs">
                      <img src={item.images[0]} alt="" className="w-12 h-10 object-cover rounded-lg border border-white/10" referrerPolicy="no-referrer" />
                      <div className="flex-grow space-y-1">
                        <h4 className="font-bold text-neutral-100 truncate max-w-[150px]">{item.name}</h4>
                        <span className="font-bold text-emerald-400 text-[11px] block">{new Intl.NumberFormat('ar-DZ').format(item.price)} د.ج</span>
                      </div>
                      <div className="flex flex-col gap-2 justify-center">
                        <button
                          onClick={() => {
                            addToCart(item, 1);
                            triggerToast(`تم إرسال ${item.name} لسلتك!`);
                          }}
                          className="px-2 py-1 glass-button-primary text-white font-bold text-[10px] rounded"
                        >
                          شراء
                        </button>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="text-[9px] text-neutral-400 hover:text-red-500"
                        >
                          إزالة
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full py-2.5 glass-button text-neutral-300 border border-white/10 text-xs rounded-xl"
            >
              العودة للتصفح المعرض
            </button>
          </div>
        </div>
      )}

      {/* COMPARISON AREA POPUP */}
      {isCompareOpen && (
        <ComparisonArea 
          onClose={() => setIsCompareOpen(false)}
          onOpenDetails={(p) => setSelectedProduct(p)}
          onOpenOrder={handleOpenOrderModalDirectly}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreLayout />
    </StoreProvider>
  );
}
