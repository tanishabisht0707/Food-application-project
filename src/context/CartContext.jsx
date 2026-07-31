import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
const [cart, setCart] = useState(() => {
   const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
});
useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (restaurant) => {
    setCart((prev) => [...prev, restaurant]);
  };

  const removeFromCart = (id) => {
    console.log(cart)
    setCart((prev) => prev.filter((item) => item?.id !== id));
  };
  const clearCart = () => {
    setCart([]);
  };
  const updateQuantity = (id, newQty, newTotal) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, qty: newQty, total: newTotal } : item
    )
  );
};
  return (
    <cartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart,updateQuantity }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);
