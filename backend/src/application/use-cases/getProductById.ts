import { Product } from "../../domain/entities/Product.js";

export type ProductRepositoryPort = {
  getById: (id: string) => Promise<Product | null>;
};

export const makeGetProductById = (productRepo: ProductRepositoryPort) => {
  return async function getProductById(id: string): Promise<Product> {
    const product = await productRepo.getById(id);
    if (!product) {
      const err = new Error("Product not found");
      (err as any).status = 404;
      throw err;
    }
    return product;
  };
};
