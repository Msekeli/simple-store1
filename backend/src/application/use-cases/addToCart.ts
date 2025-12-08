import { createCartRepository } from "../../infrastructure/repositories/cartRepository.js";
import { Product } from "../../domain/entities/Product.js";

export type ProductRepositoryPort = {
  getById: (id: string) => Promise<Product | null>;
};

export type CartRepositoryPort = {
  addItem: (item: { productId: string; quantity: number }) => Promise<void>;
  getCart: () => Promise<{ productId: string; quantity: number }[]>;
};

export const makeAddToCart = (productRepo: ProductRepositoryPort, cartRepo: CartRepositoryPort) => {
  return async function addToCart(productId: string, quantity: number) {
    if (!productId) {
      const err = new Error("productId is required");
      (err as any).status = 400;
      throw err;
    }
    if (quantity <= 0) {
      const err = new Error("quantity must be greater than zero");
      (err as any).status = 400;
      throw err;
    }

    const product = await productRepo.getById(productId);
    if (!product) {
      const err = new Error("Product not found");
      (err as any).status = 404;
      throw err;
    }

    await cartRepo.addItem({ productId, quantity });
    return await cartRepo.getCart();
  };
};
