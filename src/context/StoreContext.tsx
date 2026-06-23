import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Review, CartItem, Order } from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data';

interface StoreContextType {
  products: Product[];
  reviews: Review[];
  cart: CartItem[];
  wishlist: Product[];
  compareList: Product[];
  orders: Order[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  createOrder: (
    customerName: string,
    customerPhone: string,
    customerState: string,
    customerAddress: string,
    notes?: string
  ) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addReview: (productId: string, userName: string, rating: number, comment: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Core State with Local Cache
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Client state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Initialize data
  useEffect(() => {
    // Products
    const cachedProducts = localStorage.getItem('micro_tech_products');
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('micro_tech_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    // Reviews
    const cachedReviews = localStorage.getItem('micro_tech_reviews');
    if (cachedReviews) {
      setReviews(JSON.parse(cachedReviews));
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('micro_tech_reviews', JSON.stringify(INITIAL_REVIEWS));
    }

    // Orders (Initial seed orders for rich admin stats)
    const cachedOrders = localStorage.getItem('micro_tech_orders');
    if (cachedOrders) {
      setOrders(JSON.parse(cachedOrders));
    } else {
      const seedOrders: Order[] = [
        {
          id: 'MT-7489',
          customerName: 'أمين بلعيدي',
          customerPhone: '0555314782',
          customerState: 'Sétif - 19',
          customerAddress: 'وسط المدينة، سطيف',
          items: [
            {
              productId: 'hp-elitebook-840-g8',
              productName: 'HP EliteBook 840 G8',
              price: 89000,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80'
            }
          ],
          totalPrice: 89000,
          status: 'completed',
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          notes: 'يرجى الاتصال قبل التسليم بنصف ساعة'
        },
        {
          id: 'MT-9012',
          customerName: 'حمزة بوسعادة',
          customerPhone: '0671842055',
          customerState: "M'Sila - 28",
          customerAddress: 'بلدية برهوم، حي الهواري بومدين',
          items: [
            {
              productId: 'dell-xps-15-9510',
              productName: 'Dell XPS 15 9510 Touch Laptop',
              price: 215000,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1593642702821-c8da2696406e?w=600&auto=format&fit=crop&q=80'
            },
            {
              productId: 'logitech-g502-hero',
              productName: 'Logitech G502 Hero Gaming Mouse',
              price: 9500,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80'
            }
          ],
          totalPrice: 224500,
          status: 'confirmed',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          notes: 'تسليم يد ليد في برهوم'
        },
        {
          id: 'MT-3412',
          customerName: 'لينا بودراع',
          customerPhone: '0791224509',
          customerState: 'Alger - 16',
          customerAddress: 'الأبيار، الجزائر العاصمة',
          items: [
            {
              productId: 'hp-elitebook-840-g8',
              productName: 'HP EliteBook 840 G8',
              price: 89000,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80'
            },
            {
              productId: 'rk-r87-keyboard',
              productName: 'Royal Kludge RK87 Mechanical',
              price: 11500,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80'
            }
          ],
          totalPrice: 100500,
          status: 'shipped',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          notes: 'شحن سريع عبر يالدين'
        },
        {
          id: 'MT-1134',
          customerName: 'سعيد حدبي',
          customerPhone: '0560123456',
          customerState: 'Oran - 31',
          customerAddress: 'حي الياسمين، وهران',
          items: [
            {
              productId: 'lenovo-thinkpad-t14-g2',
              productName: 'Lenovo ThinkPad T14 Gen 2',
              price: 98000,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=600&auto=format&fit=crop&q=80'
            }
          ],
          totalPrice: 98000,
          status: 'pending',
          createdAt: new Date().toISOString(),
          notes: 'تأكيد حالة البطارية قبل الإرسال'
        }
      ];
      setOrders(seedOrders);
      localStorage.setItem('micro_tech_orders', JSON.stringify(seedOrders));
    }

    // Cart load
    const cachedCart = localStorage.getItem('micro_tech_cart');
    if (cachedCart) {
      setCart(JSON.parse(cachedCart));
    }

    // Wishlist load
    const cachedWishlist = localStorage.getItem('micro_tech_wishlist');
    if (cachedWishlist) {
      setWishlist(JSON.parse(cachedWishlist));
    }

    // Compare load
    const cachedCompare = localStorage.getItem('micro_tech_compare');
    if (cachedCompare) {
      setCompareList(JSON.parse(cachedCompare));
    }
  }, []);

  // Save actions
  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('micro_tech_products', JSON.stringify(updatedProducts));
  };

  const saveReviews = (updatedReviews: Review[]) => {
    setReviews(updatedReviews);
    localStorage.setItem('micro_tech_reviews', JSON.stringify(updatedReviews));
  };

  const saveOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('micro_tech_orders', JSON.stringify(updatedOrders));
  };

  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('micro_tech_cart', JSON.stringify(updatedCart));
  };

