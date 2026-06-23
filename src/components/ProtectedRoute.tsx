import React, { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole, ProtectedComponentProps } from '../types';
import { hasPermission, getRoleLevel } from '../authRoles';
import { AlertCircle, Lock } from 'lucide-react';

interface ProtectedRouteProps {
  requiredRole?: UserRole;
  requiredPermissions?: string[];
  requiredRoleLevel?: number;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ProtectedRoute Component
 * Guards routes and components based on user role and permissions
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  requiredPermissions = [],
  requiredRoleLevel,
  children,
  fallback,
}) => {
  const { user, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600/30 border-t-blue-500 animate-spin"></div>
          <p className="text-neutral-400">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <UnauthorizedAccess reason="يجب تسجيل الدخول أولاً" />
    );
  }

  // Check role requirement
  if (requiredRole && user.role !== requiredRole) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <UnauthorizedAccess reason={`هذه الصفحة مخصصة لـ ${requiredRole}`} />
    );
  }

  // Check role level requirement
  if (requiredRoleLevel && getRoleLevel(user.role) < requiredRoleLevel) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <UnauthorizedAccess reason="ليس لديك الصلاحيات الكافية" />
    );
  }

  // Check permissions requirements
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission =>
      hasPermission(user.role, permission)
    );

    if (!hasAllPermissions) {
      return fallback ? (
        <>{fallback}</>
      ) : (
        <UnauthorizedAccess reason="ليس لديك الصلاحيات المطلوبة" />
      );
    }
  }

  // User is authorized
  return <>{children}</>;
};

/**
 * ProtectedComponent Wrapper
 * Hides component based on permissions
 */
export const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
  requiredRole,
  requiredPermissions = [],
  fallback = null,
  children,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return fallback ? <>{fallback}</> : null;
  }

  // Check role
  if (requiredRole && user.role !== requiredRole) {
    return fallback ? <>{fallback}</> : null;
  }

  // Check permissions
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission =>
      hasPermission(user.role, permission)
    );
    if (!hasAllPermissions) {
      return fallback ? <>{fallback}</> : null;
    }
  }

  return <>{children}</>;
};

/**
 * Unauthorized Access Component
 */
const UnauthorizedAccess: React.FC<{ reason: string }> = ({ reason }) => {
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
            {reason}
          </p>

          <div className="flex items-gap-2 bg-amber-600/10 border border-amber-600/40 rounded-lg p-4 mb-6">
            <AlertCircle size={20} className="text-amber-500 flex-shrink-0 ml-3" />
            <p className="text-sm text-amber-200">
              إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع الدعم الفني
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              العودة للرئيسية
            </a>
            <button
              onClick={() => window.history.back()}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
            >
              رجوع
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Route Guard - Higher Order Component
 */
export const withRouteGuard = (
  Component: React.ComponentType<any>,
  requiredRole?: UserRole,
  requiredPermissions?: string[]
) => {
  return (props: any) => (
    <ProtectedRoute
      requiredRole={requiredRole}
      requiredPermissions={requiredPermissions}
      fallback={<UnauthorizedAccess reason="ليس لديك الصلاحيات لعرض هذه الصفحة" />}
    >
      <Component {...props} />
    </ProtectedRoute>
  );
};

/**
 * Component Guard - Conditional Rendering
 */
export const withComponentGuard = (
  Component: React.ComponentType<any>,
  requiredRole?: UserRole,
  requiredPermissions?: string[]
) => {
  return (props: any) => (
    <ProtectedComponent
      requiredRole={requiredRole}
      requiredPermissions={requiredPermissions}
    >
      <Component {...props} />
    </ProtectedComponent>
  );
};
