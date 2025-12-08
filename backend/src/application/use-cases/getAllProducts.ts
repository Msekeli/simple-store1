import { Product } from "../../domain/entities/Product.js";

export type ProductRepositoryPort = {
  getAll: () => Promise<Product[]>;
};

export const makeGetAllProducts = (productRepo: ProductRepositoryPort) => {
  return async function getAllProducts(): Promise<Product[]> {
    return await productRepo.getAll();
  };
};