  const saveWishlist = (updatedWishlist: Product[]) => {
    setWishlist(updatedWishlist);
    localStorage.setItem('micro_tech_wishlist', JSON.stringify(updatedWishlist));
  };

  const saveCompare = (updatedCompareList: Product[]) => {
    setCompareList(updatedCompareList);
    localStorage.setItem('micro_tech_compare', JSON.stringify(updatedCompareList));
  };

  // 2. Action Handlers
  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    let newCart = [...cart];
    
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({ product, quantity });
    }
    saveCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.product.id !== productId);
    saveCart(newCart);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const toggleWishlist = (product: Product) => {
    const index = wishlist.findIndex(item => item.id === product.id);
    let newWishlist = [...wishlist];
    if (index > -1) {
      newWishlist.splice(index, 1);
    } else {
      newWishlist.push(product);
    }
    saveWishlist(newWishlist);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleCompare = (product: Product) => {
    const index = compareList.findIndex(item => item.id === product.id);
    let newCompare = [...compareList];
    if (index > -1) {
      newCompare.splice(index, 1);
    } else {
      if (newCompare.length >= 4) {
        // Limit to 4 for UX
        newCompare.shift();
      }
      newCompare.push(product);
    }
    saveCompare(newCompare);
  };

  const isInCompare = (productId: string) => {
    return compareList.some(item => item.id === productId);
  };

  const createOrder = (
    customerName: string,
    customerPhone: string,
    customerState: string,
    customerAddress: string,
    notes?: string
  ): Order => {
    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.product.quantity,
      image: item.product.images[0]
    }));

    const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const newOrder: Order = {
      id: `MT-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerPhone,
      customerState,
      customerAddress,
      items: orderItems,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      notes
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);
    
    // Decrement stock levels
    const updatedProducts = products.map(prod => {
      const cartMatched = cart.find(item => item.product.id === prod.id);
      if (cartMatched) {
        return {
          ...prod,
          countInStock: Math.max(0, prod.countInStock - cartMatched.quantity)
        };
      }
      return prod;
    });
    saveProducts(updatedProducts);

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map(ord => 
      ord.id === orderId ? { ...ord, status } : ord
    );
    saveOrders(updatedOrders);
  };

  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const generatedId = newProdData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 100);
    const newProduct: Product = {
      ...newProdData,
      id: generatedId,
      rating: 5.0,
      reviewsCount: 0
    };
    const updatedProducts = [newProduct, ...products];
    saveProducts(updatedProducts);
  };

  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    saveProducts(updatedProducts);
  };

  const deleteProduct = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    saveProducts(updatedProducts);
  };

  const addReview = (productId: string, userName: string, rating: number, comment: string) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      productName: prod.name,
      userName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      isVerifiedPurchase: true
    };

    const updatedReviews = [newReview, ...reviews];
    saveReviews(updatedReviews);

    // Recompute average rating
    const matchingReviews = updatedReviews.filter(r => r.productId === productId);
    const sum = matchingReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = matchingReviews.length > 0 ? parseFloat((sum / matchingReviews.length).toFixed(1)) : 5;

    const updatedProducts = products.map(p => 
      p.id === productId 
        ? { ...p, rating: avgRating, reviewsCount: matchingReviews.length } 
        : p
    );
    saveProducts(updatedProducts);
  };

  return (
    <StoreContext.Provider value={{
      products,
      reviews,
      cart,
      wishlist,
      compareList,
      orders,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      toggleCompare,
      isInCompare,
      createOrder,
      updateOrderStatus,
      addProduct,
      updateProduct,
      deleteProduct,
      addReview,
      isAdminMode,
      setIsAdminMode
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
