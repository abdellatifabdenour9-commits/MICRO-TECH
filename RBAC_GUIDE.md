# دليل استخدام نظام الأدوار والصلاحيات
## RBAC System Implementation Guide

---

## 📖 مقدمة

هذا الدليل يشرح كيفية استخدام نظام الأدوار والصلاحيات (RBAC) المطبق على التطبيق.

---

## 🚀 البدء السريع

### 1. تسجيل الدخول

```typescript
// استيراد Hook المصادقة
import { useAuth } from './context/AuthContext';

function LoginExample() {
  const { login, signup, logout, user } = useAuth();
  
  // تسجيل دخول
  const handleLogin = async () => {
    await login('admin@micro-tech.com', 'admin123');
  };
  
  // إنشاء حساب جديد
  const handleSignup = async () => {
    await signup('user@example.com', 'password123', 'Ahmed', 'customer');
  };
  
  // تسجيل خروج
  const handleLogout = () => {
    logout();
  };
  
  return (
    <>
      {user ? (
        <>
          <p>مرحباً {user.displayName}</p>
          <button onClick={handleLogout}>تسجيل خروج</button>
        </>
      ) : (
        <>
          <button onClick={handleLogin}>دخول</button>
          <button onClick={handleSignup}>تسجيل جديد</button>
        </>
      )}
    </>
  );
}
```

### 2. التحقق من الصلاحيات

```typescript
import { useAuth, usePermission } from './context/AuthContext';
import { PERMISSIONS } from './authRoles';

function AdminFeature() {
  const { user, isAdmin, hasPermission } = useAuth();
  
  // التحقق من الدور
  if (!isAdmin()) {
    return <div>أنت لست مسؤولاً</div>;
  }
  
  // التحقق من الصلاحية
  const canManage = hasPermission(PERMISSIONS.MANAGE_PRODUCTS);
  
  return (
    <>
      {canManage && (
        <button>إدارة المنتجات</button>
      )}
    </>
  );
}

// أو استخدام Hook مختصر
function ProductManager() {
  const hasAccess = usePermission(PERMISSIONS.MANAGE_PRODUCTS);
  
  if (!hasAccess) {
    return <div>ليس لديك صلاحية</div>;
  }
  
  return <ProductForm />;
}
```

### 3. حماية المكونات

```typescript
import { ProtectedComponent } from './components/ProtectedRoute';
import { PERMISSIONS } from './authRoles';

function MyPage() {
  return (
    <>
      <h1>الصفحة الرئيسية</h1>
      
      {/* إخفاء العناصر الإدارية عن العملاء */}
      <ProtectedComponent requiredRole="admin">
        <AdminPanel />
      </ProtectedComponent>
      
      {/* إخفاء بناءً على الصلاحيات */}
      <ProtectedComponent 
        requiredPermissions={[PERMISSIONS.MANAGE_ORDERS]}
        fallback={<p>ليس لديك صلاحية لهذا القسم</p>}
      >
        <OrderManagement />
      </ProtectedComponent>
    </>
  );
}
```

### 4. حماية المسارات

```typescript
import { ProtectedRoute } from './components/ProtectedRoute';

function Router() {
  return (
    <>
      <Route path="/admin">
        <ProtectedRoute 
          requiredRole="admin"
          fallback={<UnauthorizedPage />}
        >
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
    </>
  );
}
```

---

## 🔐 أنواع الحماية المتاحة

### 1. حماية بناءً على الدور

```typescript
<ProtectedRoute requiredRole="admin">
  <AdminContent />
</ProtectedRoute>

// أو عدة أدوار
<ProtectedRoute requiredRole={["admin", "employee"]}>
  <AdminOrEmployeeContent />
</ProtectedRoute>
```

### 2. حماية بناءً على الصلاحيات

```typescript
<ProtectedRoute 
  requiredPermissions={[PERMISSIONS.MANAGE_PRODUCTS]}
>
  <ProductManagement />
</ProtectedRoute>

// صلاحيات متعددة
<ProtectedRoute 
  requiredPermissions={[
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_ORDERS
  ]}
>
  <AdvancedManagement />
</ProtectedRoute>
```

### 3. حماية بناءً على مستوى الدور

```typescript
<ProtectedRoute 
  requiredRoleLevel={3} // موظف أو أعلى
>
  <EmployeeFeature />
</ProtectedRoute>
```

---

## 📚 الصلاحيات المتاحة

