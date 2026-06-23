import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { LogIn, AlertCircle, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onClose }) => {
  const { login, isLoading, error: authError } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('customer');
  const [signupError, setSignupError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      await login(loginEmail, loginPassword);
      onSuccess?.();
    } catch (err) {
      setLoginError(authError || 'خطأ في عملية الدخول');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (signupPassword !== signupConfirmPassword) {
      setSignupError('كلمات المرور غير متطابقة');
      return;
    }

    try {
      const { signup } = useAuth();
      await signup(signupEmail, signupPassword, signupName, signupRole);
      onSuccess?.();
    } catch (err) {
      setSignupError(authError || 'خطأ في عملية التسجيل');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-0 overflow-hidden">
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-10"
          >
            ✕
          </button>
        )}

        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`flex-1 py-3 px-4 font-medium text-center transition-all border-b-2 ${
              isLoginTab
                ? 'text-blue-400 border-blue-500 bg-blue-500/5'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            <LogIn size={18} className="inline mr-2" />
            دخول
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={`flex-1 py-3 px-4 font-medium text-center transition-all border-b-2 ${
              !isLoginTab
                ? 'text-blue-400 border-blue-500 bg-blue-500/5'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            تسجيل جديد
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoginTab ? (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">دخول للحساب</h2>

              {(loginError || authError) && (
                <div className="flex items-start gap-3 p-3 bg-red-600/10 border border-red-600/40 rounded-lg">
                  <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{loginError || authError}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    جاري الدخول...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    دخول
                  </>
                )}
              </button>

              <p className="text-center text-sm text-neutral-400">
                للتجربة السريعة، استخدم:
                <br />
                <code className="text-xs bg-slate-800/50 px-2 py-1 rounded mt-2 block">admin@micro-tech.com</code>
              </p>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignup} className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">إنشاء حساب جديد</h2>

              {(signupError || authError) && (
                <div className="flex items-start gap-3 p-3 bg-red-600/10 border border-red-600/40 rounded-lg">
                  <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{signupError || authError}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="أحمد محمد"
                  className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  النوع / الدور
                </label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value as UserRole)}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="customer">عميل</option>
                  <option value="teacher">معلم</option>
                  <option value="employee">موظف</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    جاري التسجيل...
                  </>
                ) : (
                  'إنشاء حساب'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
