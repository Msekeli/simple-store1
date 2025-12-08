import { Request, Response } from "express";
import { createProductRepository } from "../../../infrastructure/repositories/productRepository.js";
import { createCartRepository } from "../../../infrastructure/repositories/cartRepository.js";
import { makeAddToCart } from "../../../application/use-cases/addToCart.js";
import { makeUpdateCart } from "../../../application/use-cases/updateCart.js";

const productRepo = createProductRepository();
const cartRepo = createCartRepository();

const addToCart = makeAddToCart(productRepo, cartRepo);
const updateCart = makeUpdateCart(cartRepo);

export const cartController = {
  add: async (req: Request, res: Response) => {
    try {
      const { productId, quantity } = req.body;
      const q = Number(quantity);
      const updated = await addToCart(String(productId), q);
      res.status(201).json({ cart: updated });
    } catch (err: any) {
      const status = err?.status ?? 500;
      res.status(status).json({ message: err.message ?? "Error adding to cart" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { productId, quantity } = req.body;
      const q = Number(quantity);
      const updated = await updateCart(String(productId), q);
      res.json({ cart: updated });
    } catch (err: any) {
      const status = err?.status ?? 500;
      res.status(status).json({ message: err.message ?? "Error updating cart" });
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const current = await cartRepo.getCart();
      res.json({ cart: current });
    } catch (err: any) {
      res.status(500).json({ message: "Error reading cart" });
    }
  },
};
