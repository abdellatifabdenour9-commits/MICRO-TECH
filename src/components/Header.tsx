import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { 
  Laptop, 
  ShoppingCart, 
  Heart, 
  GitCompare, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  PhoneCall, 
  Sparkles,
  UserCheck,
  LogIn,
  User
} from 'lucide-react';
import { LoginForm } from './LoginForm';
import { UserProfile } from './UserProfile';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
}) => {
  const { cart, wishlist, compareList, isAdminMode, setIsAdminMode } = useStore();
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl text-white shadow-lg" id="main-header">
      {/* Top Banner with slogan */}
      <div className="bg-gradient-to-r from-blue-700/80 via-blue-600/80 to-emerald-600/80 backdrop-blur-md text-[11px] sm:text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-white/5">
        <Sparkles size={14} className="animate-pulse" />
        <span>أفضل الحواسيب الأوروبية الأصلية بأفضل سعر وجودة في السوق الجزائري 🇩🇿</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab('store'); setSearchQuery(''); }}>
            <div className="flex p-2 rounded-xl bg-blue-600/80 backdrop-blur-md shadow-lg shadow-blue-500/10 text-white border border-white/15">
              <Laptop size={22} />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold leading-none tracking-tight text-lg sm:text-xl text-white">
                MICRO <span className="text-blue-500 font-extrabold">TECH</span>
              </span>
              <span className="text-[9px] text-neutral-450 font-sans tracking-wider mt-0.5">COMPUTER EXPERT</span>
            </div>
          </div>

          {/* Desktop Search Engine */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-450">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'store') setActiveTab('store');
              }}
              placeholder="ابحث عن حاسوب، معالج، كرت شاشة..."
              className="w-full text-right glass-input rounded-xl pr-10 pl-4 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none transition-all font-sans"
              dir="rtl"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => { setActiveTab('store'); setSearchQuery(''); }}
              className={`pb-1 border-b-2 transition-all ${activeTab === 'store' ? 'border-blue-500 text-blue-400' : 'border-transparent text-neutral-300 hover:text-white'}`}
            >
              الرئيسية والمتجر
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`pb-1 border-b-2 transition-all flex items-center gap-1 ${activeTab === 'offers' ? 'border-blue-500 text-blue-400' : 'border-transparent text-neutral-300 hover:text-white'}`}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              العروض الخاصة
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-1 border-b-2 transition-all ${activeTab === 'about' ? 'border-blue-500 text-blue-400' : 'border-transparent text-neutral-300 hover:text-white'}`}
            >
              من نحن واتصل بنا
            </button>
          </nav>

          {/* User Actions & Badges */}
          <div className="flex items-center gap-1 sm:gap-3">
            
            {/* Compare Button */}
            <button 
              onClick={onOpenCompare}
              className="p-2 rounded-lg text-neutral-300 hover:text-blue-400 hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors relative"
              title="مقارنة الحواسيب"
            >
              <GitCompare size={20} />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={onOpenWishlist}
              className="p-2 rounded-lg text-neutral-300 hover:text-red-450 hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors relative"
              title="المفضلة"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-650 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button 
              onClick={onOpenCart}
              className="p-2 rounded-lg bg-white/[0.05] text-neutral-200 hover:text-blue-400 hover:bg-white/[0.1] transition-all relative border border-white/10 shadow-md"
              title="سلة المشتريات"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Button - Only for Admins */}
            {isAdmin() && (
              <button
                onClick={() => {
                  if (isAdminMode) {
                    setIsAdminMode(false);
                    setActiveTab('store');
                  } else {
                    setIsAdminMode(true);
                    setActiveTab('admin');
                  }
                }}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold tracking-wide transition-all ${
                  isAdminMode 
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold hover:bg-emerald-500/20' 
                    : 'border-white/10 bg-white/5 text-neutral-300 hover:border-blue-500/50 hover:text-blue-400 hover:bg-white/10'
                }`}
              >
                {isAdminMode ? (
                  <>
                    <UserCheck size={14} />
                    <span>لوحة التحكم نشطة</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} />
                    <span>دخول الإدارة</span>
                  </>
                )}
              </button>
            )}

            {/* User Profile or Login Button */}
            {user ? (
              <button
                onClick={() => setShowUserProfile(true)}
                className="p-2 rounded-lg text-neutral-300 hover:text-blue-400 hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors relative hidden sm:block"
                title={`دخول باسم ${user.displayName}`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                  {user.displayName.charAt(0)}
                </div>
              </button>
            ) : (
              <button
                onClick={() => setShowLoginForm(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-500/50 bg-blue-500/10 text-blue-400 text-xs font-semibold hover:bg-blue-500/20 transition-all"
              >
                <LogIn size={14} />
                <span>دخول</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:bg-white/10 hover:text-white lg:hidden"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel-heavy border-t border-white/10 px-4 py-4 space-y-4 animate-fadeIn" id="mobile-drawer">
          {/* Mobile Search */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-450">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'store') setActiveTab('store');
              }}
              placeholder="ابحث عن لابتوب أو معالج..."
              className="w-full text-right glass-input rounded-xl pr-9 pl-4 py-2 text-xs text-neutral-200 placeholder-neutral-550 focus:outline-none"
              dir="rtl"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <button
              onClick={() => { setActiveTab('store'); setSearchQuery(''); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border transition-all ${activeTab === 'store' && !isAdminMode ? 'border-blue-500/40 bg-blue-500/15 text-blue-400 font-bold' : 'border-white/5 bg-white/[0.03] text-neutral-450 hover:bg-white/[0.08]'}`}
            >
              المتجر الرئيسي
            </button>
            <button
              onClick={() => { setActiveTab('offers'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border transition-all ${activeTab === 'offers' ? 'border-blue-500/40 bg-blue-500/15 text-blue-400 font-bold' : 'border-white/5 bg-white/[0.03] text-neutral-450 hover:bg-white/[0.08]'}`}
            >
              العروض والتخفيضات
            </button>
            <button
              onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border transition-all ${activeTab === 'about' ? 'border-blue-500/40 bg-blue-500/15 text-blue-400 font-bold' : 'border-white/5 bg-white/[0.03] text-neutral-450 hover:bg-white/[0.08]'}`}
            >
              من نحن والتواصل
            </button>
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setActiveTab(!isAdminMode ? 'admin' : 'store');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                isAdminMode 
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-450 font-bold' 
                  : 'border-white/5 bg-white/[0.03] text-neutral-450 hover:bg-white/[0.08]'
              }`}
            >
              <ShieldCheck size={14} />
              <span>لوحة الإدارة</span>
            </button>
          </div>
        </div>
      )}
    </header>

    {/* Login Form Modal */}
    {showLoginForm && (
      <LoginForm
        onSuccess={() => {
          setShowLoginForm(false);
          setActiveTab('store');
        }}
        onClose={() => setShowLoginForm(false)}
      />
    )}

    {/* User Profile Modal */}
    {showUserProfile && (
      <UserProfile onClose={() => setShowUserProfile(false)} />
    )}
  </>;
};
