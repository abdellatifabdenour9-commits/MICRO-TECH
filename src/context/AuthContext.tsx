import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, AuthState, UserRole } from '../types';
import { hasPermission, canAccessPage, ROLE_CONFIG } from '../authRoles';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  canAccessPage: (page: string) => boolean;
  updateUser: (user: Partial<User>) => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Initialize auth from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('micro_tech_auth_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState(prev => ({
            ...prev,
            user,
            isAuthenticated: true,
            isLoading: false,
          }));
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'خطأ في تحميل معلومات المستخدم',
        }));
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call - in production, validate against backend
      // For demo: validate email format and password length
      if (!email.includes('@') || password.length < 6) {
        throw new Error('بيانات دخول غير صحيحة');
      }

      // Retrieve users from localStorage
      const usersData = localStorage.getItem('micro_tech_users');
      const users = usersData ? JSON.parse(usersData) : [];
      
      const existingUser = users.find((u: User) => u.email === email);
      if (!existingUser) {
        throw new Error('المستخدم غير موجود');
      }

      // Create session
      const user: User = {
        ...existingUser,
        lastLogin: new Date().toISOString(),
      };

      // Update last login
      const updatedUsers = users.map((u: User) => (u.id === user.id ? user : u));
      localStorage.setItem('micro_tech_users', JSON.stringify(updatedUsers));
      localStorage.setItem('micro_tech_auth_user', JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'خطأ في عملية الدخول';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // Signup function
  const signup = useCallback(async (email: string, password: string, displayName: string, role: UserRole = 'customer'): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Validate input
      if (!email.includes('@') || password.length < 6 || !displayName.trim()) {
        throw new Error('بيانات التسجيل غير صحيحة');
      }

      // Check if user already exists
      const usersData = localStorage.getItem('micro_tech_users');
      const users = usersData ? JSON.parse(usersData) : [];
      
      if (users.some((u: User) => u.email === email)) {
        throw new Error('هذا البريد الإلكتروني مسجل بالفعل');
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}_${Math.random()}`,
        email,
        displayName,
        role,
        createdAt: new Date().toISOString(),
        isVerified: false,
      };

      // Store user
      const updatedUsers = [...users, newUser];
      localStorage.setItem('micro_tech_users', JSON.stringify(updatedUsers));
      localStorage.setItem('micro_tech_auth_user', JSON.stringify(newUser));

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'خطأ في عملية التسجيل';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('micro_tech_auth_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  // Check permission
  const checkPermission = useCallback((permission: string): boolean => {
    if (!authState.user) return false;
    return hasPermission(authState.user.role, permission);
  }, [authState.user]);

  // Check page access
  const checkCanAccessPage = useCallback((page: string): boolean => {
    if (!authState.user) return false;
    return canAccessPage(authState.user.role, page);
  }, [authState.user]);

  // Check if admin
  const isAdmin = useCallback((): boolean => {
    return authState.user?.role === 'admin';
  }, [authState.user]);

  // Update user
  const updateUser = useCallback((userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
      localStorage.setItem('micro_tech_auth_user', JSON.stringify(updatedUser));
      
      // Update in users list
      const usersData = localStorage.getItem('micro_tech_users');
      const users = usersData ? JSON.parse(usersData) : [];
      const updatedUsers = users.map((u: User) => (u.id === updatedUser.id ? updatedUser : u));
      localStorage.setItem('micro_tech_users', JSON.stringify(updatedUsers));
    }
  }, [authState.user]);

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    hasPermission: checkPermission,
    canAccessPage: checkCanAccessPage,
    updateUser,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth يجب أن يكون داخل AuthProvider');
  }
  return context;
};

// Hook to check if user has permission
export const usePermission = (permission: string): boolean => {
  const { hasPermission: checkPerm } = useAuth();
  return checkPerm(permission);
};

// Hook to check if user can access page
export const usePageAccess = (page: string): boolean => {
  const { canAccessPage } = useAuth();
  return canAccessPage(page);
};
