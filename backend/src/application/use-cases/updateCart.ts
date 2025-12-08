import { Product } from "../../domain/entities/Product.js";

export type CartRepositoryPort = {
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  getCart: () => Promise<{ productId: string; quantity: number }[]>;
};

export const makeUpdateCart = (cartRepo: CartRepositoryPort) => {
  return async function updateCart(productId: string, quantity: number) {
    if (!productId) {
      const err = new Error("productId is required");
      (err as any).status = 400;
      throw err;
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      const err = new Error("quantity must be an integer >= 0");
      (err as any).status = 400;
      throw err;
    }

    await cartRepo.updateQuantity(productId, quantity);
    return await cartRepo.getCart();
  };
};
