import { useContext, useEffect } from "react";
import { CartContext } from "../App";

export const useAccessCart = () => {
  const { cart, setCart } = useContext(CartContext);

  const saveCart = () => {
    const currentCart = JSON.stringify(cart);
    localStorage.setItem("savedCart", currentCart);
  };

  const loadCart = () => {
    const loadedCartString = localStorage.getItem("savedCart");
    const loadedCart = JSON.parse(loadedCartString);
    if (loadedCart !== null) {
      setCart(loadedCart);
    }
  };

  return { saveCart, loadCart };
};