```typescript
import { PERMISSIONS } from './authRoles';

// الصلاحيات الإدارية
PERMISSIONS.MANAGE_PRODUCTS      // إدارة المنتجات
PERMISSIONS.MANAGE_ORDERS        // إدارة الطلبات
PERMISSIONS.MANAGE_USERS         // إدارة المستخدمين
PERMISSIONS.VIEW_ANALYTICS       // عرض التحليلات
PERMISSIONS.VIEW_SETTINGS        // عرض الإعدادات
PERMISSIONS.MANAGE_INVENTORY     // إدارة المخزون
PERMISSIONS.VIEW_ADMIN_PANEL     // عرض لوحة التحكم

// صلاحيات العملاء
PERMISSIONS.VIEW_PRODUCTS        // عرض المنتجات
PERMISSIONS.PURCHASE_PRODUCTS    // شراء المنتجات
PERMISSIONS.VIEW_CART            // عرض السلة
PERMISSIONS.VIEW_WISHLIST        // عرض المفضلة
PERMISSIONS.VIEW_PROFILE         // عرض الملف الشخصي
PERMISSIONS.VIEW_ORDERS          // عرض الطلبات

// صلاحيات أخرى
PERMISSIONS.MANAGE_COURSES       // إدارة الدورات
PERMISSIONS.VIEW_STUDENTS        // عرض الطلاب
PERMISSIONS.PROCESS_ORDERS       // معالجة الطلبات
PERMISSIONS.MANAGE_SUPPORT       // إدارة الدعم
```

---

## 🛠️ البرمجيات الوسيطة (Middleware)

### استخدام البرمجيات الوسيطة

```typescript
import {
  requirePermission,
  requireRole,
  requireMinimumRoleLevel,
  validateRouteAccess,
  getAllowedRoutes
} from './authMiddleware';

// فحص الصلاحية
const canManage = requirePermission(PERMISSIONS.MANAGE_PRODUCTS);
if (canManage(userRole)) {
  // السماح بالوصول
}

// فحص الدور
const isAdmin = requireRole('admin');
if (isAdmin(userRole)) {
  // السماح بالوصول
}

// فحص مستوى الدور
const isEmployee = requireMinimumRoleLevel(3);
if (isEmployee(userRole)) {
  // السماح بالوصول
}

// التحقق الشامل
if (validateRouteAccess(userRole, 'admin', [PERMISSIONS.MANAGE_PRODUCTS])) {
  // السماح بالوصول
}

// الحصول على الصفحات المسموح بها
const allowedPages = getAllowedRoutes(userRole);
```

---

## 👥 الأدوار المعرفة

### 1. المسؤول (Admin)
- **المستوى:** 4 (الأعلى)
- **الصلاحيات:** كاملة
- **مثال:**
```typescript
const adminUser = {
  id: 'admin_123',
  email: 'admin@micro-tech.com',
  displayName: 'مسؤول النظام',
  role: 'admin',
  createdAt: '2024-01-01T00:00:00Z',
  isVerified: true
};
```

### 2. الموظف (Employee)
- **المستوى:** 3
- **الصلاحيات:** معالجة الطلبات والدعم
- **مثال:**
```typescript
const employeeUser = {
  id: 'emp_456',
  email: 'employee@micro-tech.com',
  displayName: 'موظف المبيعات',
  role: 'employee',
  createdAt: '2024-01-02T00:00:00Z'
};
```

### 3. المعلم (Teacher)
- **المستوى:** 2
- **الصلاحيات:** إدارة الدورات
- **مثال:**
```typescript
const teacherUser = {
  id: 'teacher_789',
  email: 'teacher@micro-tech.com',
  displayName: 'معلم البرمجة',
  role: 'teacher',
  createdAt: '2024-01-03T00:00:00Z'
};
```

### 4. العميل (Customer)
- **المستوى:** 1
- **الصلاحيات:** الشراء والتسوق
- **مثال:**
```typescript
const customerUser = {
  id: 'cust_101',
  email: 'customer@example.com',
  displayName: 'أحمد محمد',
  role: 'customer',
  createdAt: '2024-01-04T00:00:00Z'
};
```

### 5. الزائر (Guest)
- **المستوى:** 0 (الأقل)
- **الصلاحيات:** قراءة فقط
- **مثال:**
```typescript
const guestUser = {
  id: null,
  email: null,
  displayName: 'زائر',
  role: 'guest',
  createdAt: null
};
```

---

## 🔄 سير عمل المصادقة

### 1. التسجيل (Sign Up)

```
المستخدم ينقر على "تسجيل جديد"
  ↓
يملأ النموذج (بريد، كلمة مرور، اسم)
  ↓
يختار الدور (عميل، معلم، موظف)
  ↓
يتم التحقق من البيانات
  ↓
تنشاء حساب جديد
  ↓
حفظ في localStorage
  ↓
تسجيل دخول تلقائي
```

### 2. تسجيل الدخول (Login)

```
المستخدم ينقر على "دخول"
  ↓
يملأ البريد والكلمة
  ↓
يتم التحقق من البيانات
  ↓
البحث عن المستخدم
  ↓
حفظ الجلسة
  ↓
تحديث واجهة المستخدم
```

### 3. الوصول للصفحة المحمية

```
المستخدم يحاول الوصول لصفحة محمية
  ↓
فحص وجود المستخدم
  ↓
فحص الدور المطلوب
  ↓
فحص الصلاحيات المطلوبة
  ↓
سماح أو رفض
```

---

## 📊 مثال عملي شامل

