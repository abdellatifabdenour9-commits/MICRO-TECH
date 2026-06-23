import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Product, Order } from '../types';
import { WILAYAS_ALGERIA } from '../data';
import { PERMISSIONS } from '../authRoles';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Search, 
  Filter, 
  Loader2, 
  DollarSign,
  Briefcase,
  AlertTriangle,
  RotateCcw,
  Lock,
  AlertCircle
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  // Security Check
  const { user, isAdmin, hasPermission } = useAuth();
  
  if (!user || !isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-600/20 rounded-full border border-red-600/40">
                <Lock size={32} className="text-red-500" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              وصول مرفوض
            </h1>
            
            <p className="text-neutral-400 mb-6">
              هذه اللوحة مخصصة للمسؤولين فقط
            </p>

            <div className="flex items-gap-2 bg-amber-600/10 border border-amber-600/40 rounded-lg p-4 mb-6">
              <AlertCircle size={20} className="text-amber-500 flex-shrink-0 ml-3" />
              <p className="text-sm text-amber-200">
                لا يمكنك الوصول إلى هذه الصفحة
              </p>
            </div>

            <a
              href="/"
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-block"
            >
              العودة للرئيسية
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  const { 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus 
  } = useStore();

  const [activeTab, setActiveTab2] = useState<'stats' | 'inventory' | 'orders' | 'customers'>('stats');

  // Search and general filtering states
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Editing/Adding fields state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formCategory, setFormCategory] = useState('حواسيب محمولة');
  const [formPrice, setFormPrice] = useState(50000);
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formCondition, setFormCondition] = useState<'new' | 'used'>('used');
  const [formBattery, setFormBattery] = useState('95% ممتازة');
  const [formCpu, setFormCpu] = useState('');
  const [formRam, setFormRam] = useState('');
  const [formStorage, setFormStorage] = useState('');
  const [formGpu, setFormGpu] = useState('');
  const [formScreen, setFormScreen] = useState('14" FHD IPS');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formStock, setFormStock] = useState(5);

  const CATEGORIES = [
    'حواسيب محمولة', 'حواسيب مكتبية', 'شاشات', 'ملحقات الحاسوب', 
    'لوحات المفاتيح', 'الفأرات', 'قطع الغيار', 'أجهزة الألعاب'
  ];

  // 1. Core computations for stats
  const totalSales = orders
    .filter(o => o.status === 'completed' || o.status === 'confirmed' || o.status === 'shipped')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const pendingSales = orders
    .filter(o => o.status === 'pending')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const completedOrdersCount = orders.filter(o => o.status === 'completed').length;
  const processedOrdersCount = orders.filter(o => o.status !== 'cancelled').length;
  const productsCount = products.length;
  const lowStockCount = products.filter(p => p.countInStock <= 2).length;

  // Compute category distributions
  const categoryStats = CATEGORIES.map(cat => {
    const matchingProducts = products.filter(p => p.category === cat);
    const stockTotal = matchingProducts.reduce((sum, p) => sum + p.countInStock, 0);
    return {
      name: cat,
      count: matchingProducts.length,
      stock: stockTotal
    };
  });

  // Unique Customers compilation
  const customers = React.useMemo(() => {
    const customerMap: { [phone: string]: { name: string, phone: string, state: string, address: string, totalSpent: number, ordersCount: number } } = {};
    
    orders.forEach(order => {
      const normalizedPhone = order.customerPhone.trim();
      if (customerMap[normalizedPhone]) {
        customerMap[normalizedPhone].totalSpent += order.status !== 'cancelled' ? order.totalPrice : 0;
        customerMap[normalizedPhone].ordersCount += 1;
      } else {
        customerMap[normalizedPhone] = {
          name: order.customerName,
          phone: order.customerPhone,
          state: order.customerState,
          address: order.customerAddress,
          totalSpent: order.status !== 'cancelled' ? order.totalPrice : 0,
          ordersCount: 1
        };
      }
    });

    return Object.values(customerMap);
  }, [orders]);

  // Handle Form triggers
  const handleAddNewTrigger = () => {
    setFormName('');
    setFormBrand('');
    setFormCategory('حواسيب محمولة');
    setFormPrice(65000);
    setFormOriginalPrice('');
    setFormCondition('used');
    setFormBattery('93% ممتازة');
    setFormCpu('Intel Core i5-11th Gen');
    setFormRam('16 GB DDR4');
    setFormStorage('512 GB NVMe SSD');
    setFormGpu('Intel Iris Xe Graphics');
    setFormScreen('14" FHD IPS 1080p');
    setFormDesc('لابتوب عملي مستورد نظيف جداً.');
    setFormImage('https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600');
    setFormStock(5);
    setEditingProduct(null);
    setIsAdding(true);
  };

  const handleEditTrigger = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormBrand(prod.brand);
    setFormCategory(prod.category);
    setFormPrice(prod.price);
    setFormOriginalPrice(prod.originalPrice ? String(prod.originalPrice) : '');
    setFormCondition(prod.condition);
    setFormBattery(prod.batteryHealth || '');
    setFormCpu(prod.cpu);
    setFormRam(prod.ram);
    setFormStorage(prod.storage);
    setFormGpu(prod.gpu);
    setFormScreen(prod.screen || '');
    setFormDesc(prod.description);
    setFormImage(prod.images[0] || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600');
    setFormStock(prod.countInStock);
    setIsAdding(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedOriginalPrice = formOriginalPrice ? Number(formOriginalPrice) : undefined;
    
    // Construct default specs array based on current fields
    const defaultSpecs = [
      { label: 'المعالج', value: formCpu },
      { label: 'الذاكرة العشوائية', value: formRam },
      { label: 'التخزين', value: formStorage },
      { label: 'كرت الشاشة', value: formGpu },
      { label: 'الشاشة', value: formScreen },
      { label: 'البطارية', value: formBattery },
    ];

    const prodData = {
      name: formName,
      brand: formBrand || 'General',
      category: formCategory,
      price: Number(formPrice),
      originalPrice: parsedOriginalPrice,
      condition: formCondition,
      batteryHealth: formBattery,
      cpu: formCpu,
      ram: formRam,
      storage: formStorage,
      gpu: formGpu,
      screen: formScreen,
      description: formDesc,
      images: [formImage],
      countInStock: Number(formStock),
      specs: defaultSpecs
    };

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...prodData
      });
      setEditingProduct(null);
    } else {
      addProduct(prodData);
      setIsAdding(false);
    }
  };

  // Filter products list in table
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.includes(productSearch)
  );

  // Filter orders in table
  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerPhone.includes(orderSearch) ||
    o.customerState.includes(orderSearch) ||
    o.id.includes(orderSearch)
  );

  return (
    <div className="py-8 bg-neutral-950 text-white min-h-[80vh]" dir="rtl" id="admin-panel">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Page title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Package className="text-blue-500" />
              <span>لوحة تحكم وإدارة Micro Tech</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-1">تتبع المبيعات، وإدارة مستويات المخزون، والمنتجات، وطلبات العملاء الحية</p>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-semibold bg-neutral-900/60 p-1 rounded-xl border border-neutral-850">
            <button
              onClick={() => setActiveTab2('stats')}
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'stats' ? 'bg-blue-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'}`}
            >
              مؤشرات المبيعات
            </button>
            <button
              onClick={() => setActiveTab2('inventory')}
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'inventory' ? 'bg-blue-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'}`}
            >
              إدارة المخزون ({products.length})
            </button>
            <button
              onClick={() => setActiveTab2('orders')}
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'}`}
            >
              إدارة الطلبات ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab2('customers')}
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'customers' ? 'bg-blue-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'}`}
            >
              قائمة العملاء ({customers.length})
            </button>
          </div>
        </div>

        {/* 1. SALES STATISTICS TAB */}
        {activeTab === 'stats' && (
          <div className="space-y-8 animate-fadeIn" id="stats-tab">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-850">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold mb-1">إجمالي المبيعات المؤكدة</span>
                <span className="text-2xl font-black text-emerald-400">
                  {new Intl.NumberFormat('ar-DZ').format(totalSales)} <span className="text-xs font-bold text-neutral-400">د.ج</span>
                </span>
                <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>تم شحنها أو تأكيدها</span>
                  <span className="text-emerald-500 font-bold">↑ 12% هذا الأسبوع</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-850">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold mb-1">طلبات قيد الانتظار لم تؤكد</span>
                <span className="text-2xl font-black text-amber-500">
                  {new Intl.NumberFormat('ar-DZ').format(pendingSales)} <span className="text-xs font-bold text-neutral-400">د.ج</span>
                </span>
                <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>بانتظار مكالمات التأكيد</span>
                  <span className="text-amber-500 font-bold">{orders.filter(o => o.status === 'pending').length} طلبات</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-850">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold mb-1">إجمالي الأجهزة المعروضة</span>
                <span className="text-2xl font-black text-blue-400">
                  {productsCount} <span className="text-xs font-bold text-neutral-450 text-neutral-400">تجميعة / لابتوب</span>
                </span>
                <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>مجموع التبويبات والمخزن</span>
                  <span>{products.reduce((acc, current) => acc + current.countInStock, 0)} قطعة مخزنة</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-850">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold mb-1">حالة العجز / نفاد المخزون</span>
                <span className={`text-2xl font-black ${lowStockCount > 0 ? 'text-red-500' : 'text-emerald-400'}`}>
                  {lowStockCount} <span className="text-xs font-bold text-neutral-400">قطع تحت الخطر</span>
                </span>
                <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>القطع المتبقي منها آحاد</span>
                  <span>تصفح إدارة المنتجات لإرسال التنبيه</span>
                </div>
              </div>
            </div>

            {/* Sales trend Interactive SVG Area Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Sales graph mock (High quality robust custom SVG) */}
              <div className="lg:col-span-8 p-6 rounded-3xl bg-neutral-900/30 border border-neutral-800">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-bold text-white">منحنى المبيعات ربع السنوي 2026</h3>
                    <p className="text-[10px] text-neutral-500">المبيعات الإجمالية بالمليون سنتيم (د.ج)</p>
                  </div>
                  <span className="text-[11px] font-bold bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg">مبيعات تصاعدية</span>
                </div>

                {/* SVG Chart display */}
                <div className="w-full h-56 relative bg-neutral-950/20 rounded-2xl border border-neutral-850/50 p-2 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0066FF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0066FF" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="500" y2="40" stroke="#1F1F1F" strokeWidth="1" />
                    <line x1="0" y1="90" x2="500" y2="90" stroke="#1F1F1F" strokeWidth="1" />
                    <line x1="0" y1="140" x2="500" y2="140" stroke="#1F1F1F" strokeWidth="1" />

                    {/* Chart Area background */}
                    <path 
                      d="M 10 160 Q 100 130 180 145 T 320 80 T 450 50 L 450 180 L 10 180 Z" 
                      fill="url(#salesGrad)" 
                    />

                    {/* Chart Line path */}
                    <path 
                      d="M 10 160 Q 100 130 180 145 T 320 80 T 450 50" 
                      fill="none" 
                      stroke="#0066FF" 
                      strokeWidth="3.5" 
                      strokeLinecap="round"
                    />

                    {/* Data circle buttons */}
                    <circle cx="10" cy="160" r="5" fill="#FFFFFF" stroke="#0066FF" strokeWidth="2" />
                    <circle cx="100" cy="132" r="5" fill="#FFFFFF" stroke="#0066FF" strokeWidth="2" />
                    <circle cx="218" cy="131" r="5" fill="#FFFFFF" stroke="#0066FF" strokeWidth="2" />
                    <circle cx="320" cy="80" r="5" fill="#FFFFFF" stroke="#0066FF" strokeWidth="2" />
                    <circle cx="450" cy="50" r="5" fill="#22C55E" stroke="#FFFFFF" strokeWidth="2" />

                    {/* Tags */}
                    <text x="15" y="172" fill="#737373" fontSize="8" fontFamily="sans-serif">مارس</text>
                    <text x="105" y="148" fill="#737373" fontSize="8" fontFamily="sans-serif">أفريل</text>
                    <text x="210" y="148" fill="#737373" fontSize="8" fontFamily="sans-serif">ماي</text>
                    <text x="315" y="95" fill="#737373" fontSize="8" fontFamily="sans-serif">جوان</text>
                    <text x="420" y="65" fill="#22C55E" fontSize="9" fontFamily="sans-serif" fontWeight="bold">الحالي 119%</text>
                  </svg>
                </div>

                <div className="flex items-center gap-6 mt-4 text-[10px] text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block"></span>
                    <span>المبيعات المحققة الكلية</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                    <span>التحديث المباشر للمخزن</span>
                  </div>
                </div>
              </div>

              {/* Category distribution */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-neutral-900/30 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-4">أكثر التصنيفات بيعاً واهتماماً</h3>
                  <div className="space-y-4">
                    {categoryStats.slice(0, 5).map((stat, idx) => {
                      const totalStock = products.reduce((sum, p) => sum + p.countInStock, 0);
                      const percent = totalStock > 0 ? Math.round((stat.stock / totalStock) * 100) : 0;
                      return (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-neutral-300">{stat.name}</span>
                            <span className="text-neutral-400 font-mono">{stat.stock} جهاز / قطعة ({percent}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 rounded-full" 
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-850 text-xs mt-4">
                  <p className="font-bold text-neutral-200">ملاحظة الذكاء الاصطناعي للمتجر:</p>
                  <p className="text-[10px] text-neutral-400 leading-normal mt-1 font-sans">
                    الحواسيب المحمولة هي الأكثر مبيعاً بمعدل 68% من إجمالي الأرباح، تليها شاشات العرض ديل لعملاء التصميم.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. INVENTORY MANAGEMENT TAB */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-fadeIn" id="inventory-tab">
            {/* Search and Quick Add row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-500">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  placeholder="ابحث بالاسم أو الماركة للمخزن..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full text-right p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl pr-9 pl-3 text-xs focus:outline-none"
                />
              </div>

              <button
                onClick={handleAddNewTrigger}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
              >
                <Plus size={16} />
                <span>إضافة منتج حاسوب جديد</span>
              </button>
            </div>

            {/* Form Drawer / Area for Add & Edit */}
            {(isAdding || editingProduct) && (
              <form onSubmit={handleSubmit} className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl space-y-4 animate-slideDown max-w-3xl mx-auto">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h3 className="text-sm font-black text-blue-400">
                    {editingProduct ? `تعديل منتج: ${editingProduct.name}` : 'إضافة حاسوب أوروبي جديد كلياً للمحل'}
                  </h3>
                  <button 
                    type="button"
                    onClick={() => { setIsAdding(false); setEditingProduct(null); }}
                    className="p-1 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Name and brand */}
                  <div className="col-span-2">
                    <label className="text-[11px] text-neutral-400 block mb-1">اسم الجهاز بالكامل</label>
                    <input
                      type="text"
                      required
                      placeholder="امثلة: HP EliteBook 840 G8"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">الماركة (براند)</label>
                    <input
                      type="text"
                      required
                      placeholder="امثلة: HP, Dell, ASUS"
                      value={formBrand}
                      onChange={(e) => setFormBrand(e.target.value)}
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs"
                    />
                  </div>

                  {/* Category, price and stock */}
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">التصنيف الأساسي</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs"
                    >
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">سعر البيع (د.ج)</label>
                    <input
                      type="number"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">السعر الأصلي قبل الخصم (اختياري)</label>
                    <input
                      type="number"
                      placeholder="اتركه فارغاً إن لم يكن هناك خصم"
                      value={formOriginalPrice}
                      onChange={(e) => setFormOriginalPrice(e.target.value)}
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs font-sans"
                    />
                  </div>

                  {/* Condition, Battery health and screen */}
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">الحالة الفيزيائية في المحل</label>
                    <select
                      value={formCondition}
                      onChange={(e) => setFormCondition(e.target.value as 'new' | 'used')}
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs"
                    >
                      <option value="used">مستورد كابا نظيف جداً</option>
                      <option value="new">جديد في العلبة ومختوم</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">صحة وحالة البطارية</label>
                    <input
                      type="text"
                      placeholder="امثلة: 94% ممتازة أو جديد"
                      value={formBattery}
                      onChange={(e) => setFormBattery(e.target.value)}
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">مستوى التوفر بالمستودع</label>
                    <input
                      type="number"
                      required
                      value={formStock}
                      onChange={(e) => setFormStock(Number(e.target.value))}
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs font-sans"
                    />
                  </div>
                </div>

                {/* Sub specifications (CPU, RAM, Storage, GPU, Screen) */}
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-850 space-y-3">
                  <p className="text-[10px] font-bold text-blue-400 block">المواصفات التقنية الفنية (يُبنى الجدول تلقائياً من الحقول):</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div>
                      <label className="text-[10px] text-neutral-500 block mb-1">المعالج CPU</label>
                      <input
                        type="text"
                        required
                        placeholder="Intel i5-11th"
                        value={formCpu}
                        onChange={(e) => setFormCpu(e.target.value)}
                        className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500 block mb-1">الرام RAM</label>
                      <input
                        type="text"
                        required
                        placeholder="16 GB DDR4"
                        value={formRam}
                        onChange={(e) => setFormRam(e.target.value)}
                        className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500 block mb-1">التخزين SSD</label>
                      <input
                        type="text"
                        required
                        placeholder="512 GB SSD"
                        value={formStorage}
                        onChange={(e) => setFormStorage(e.target.value)}
                        className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500 block mb-1">كرت الشاشة GPU</label>
                      <input
                        type="text"
                        required
                        placeholder="Nvidia RTX 3050"
                        value={formGpu}
                        onChange={(e) => setFormGpu(e.target.value)}
                        className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500 block mb-1">الشاشة SCREEN</label>
                      <input
                        type="text"
                        placeholder='14" FHD IPS'
                        value={formScreen}
                        onChange={(e) => setFormScreen(e.target.value)}
                        className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Image and description */}
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">رابط صورة المنتج التوضيحية</label>
                  <input
                    type="url"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">الوصف العام للأداء والملحقات</label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs font-sans"
                  />
                </div>

                {/* Submitting buttons */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-855">
                  <button
                    type="button"
                    onClick={() => { setIsAdding(false); setEditingProduct(null); }}
                    className="px-4 py-2 bg-neutral-950 text-neutral-400 hover:text-white rounded-lg text-xs"
                  >
                    إلغاء التعديل
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs"
                  >
                    {editingProduct ? 'حفظ تعديلات جهاز الحاسوب' : 'تأكيد الإضافة ونشره فوراً'}
                  </button>
                </div>
              </form>
            )}

            {/* Inventory table */}
            <div className="overflow-x-auto rounded-2xl border border-neutral-850 bg-neutral-900/10">
              <table className="w-full text-right text-xs">
                <thead className="bg-neutral-950/60 border-b border-neutral-850 text-neutral-400 font-bold">
                  <tr>
                    <th className="p-4">صورة العتاد</th>
                    <th className="p-4">الجهاز والماركة</th>
                    <th className="p-4">التصنيف</th>
                    <th className="p-4">سعر البيع</th>
                    <th className="p-4 text-center">المخزون المتوفر</th>
                    <th className="p-4 text-center">الخصائص الأساسية</th>
                    <th className="p-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-neutral-900/40">
                      <td className="p-4">
                        <img 
                          src={prod.images[0]} 
                          alt="" 
                          className="w-12 h-10 object-cover rounded-md border border-neutral-800"
                          referrerPolicy="no-referrer"
                        />
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-neutral-100">{prod.name}</p>
                        <span className="text-[9px] font-mono text-blue-500 font-black tracking-widest block uppercase mt-0.5">{prod.brand}</span>
                      </td>
                      <td className="p-4 text-neutral-300">{prod.category}</td>
                      <td className="p-4 font-bold text-neutral-200">
                        {new Intl.NumberFormat('ar-DZ').format(prod.price)} د.ج
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          prod.countInStock > 2 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : prod.countInStock > 0 
                            ? 'bg-amber-500/10 text-amber-400' 
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {prod.countInStock > 0 ? `${prod.countInStock} قطع` : 'نفذ بالكامل'}
                        </span>
                      </td>
                      <td className="p-4 text-neutral-400 max-w-xxs truncate text-center">
                        <span className="text-[10px] font-mono bg-neutral-950 px-2 py-0.5 rounded-lg border border-neutral-850">
                          {prod.cpu.split('(')[0]} | {prod.ram}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditTrigger(prod)}
                            className="p-1 px-2 rounded-lg bg-neutral-950 border border-neutral-850 hover:border-blue-500 hover:text-blue-400 text-neutral-400 transition-colors flex items-center gap-1"
                            title="تعديل المنتج"
                          >
                            <Edit size={12} />
                            <span>تعديل</span>
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1 px-2 rounded-lg bg-neutral-950 border border-neutral-850 hover:border-red-500 hover:text-red-550 hover:text-red-400 text-neutral-400 transition-colors flex items-center gap-1"
                            title="مسح المنتج من المتجر"
                          >
                            <Trash2 size={12} />
                            <span>حذف</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ORDER MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn" id="orders-tab">
            {/* Search and filters bar */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative max-w-sm flex-1">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-500">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  placeholder="ابحث باسم الزبون، رقمه، أو الولاية لتشحن..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full text-right p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl pr-9 pl-3 text-xs focus:outline-none"
                />
              </div>

              <div className="text-xs text-neutral-400 font-medium">
                تصفية مستودعية: <span className="text-white font-bold">{filteredOrders.length} طلبات</span>
              </div>
            </div>

            {/* Orders list timeline table */}
            <div className="overflow-x-auto rounded-2xl border border-neutral-850 bg-neutral-900/10">
              <table className="w-full text-right text-xs">
                <thead className="bg-neutral-950/60 border-b border-neutral-850 text-neutral-400 font-bold">
                  <tr>
                    <th className="p-4">رقم الطلبية</th>
                    <th className="p-4">معلومات العميل والولاية</th>
                    <th className="p-4">تفاصيل عتاد الطلب</th>
                    <th className="p-4">السعر الكلي</th>
                    <th className="p-4">توقيت تقديم الطلب</th>
                    <th className="p-4 text-center">حالة الشحن والتسليم</th>
                    <th className="p-4 text-center">تحديث الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-neutral-500 font-sans">
                        لا توجد طلبيات مطابقة للبحث حالياً!
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => {
                      const spendFormatted = new Intl.NumberFormat('ar-DZ').format(ord.totalPrice);
                      const displayDate = new Date(ord.createdAt).toLocaleDateString('ar-DZ', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      });

                      return (
                        <tr key={ord.id} className="hover:bg-neutral-900/40">
                          <td className="p-4 font-mono font-black text-neutral-300">
                            {ord.id}
                          </td>
                          <td className="p-4 space-y-1">
                            <p className="font-bold text-neutral-100">{ord.customerName}</p>
                            <p className="text-[11px] font-sans text-emerald-400 font-medium">{ord.customerPhone}</p>
                            <p className="text-[10px] text-neutral-400">{ord.customerState} | {ord.customerAddress}</p>
                          </td>
                          <td className="p-4 text-neutral-300 space-y-1 max-w-xs">
                            {ord.items.map((it, idx) => (
                              <p key={idx} className="truncate text-xs font-semibold">
                                {it.productName} <span className="text-blue-500">×{it.quantity}</span>
                              </p>
                            ))}
                            {ord.notes && <p className="text-[10px] text-amber-500 font-sans truncate">ملاحظة: {ord.notes}</p>}
                          </td>
                          <td className="p-4 font-black text-neutral-100 font-sans">
                            {spendFormatted} د.ج
                          </td>
                          <td className="p-4 text-neutral-450 text-neutral-450 text-neutral-400 font-sans">
                            {displayDate}
                          </td>
                          <td className="p-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                              ord.status === 'pending' 
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                                : ord.status === 'confirmed' 
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                                : ord.status === 'shipped' 
                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                                : ord.status === 'completed' 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-neutral-950 text-neutral-500'
                            }`}>
                              {ord.status === 'pending' && 'قيد الانتظار'}
                              {ord.status === 'confirmed' && 'تم التأكيد'}
                              {ord.status === 'shipped' && 'تم الشحن'}
                              {ord.status === 'completed' && 'مستلم ومكتمل'}
                              {ord.status === 'cancelled' && 'ملغي'}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order['status'])}
                              className="p-1 px-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-[10px] font-bold text-neutral-300 focus:outline-none"
                            >
                              <option value="pending">تعليق (قيد الانتظار)</option>
                              <option value="confirmed">تأكيد (بانتظار الإرسال)</option>
                              <option value="shipped">تم التسليم لشركة الشحن</option>
                              <option value="completed">توصيل ناجح ومستلم</option>
                              <option value="cancelled">إلغاء الطلبية</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. CUSTOMER DIRECTORY TAB */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-fadeIn" id="customers-tab">
            <div className="p-4 bg-neutral-900/20 border border-neutral-850 rounded-2xl">
              <h3 className="text-sm font-bold text-neutral-200">دليل وسجلات عملاء Micro Tech</h3>
              <p className="text-[10px] text-neutral-400">تتبع العملاء الأكثر استثماراً وتواصل مباشر معهم عبر أرقام هواتفهم</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-neutral-850 bg-neutral-900/10">
              <table className="w-full text-right text-xs">
                <thead className="bg-neutral-950/60 border-b border-neutral-850 text-neutral-400 font-bold">
                  <tr>
                    <th className="p-4">اسم العميل</th>
                    <th className="p-4">رقم الهاتف النشط</th>
                    <th className="p-4">الولاية والعنوان</th>
                    <th className="p-4 text-center">إجمالي عدد الطلبات</th>
                    <th className="p-4 text-center">إجمالي الاستثمار (د.ج)</th>
                    <th className="p-4 text-center">حالة الزبون</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850">
                  {customers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-neutral-500 font-sans block">
                        لا يوجد سجل لعملاء مسجلين بالمتجر حالياً!
                      </td>
                    </tr>
                  ) : (
                    customers.map((cust, idx) => {
                      const totalSpentFormatted = new Intl.NumberFormat('ar-DZ').format(cust.totalSpent);
                      return (
                        <tr key={idx} className="hover:bg-neutral-900/40">
                          <td className="p-4 font-bold text-neutral-100">{cust.name}</td>
                          <td className="p-4 font-mono text-blue-400 font-medium">{cust.phone}</td>
                          <td className="p-4 text-neutral-350">{cust.state} | {cust.address}</td>
                          <td className="p-4 text-center font-bold text-neutral-200">{cust.ordersCount} طلبات</td>
                          <td className="p-4 text-center text-emerald-400 font-black font-sans">{totalSpentFormatted} د.ج</td>
                          <td className="p-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${cust.totalSpent > 150000 ? 'bg-amber-500/10 text-amber-400' : 'bg-neutral-950 text-neutral-400'}`}>
                              {cust.totalSpent > 150000 ? 'VIP زبون دائم' : 'عادي'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
