import { Request, Response } from "express";
import { createProductRepository } from "../../../infrastructure/repositories/productRepository.js";
import { makeGetAllProducts } from "../../../application/use-cases/getAllProducts.js";
import { makeGetProductById } from "../../../application/use-cases/getProductById.js";

const productRepo = createProductRepository();
const getAllProducts = makeGetAllProducts(productRepo);
const getProductById = makeGetProductById(productRepo);

export const productController = {
  list: async (req: Request, res: Response) => {
    try {
      const products = await getAllProducts();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unexpected error fetching products" });
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await getProductById(id);
      res.json(product);
    } catch (err: any) {
      const status = err?.status ?? 500;
      res.status(status).json({ message: err.message ?? "Error fetching product" });
    }
  },
};
