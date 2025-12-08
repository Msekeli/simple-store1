import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  setCart: (items) => set({ cart: items }),
}));
