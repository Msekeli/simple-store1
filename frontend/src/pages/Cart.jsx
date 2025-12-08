import { useEffect, useState } from "react";
import { getCart, updateCart } from "../services/api";
import { useCartStore } from "../store/cart";
import { getProducts } from "../services/api";

export default function Cart() {
  const { cart, setCart } = useCartStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCart().then((res) => setCart(res.cart));
    getProducts().then(setProducts);
  }, []);

  const findProduct = (id) => products.find((p) => p.id === id);

  const handleUpdate = async (id, qty) => {
    if (qty < 1) qty = 1;
    const updated = await updateCart(id, qty);
    setCart(updated.cart);
  };

  const handleRemove = async (id) => {
    const updated = await updateCart(id, 0);
    setCart(updated.cart);
  };

  const total = cart.reduce((sum, item) => {
    const p = findProduct(item.productId);
    return p ? sum + p.price * item.quantity : sum;
  }, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 && (
        <p className="text-gray-500">Your cart is empty.</p>
      )}

      <div className="space-y-4">
        {cart.map((item) => {
          const p = findProduct(item.productId);
          if (!p) return null;

          return (
            <div
              key={item.productId}
              className="bg-white shadow p-4 rounded-lg flex gap-4 items-center"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{p.title}</h2>
                <p className="text-gray-600 text-sm">{p.description}</p>
                <p className="font-bold text-blue-600 mt-2">R {p.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdate(item.productId, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 rounded cursor-pointer"
                >
                  -
                </button>

                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdate(item.productId, Number(e.target.value))
                  }
                  className="w-16 border p-1 rounded text-center"
                />

                <button
                  onClick={() => handleUpdate(item.productId, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.productId)}
                className="text-red-600 font-semibold hover:text-red-800 ml-4"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 text-right">
          <h2 className="text-xl font-bold">Total: R {total.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}
