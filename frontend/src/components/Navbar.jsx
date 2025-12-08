import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart";

export default function Navbar() {
  const cartCount = useCartStore((state) => state.cart.length);

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-xl font-semibold tracking-wide">
          Simple Store
        </Link>

        <Link
          to="/cart"
          className="relative text-white text-lg hover:opacity-80"
        >
          Cart
          <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {cartCount}
          </span>
        </Link>
      </div>
    </header>
  );
}
