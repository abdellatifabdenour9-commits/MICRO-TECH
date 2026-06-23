/**
 * Role-Based Access Control (RBAC) System
 * Defines roles, permissions, and access control rules
 */

export type UserRole = 'admin' | 'customer' | 'teacher' | 'employee' | 'guest';

export interface Permission {
  name: string;
  description: string;
}

export interface RoleConfig {
  id: UserRole;
  name: string;
  description: string;
  permissions: Set<string>;
  allowedPages: string[];
  allowedComponents: string[];
}

// Permission definitions
export const PERMISSIONS = {
  // Admin permissions
  MANAGE_PRODUCTS: 'manage:products',
  MANAGE_ORDERS: 'manage:orders',
  MANAGE_USERS: 'manage:users',
  VIEW_ANALYTICS: 'view:analytics',
  VIEW_SETTINGS: 'view:settings',
  MANAGE_INVENTORY: 'manage:inventory',
  VIEW_ADMIN_PANEL: 'view:admin_panel',
  
  // Customer permissions
  VIEW_PRODUCTS: 'view:products',
  PURCHASE_PRODUCTS: 'purchase:products',
  VIEW_CART: 'view:cart',
  VIEW_WISHLIST: 'view:wishlist',
  VIEW_PROFILE: 'view:profile',
  VIEW_ORDERS: 'view:orders',
  
  // Teacher permissions
  MANAGE_COURSES: 'manage:courses',
  VIEW_STUDENTS: 'view:students',
  
  // Employee permissions
  PROCESS_ORDERS: 'process:orders',
  MANAGE_SUPPORT: 'manage:support',
} as const;

// Role configurations
export const ROLE_CONFIG: Record<UserRole, RoleConfig> = {
  admin: {
    id: 'admin',
    name: 'مسؤول النظام',
    description: 'لديه صلاحيات كاملة على جميع الموارد',
    permissions: new Set([
      PERMISSIONS.MANAGE_PRODUCTS,
      PERMISSIONS.MANAGE_ORDERS,
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.VIEW_SETTINGS,
      PERMISSIONS.MANAGE_INVENTORY,
      PERMISSIONS.VIEW_ADMIN_PANEL,
      PERMISSIONS.VIEW_PRODUCTS,
      PERMISSIONS.PURCHASE_PRODUCTS,
      PERMISSIONS.VIEW_CART,
      PERMISSIONS.VIEW_WISHLIST,
      PERMISSIONS.VIEW_PROFILE,
      PERMISSIONS.VIEW_ORDERS,
    ]),
    allowedPages: [
      '/',
      '/store',
      '/products',
      '/admin',
      '/admin/dashboard',
      '/admin/products',
      '/admin/orders',
      '/admin/users',
      '/admin/analytics',
      '/admin/settings',
      '/cart',
      '/wishlist',
      '/orders',
      '/profile',
    ],
    allowedComponents: [
      'Header',
      'AdminPanel',
      'ProductCard',
      'CartCheckoutDrawer',
      'ContactForm',
      'FAQ',
      'UserProfile',
    ],
  },
  
  customer: {
    id: 'customer',
    name: 'عميل',
    description: 'عميل عادي مع صلاحيات محدودة',
    permissions: new Set([
      PERMISSIONS.VIEW_PRODUCTS,
      PERMISSIONS.PURCHASE_PRODUCTS,
      PERMISSIONS.VIEW_CART,
      PERMISSIONS.VIEW_WISHLIST,
      PERMISSIONS.VIEW_PROFILE,
      PERMISSIONS.VIEW_ORDERS,
    ]),
    allowedPages: [
      '/',
      '/store',
      '/products',
      '/cart',
      '/wishlist',
      '/orders',
      '/profile',
      '/checkout',
    ],
    allowedComponents: [
      'Header',
      'Hero',
      'Features',
      'ProductCard',
      'CartCheckoutDrawer',
      'ContactForm',
      'FAQ',
      'UserProfile',
    ],
  },
  
  teacher: {
    id: 'teacher',
    name: 'مُدرّس',
    description: 'معلم مع صلاحيات محدودة',
    permissions: new Set([
      PERMISSIONS.MANAGE_COURSES,
      PERMISSIONS.VIEW_STUDENTS,
      PERMISSIONS.VIEW_PRODUCTS,
      PERMISSIONS.VIEW_PROFILE,
    ]),
    allowedPages: [
      '/',
      '/store',
      '/products',
      '/profile',
      '/courses',
    ],
    allowedComponents: [
      'Header',
      'ProductCard',
      'ContactForm',
      'FAQ',
      'UserProfile',
    ],
  },
  
  employee: {
    id: 'employee',
    name: 'موظف',
    description: 'موظف مع صلاحيات إدارة محدودة',
    permissions: new Set([
      PERMISSIONS.PROCESS_ORDERS,
      PERMISSIONS.MANAGE_SUPPORT,
      PERMISSIONS.VIEW_ORDERS,
      PERMISSIONS.VIEW_PRODUCTS,
    ]),
    allowedPages: [
      '/',
      '/store',
      '/products',
      '/employee/orders',
      '/employee/support',
      '/profile',
    ],
    allowedComponents: [
      'Header',
      'ProductCard',
      'ContactForm',
      'FAQ',
      'UserProfile',
    ],
  },
  
  guest: {
    id: 'guest',
    name: 'زائر',
    description: 'زائر بدون حساب',
    permissions: new Set([
      PERMISSIONS.VIEW_PRODUCTS,
    ]),
    allowedPages: [
      '/',
      '/store',
      '/products',
    ],
    allowedComponents: [
      'Header',
      'Hero',
      'Features',
      'ProductCard',
      'ContactForm',
      'FAQ',
    ],
  },
};

/**
 * Check if a user role has a specific permission
 */
export const hasPermission = (role: UserRole, permission: string): boolean => {
  const roleConfig = ROLE_CONFIG[role];
  return roleConfig?.permissions.has(permission) ?? false;
};

/**
 * Check if a user role can access a specific page
 */
export const canAccessPage = (role: UserRole, page: string): boolean => {
  const roleConfig = ROLE_CONFIG[role];
  return roleConfig?.allowedPages.includes(page) ?? false;
};

/**
 * Check if a user role can view a specific component
 */
export const canViewComponent = (role: UserRole, component: string): boolean => {
  const roleConfig = ROLE_CONFIG[role];
  return roleConfig?.allowedComponents.includes(component) ?? false;
};

/**
 * Get all permissions for a role
 */
export const getRolePermissions = (role: UserRole): string[] => {
  const roleConfig = ROLE_CONFIG[role];
  return roleConfig ? Array.from(roleConfig.permissions) : [];
};

/**
 * Check if multiple roles have a specific permission
 */
export const rolesHavePermission = (roles: UserRole[], permission: string): boolean => {
  return roles.some(role => hasPermission(role, permission));
};

/**
 * Get role level (higher number = more privileges)
 */
export const getRoleLevel = (role: UserRole): number => {
  const levels: Record<UserRole, number> = {
    admin: 4,
    employee: 3,
    teacher: 2,
    customer: 1,
    guest: 0,
  };
  return levels[role] ?? 0;
};

/**
 * Check if role1 has higher or equal privileges than role2
 */
export const isRoleHigherOrEqual = (role1: UserRole, role2: UserRole): boolean => {
  return getRoleLevel(role1) >= getRoleLevel(role2);
};
