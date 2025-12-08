import { CartItem } from "../../domain/entities/CartItem.js";

type CartRepository = {
  getCart: () => Promise<CartItem[]>;
  addItem: (item: CartItem) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clear: () => Promise<void>;
};

export const createCartRepository = (): CartRepository => {
  // ⭐ In-memory cart using a Map (safe for ESM)
  const cart = new Map<string, number>();

  return {
    getCart: async () => {
      const items: CartItem[] = [];
      for (const [productId, quantity] of cart.entries()) {
        items.push({ productId, quantity });
      }
      return items;
    },

    addItem: async ({ productId, quantity }: CartItem) => {
      const current = cart.get(productId) ?? 0;
      cart.set(productId, current + quantity);
    },

    updateQuantity: async (productId: string, quantity: number) => {
      if (quantity <= 0) {
        cart.delete(productId);
      } else {
        cart.set(productId, quantity);
      }
    },

    clear: async () => {
      cart.clear();
    }
  };
};
