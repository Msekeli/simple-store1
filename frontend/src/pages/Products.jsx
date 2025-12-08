import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../services/api";
import { useCartStore } from "../store/cart";
import { useToastStore } from "../store/toast";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  const setCart = useCartStore((state) => state.setCart);
  const showToast = useToastStore((state) => state.showToast);

  // Load products from backend
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => showToast("Failed to load products", "error"));
  }, []);

  // Add item to cart
  const handleAdd = async (productId) => {
    try {
      const updated = await addToCart(productId, 1);
      setCart(updated.cart);
      showToast("Item added to cart!", "success");
    } catch (err) {
      showToast("Could not add item", "error");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Available Products
      </h1>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={handleAdd}
          />
        ))}
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No products available.
        </p>
      )}
    </div>
  );
}
