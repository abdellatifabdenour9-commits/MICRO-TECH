/**
 * Authentication and Authorization Middleware
 * Reusable middleware for protecting routes and enforcing permissions
 */

import { UserRole } from '../types';
import { hasPermission, canAccessPage, getRoleLevel, ROLE_CONFIG } from '../authRoles';

/**
 * Middleware to check if user has required permission
 */
export const requirePermission = (permission: string) => {
  return (userRole: UserRole | null): boolean => {
    if (!userRole) return false;
    return hasPermission(userRole, permission);
  };
};

/**
 * Middleware to check if user has any of the required permissions
 */
export const requireAnyPermission = (permissions: string[]) => {
  return (userRole: UserRole | null): boolean => {
    if (!userRole) return false;
    return permissions.some(perm => hasPermission(userRole, perm));
  };
};

/**
 * Middleware to check if user has all required permissions
 */
export const requireAllPermissions = (permissions: string[]) => {
  return (userRole: UserRole | null): boolean => {
    if (!userRole) return false;
    return permissions.every(perm => hasPermission(userRole, perm));
  };
};

/**
 * Middleware to check if user has specific role
 */
export const requireRole = (role: UserRole | UserRole[]) => {
  return (userRole: UserRole | null): boolean => {
    if (!userRole) return false;
    if (Array.isArray(role)) {
      return role.includes(userRole);
    }
    return userRole === role;
  };
};

/**
 * Middleware to check minimum role level
 */
export const requireMinimumRoleLevel = (minLevel: number) => {
  return (userRole: UserRole | null): boolean => {
    if (!userRole) return false;
    return getRoleLevel(userRole) >= minLevel;
  };
};

/**
 * Middleware to check if user can access page
 */
export const canAccessRoute = (page: string) => {
  return (userRole: UserRole | null): boolean => {
    if (!userRole) return false;
    return canAccessPage(userRole, page);
  };
};

/**
 * Validate route access
 */
export const validateRouteAccess = (
  userRole: UserRole | null,
  requiredRole?: UserRole | UserRole[],
  requiredPermissions?: string[]
): boolean => {
  if (!userRole) return false;

  // Check role
  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(userRole)) return false;
  }

  // Check permissions
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(perm =>
      hasPermission(userRole, perm)
    );
    if (!hasAllPermissions) return false;
  }

  return true;
};

/**
 * Get allowed routes for a user role
 */
export const getAllowedRoutes = (role: UserRole): string[] => {
  const roleConfig = ROLE_CONFIG[role];
  return roleConfig?.allowedPages || [];
};

/**
 * Get forbidden routes for a user role
 */
export const getForbiddenRoutes = (role: UserRole): string[] => {
  const adminRoutes = ROLE_CONFIG.admin.allowedPages;
  const roleAllowedRoutes = getAllowedRoutes(role);
  return adminRoutes.filter(route => !roleAllowedRoutes.includes(route));
};

/**
 * Sanitize route based on role
 * Redirects to home if user tries to access forbidden route
 */
export const sanitizeRoute = (route: string, role: UserRole | null): string => {
  if (!role) return '/';
  
  if (canAccessPage(role, route)) {
    return route;
  }
  
  // Redirect to home if route is forbidden
  return '/';
};

/**
 * Create a route guard function
 */
export const createRouteGuard = (
  requiredRole?: UserRole | UserRole[],
  requiredPermissions?: string[]
) => {
  return (userRole: UserRole | null): boolean => {
    return validateRouteAccess(userRole, requiredRole, requiredPermissions);
  };
};

/**
 * Log access attempt (for audit trail)
 */
export const logAccessAttempt = (
  userId: string,
  route: string,
  role: UserRole,
  allowed: boolean,
  reason?: string
) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    userId,
    route,
    role,
    allowed,
    reason,
  };

  // Store in localStorage for demo
  const logs = localStorage.getItem('auth_access_logs');
  const accessLogs = logs ? JSON.parse(logs) : [];
  accessLogs.push(logEntry);
  
  // Keep last 100 logs
  if (accessLogs.length > 100) {
    accessLogs.shift();
  }
  
  localStorage.setItem('auth_access_logs', JSON.stringify(accessLogs));

  console.log('[Access Log]', logEntry);
};

/**
 * Get access logs
 */
export const getAccessLogs = () => {
  const logs = localStorage.getItem('auth_access_logs');
  return logs ? JSON.parse(logs) : [];
};

/**
 * Clear access logs
 */
export const clearAccessLogs = () => {
  localStorage.removeItem('auth_access_logs');
};
