import { useContext } from "react";
import { CartContext } from "../App";

const useEditCart = () => {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (item, amountToAdd) => {
    const existingItem = cart.find(
      (currentItem) => currentItem.name === item.name
    );

    const realPrice = item.onSale ? item.price - item.discount : item.price;

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) => {
          if (cartItem.name === item.name) {
            return {
              ...cartItem,
              amount: cartItem.amount + amountToAdd,
            };
          }
          return cartItem;
        })
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { name: item.name, amount: amountToAdd, price: realPrice },
      ]);
    }
  };

  const removeFromCart = (item, amountToRemove) => {
    const existingItem = cart.find(
      (currentItem) => currentItem.name === item.name
    );

    if (existingItem.amount <= amountToRemove) {
      setCart((prevCart) =>
        prevCart.filter((cartItem) => cartItem.name !== item.name)
      );
    } else {
      setCart((prevCart) =>
        prevCart.map((cartItem) => {
          if (cartItem.name === item.name) {
            return {
              ...cartItem,
              amount: cartItem.amount - amountToRemove,
            };
          }
          return cartItem;
        })
      );
    }
  };

  return { addToCart, removeFromCart };
};

export default useEditCart;
