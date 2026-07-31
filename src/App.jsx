import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./components/Cart";
import { useState } from "react";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-[#fffafc]">
      <Header onToggleCart={() => setIsCartOpen(true)}/>
<Cart
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

    </div>
  );
}

export default App;
