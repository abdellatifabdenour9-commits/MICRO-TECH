export type ProductCondition = 'new' | 'used';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number; // in DZD
  originalPrice?: number; // for discounts
  condition: ProductCondition;
  batteryHealth?: string; // e.g. "92% ممتازة" or "جديد"
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  screen?: string;
  description: string;
  images: string[];
  specs: ProductSpec[];
  countInStock: number;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  isVerifiedPurchase: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerState: string; // Wilaya (58 wilayas of Algeria)
  customerAddress: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export type UserRole = 'admin' | 'customer' | 'teacher' | 'employee' | 'guest';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  isVerified?: boolean;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  displayName: string;
  role?: UserRole;
}

export interface ProtectedComponentProps {
  requiredRole?: UserRole;
  requiredPermissions?: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}
