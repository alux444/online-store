import React, { useState, useContext } from "react";
import CartModal from "./CartModal";
import { CartContext } from "../../../App";
import image from "../../../images/shopping-cart.png";

const Cart = ({wobble, setWobble}) => {
  const [showCart, setShowCart] = useState(false);

  const { cart, setCart } = useContext(CartContext);

  const closeCart = () => {
    setShowCart(false);
  };

  const total = cart.reduce((total, item) => {
    return total + item.amount * item.price;
  }, 0);

  const totalItems = cart.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  return (
    <div className="flex justify-center items-center mb-2">
      <button
        className="flex items-center font-bold text-lg wobbleting"
        onClick={() => setShowCart(true)}
        wobble={wobble}
      >
        <img src={image} className="w-10 mr-3" />${total} ({totalItems})
      </button>
      <CartModal open={showCart} close={closeCart} total={total} />
    </div>
  );
};

export default Cart;
