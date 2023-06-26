import React, { useState, useContext } from "react";
import CartModal from "./CartModal";
import { CartContext } from "../../../App";
import image from "../../../images/shopping-cart.png";

const Cart = ({wobble}) => {
  const [showCart, setShowCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const closeCart = () => {
    setShowCart(false);
  };

  const total = cart.reduce((total, item) => {
    return total + item.amount * item.price;
  }, 0).toFixed(2);

  const totalItems = cart.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  return (
    <div className="flex justify-center items-center mb-2">
      <button
        className="flex items-center font-bold text-lg wobble lgbutton"
        onClick={() => setShowCart(true)}
        wobble={wobble}
      >
      <div className="relative mr-2">
        <img src={image} className="w-10 mr-3" />
        <span className="absolute top-0 right-0 bg-black rounded-full px-2 py-1 text-white text-xs">
          {totalItems}
        </span>
      </div>
      ${total}
      </button>
      <CartModal open={showCart} close={closeCart} total={total} />
    </div>
  );
};

export default Cart;
