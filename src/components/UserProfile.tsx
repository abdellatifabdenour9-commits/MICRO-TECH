import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLE_CONFIG } from '../authRoles';
import { User, LogOut, Mail, Shield, Calendar } from 'lucide-react';

interface UserProfileProps {
  onClose?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const roleConfig = ROLE_CONFIG[user.role];
  const formattedDate = new Date(user.createdAt).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleLogout = () => {
    logout();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6">
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{user.displayName}</h2>
            <p className="text-sm text-blue-400">{user.email}</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-4 mb-6">
          {/* Role */}
          <div className="flex items-start gap-3 p-3 bg-blue-600/10 border border-blue-600/30 rounded-lg">
            <Shield size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-neutral-400">الدور</p>
              <p className="text-sm font-medium text-white">{roleConfig.name}</p>
              <p className="text-xs text-neutral-500 mt-1">{roleConfig.description}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3 p-3 bg-slate-800/50 border border-white/5 rounded-lg">
            <Mail size={18} className="text-neutral-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-neutral-400">البريد الإلكتروني</p>
              <p className="text-sm font-medium text-white break-all">{user.email}</p>
            </div>
          </div>

          {/* Join Date */}
          <div className="flex items-start gap-3 p-3 bg-slate-800/50 border border-white/5 rounded-lg">
            <Calendar size={18} className="text-neutral-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-neutral-400">تاريخ الانضمام</p>
              <p className="text-sm font-medium text-white">{formattedDate}</p>
            </div>
          </div>

          {/* Verification Status */}
          {user.isVerified !== undefined && (
            <div className="flex items-start gap-3 p-3 bg-emerald-600/10 border border-emerald-600/30 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5"></div>
              <div className="flex-1">
                <p className="text-xs text-neutral-400">حالة التحقق</p>
                <p className="text-sm font-medium text-emerald-300">
                  {user.isVerified ? 'حساب موثق' : 'حساب غير موثق'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Permissions */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-neutral-300 mb-2 uppercase">الصلاحيات</p>
          <div className="grid grid-cols-2 gap-2">
            {Array.from(roleConfig.permissions)
              .slice(0, 6)
              .map((permission) => (
                <div
                  key={permission}
                  className="text-xs px-2 py-1 rounded bg-slate-800/50 border border-white/5 text-neutral-300 truncate"
                  title={permission}
                >
                  {permission.split(':')[1]}
                </div>
              ))}
            {roleConfig.permissions.size > 6 && (
              <div className="text-xs px-2 py-1 rounded bg-slate-800/50 border border-white/5 text-neutral-400 col-span-2 text-center">
                +{roleConfig.permissions.size - 6} أخرى
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};
