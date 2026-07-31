import { ShoppingBag, X, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE = "https://media-assets.swiggy.com/swiggy/image/upload/";

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item?.total || 0), 0);
  const totalQty = cart.reduce((sum, item) => sum + (item?.qty || 1), 0);

  const unitPriceOf = (item) => (item?.total || 0) / (item?.qty || 1);

  const handleIncrease = (item) => {
    const newQty = (item.qty || 1) + 1;
    updateQuantity(item.id, newQty, unitPriceOf(item) * newQty);
  };

  const handleDecrease = (item) => {
    const newQty = Math.max(1, (item.qty || 1) - 1);
    updateQuantity(item.id, newQty, unitPriceOf(item) * newQty);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40  bg-black/50 backdrop-blur-sm transition-opacity"
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300  ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between bg-gradient-to-r from-pink-600 to-pink-500 px-5 py-4 shadow-sm">
            <div className="flex items-center gap-2 text-white">
              <ShoppingBag size={20} />
              <h2 className="text-lg font-semibold tracking-tight">Your Cart</h2>
              {cart.length > 0 && (
                <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
                  {totalQty}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
                <ShoppingBag size={40} className="mb-3 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">Your cart is empty</p>
                <p className="mt-1 text-xs text-gray-400">Add something tasty to get started</p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                
                  key={item?.id ?? idx}
                  onClick={() => navigate(`/restaurant/${item?.id}`)}
                  className="flex gap-3 rounded-2xl cursor-pointer bg-white p-3 shadow-sm ring-1 ring-black/5"
                >
                  <img
                    src={`${IMAGE_BASE}${item?.cloudinaryImageId}`}
                    alt={item?.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <h3 className="truncate text-sm font-semibold text-gray-900">{item?.name}</h3>

                      {item?.selectedCuisines?.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.selectedCuisines.map((c) => (
                            <span
                              key={c}
                              className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-medium text-pink-600"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="mt-1 text-xs text-gray-500">{item?.costForTwo}</p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1">
                        <button
                          onClick={() => handleDecrease(item)}
                          disabled={(item?.qty || 1) <= 1}
                          aria-label={`Decrease quantity of ${item?.name}`}
                          className="flex h-5 w-5 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-4 text-center text-xs font-semibold text-gray-900">
                          {item?.qty || 1}
                        </span>
                        <button
                          onClick={() => handleIncrease(item)}
                          aria-label={`Increase quantity of ${item?.name}`}
                          className="flex h-5 w-5 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-gray-900">
                        ₹{(item?.total ?? 0).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item?.id)}
                      aria-label={`Remove ${item?.name}`}
                      className="mt-2 flex w-fit cursor-pointer items-center gap-1 text-xs font-medium text-red-500 transition hover:text-red-600"
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="mx-auto block pt-1 text-xs font-medium text-gray-400 transition hover:text-gray-600"
              >
                Clear cart
              </button>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-100 bg-white p-4">
              <div className="mb-1 flex justify-between text-sm text-gray-500">
                <span>{totalQty} {totalQty === 1 ? "item" : "items"}</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-xl font-semibold text-pink-600">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
              <button className="w-full rounded-full bg-pink-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700 active:scale-[0.98]">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;