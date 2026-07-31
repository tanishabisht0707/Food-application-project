import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header({onToggleCart}) {
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 font-display text-lg font-bold text-white shadow-sm shadow-brand-200">
            F
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-gray-900">
            Foodie
          </span>
        </Link>

        <div
        onClick={onToggleCart}
          className="relative cursor-pointer flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition hover:brightness-105 active:scale-95"
        >
          <ShoppingCart  size={16} />
          <span className="hidden sm:inline">Cart</span>

          {cart?.length > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-pink-600 shadow-sm">
              {cart?.length }
            </span>
          )}
        </div>
      </div>
    </header>
  );
}