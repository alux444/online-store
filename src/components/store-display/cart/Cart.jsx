import React, { useState } from "react";
import CartModal from "./CartModal";

const Cart = () => {
  const [showCart, setShowCart] = useState(false);

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <div>
      <button onClick={() => setShowCart(true)}>Show Cart</button>
      <CartModal open={showCart} close={closeCart} />
    </div>
  );
};

export default Cart;
