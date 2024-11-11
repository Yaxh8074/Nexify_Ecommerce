import { create } from 'zustand';
import { CartItem, User, Product } from '../types';
import { CurrencyCode } from '../api/currency';

interface StoreState {
  cart: CartItem[];
  user: User | null;
  wishlist: string[];
  recentlyViewed: string[];
  currency: CurrencyCode;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setUser: (user: User | null) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  addToRecentlyViewed: (productId: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  user: null,
  wishlist: [],
  recentlyViewed: [],
  currency: 'USD' as CurrencyCode,
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  setUser: (user) => set({ user }),
  clearCart: () => set({ cart: [] }),
  toggleWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    })),
  addToRecentlyViewed: (productId) =>
    set((state) => ({
      recentlyViewed: [
        productId,
        ...state.recentlyViewed.filter((id) => id !== productId),
      ].slice(0, 5),
    })),
  setCurrency: (currency) => set({ currency }),
}));