```typescript
import React, { useState } from 'react';
import { useAuth, usePermission } from './context/AuthContext';
import { ProtectedComponent, ProtectedRoute } from './components/ProtectedRoute';
import { PERMISSIONS } from './authRoles';

export function AdminDashboard() {
  const { user, isAdmin, logout, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');
  
  // التحقق من الوصول
  if (!user || !isAdmin()) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">ليس لديك صلاحية للوصول لهذه الصفحة</p>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <h1>مرحباً {user.displayName}</h1>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        {/* الإحصائيات - يمكن للجميع رؤيتها */}
        <div className="bg-blue-100 p-4 rounded">
          <h3>الطلبات</h3>
          <p>150</p>
        </div>
        
        {/* إدارة المنتجات - صلاحية محددة */}
        <ProtectedComponent 
          requiredPermissions={[PERMISSIONS.MANAGE_PRODUCTS]}
        >
          <div className="bg-green-100 p-4 rounded">
            <h3>المنتجات</h3>
            <p>45</p>
          </div>
        </ProtectedComponent>
        
        {/* إدارة المستخدمين - صلاحية محددة */}
        <ProtectedComponent 
          requiredPermissions={[PERMISSIONS.MANAGE_USERS]}
        >
          <div className="bg-yellow-100 p-4 rounded">
            <h3>المستخدمين</h3>
            <p>230</p>
          </div>
        </ProtectedComponent>
        
        {/* التحليلات */}
        <ProtectedComponent 
          requiredPermissions={[PERMISSIONS.VIEW_ANALYTICS]}
        >
          <div className="bg-purple-100 p-4 rounded">
            <h3>الإيرادات</h3>
            <p>850,000 د.ج</p>
          </div>
        </ProtectedComponent>
      </div>
      
      {/* التابات */}
      <div className="flex gap-4 mb-8 border-b">
        <button 
          onClick={() => setActiveTab('stats')}
          className={activeTab === 'stats' ? 'font-bold border-b-2' : ''}
        >
          الإحصائيات
        </button>
        
        <ProtectedComponent 
          requiredPermissions={[PERMISSIONS.MANAGE_PRODUCTS]}
        >
          <button 
            onClick={() => setActiveTab('products')}
            className={activeTab === 'products' ? 'font-bold border-b-2' : ''}
          >
            المنتجات
          </button>
        </ProtectedComponent>
        
        <ProtectedComponent 
          requiredPermissions={[PERMISSIONS.MANAGE_ORDERS]}
        >
          <button 
            onClick={() => setActiveTab('orders')}
            className={activeTab === 'orders' ? 'font-bold border-b-2' : ''}
          >
            الطلبات
          </button>
        </ProtectedComponent>
      </div>
      
      {/* المحتوى */}
      <div>
        {activeTab === 'stats' && <StatsTab />}
        
        <ProtectedComponent requiredPermissions={[PERMISSIONS.MANAGE_PRODUCTS]}>
          {activeTab === 'products' && <ProductsTab />}
        </ProtectedComponent>
        
        <ProtectedComponent requiredPermissions={[PERMISSIONS.MANAGE_ORDERS]}>
          {activeTab === 'orders' && <OrdersTab />}
        </ProtectedComponent>
      </div>
      
      {/* زر تسجيل الخروج */}
      <button onClick={logout} className="mt-8 bg-red-500 text-white px-4 py-2 rounded">
        تسجيل خروج
      </button>
    </div>
  );
}
```

---

## 🐛 استكشاف الأخطاء

### المستخدم لا يرى لوحة التحكم

```typescript
// تحقق من:
1. هل المستخدم مسجل دخول؟
   const { user } = useAuth();
   console.log(user);

2. هل الدور "admin"؟
   console.log(user?.role);

3. هل يوجد الحماية على المكون؟
   <ProtectedRoute requiredRole="admin">
```

### الصلاحيات غير تعمل

```typescript
// تحقق من:
1. هل استوردت PERMISSIONS بشكل صحيح؟
   import { PERMISSIONS } from './authRoles';

2. هل الدور له هذه الصلاحية؟
   const { hasPermission } = useAuth();
   console.log(hasPermission(PERMISSIONS.MANAGE_PRODUCTS));

3. هل الصلاحية معرفة في authRoles.ts؟
   export const PERMISSIONS = {
     MANAGE_PRODUCTS: 'manage:products',
     ...
   };
```

### الحالة لا تتحدث

```typescript
// تحقق من:
1. هل AuthProvider موجود؟
   <AuthProvider>
     <App />
   </AuthProvider>

2. هل useAuth داخل AuthProvider؟
   // خطأ: useAuth خارج AuthProvider
   // صحيح: useAuth داخل مكون بداخل AuthProvider
```

---

## 📚 المراجع

- [authRoles.ts](../src/authRoles.ts) - تعريف الأدوار
- [AuthContext.tsx](../src/context/AuthContext.tsx) - إدارة المصادقة
- [ProtectedRoute.tsx](../src/components/ProtectedRoute.tsx) - حماية المسارات
- [authMiddleware.ts](../src/authMiddleware.ts) - البرمجيات الوسيطة

---

**آخر تحديث:** 2026-06-23  
**الإصدار:** 1.0
