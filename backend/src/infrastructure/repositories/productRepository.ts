import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Product } from "../../domain/entities/Product.js";

type ProductRepository = {
  getAll: () => Promise<Product[]>;
  getById: (id: string) => Promise<Product | null>;
};

// Resolve filesystem-safe path (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCTS_PATH = path.join(__dirname, "../data/products.json");

// ⭐ FIXED: never null — always an array
let cachedProducts: Product[] = [];
let isLoaded = false;

async function loadProducts(): Promise<Product[]> {
  if (isLoaded) return cachedProducts;

  const raw = await fs.promises.readFile(PRODUCTS_PATH, "utf-8");
  cachedProducts = JSON.parse(raw);
  isLoaded = true;

  return cachedProducts;
}

export const createProductRepository = (): ProductRepository => ({
  getAll: async () => await loadProducts(),

  getById: async (id: string) => {
    const products = await loadProducts();
    return products.find((p) => p.id === id) ?? null;
  }
});
