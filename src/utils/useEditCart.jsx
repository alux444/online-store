import { useContext } from "react";
import { CartContext } from "../App";
import { searchForItem } from "./searchForItem";

const useEditCart = () => {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = async (item, amountToAdd) => {
    const existingItemIndex = cart.findIndex(
      (currentItem) => currentItem.name === item.name
    );

    const fetchedItem = await searchForItem(item.name);

    const realPrice = fetchedItem.onSale
      ? fetchedItem.price - fetchedItem.discount
      : fetchedItem.price;

    if (existingItemIndex !== -1) {
      setCart((prevCart) =>
        prevCart.map((cartItem, index) => {
          if (index === existingItemIndex) {
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
        {
          name: item.name,
          amount: amountToAdd,
          price: realPrice,
          imageUrl: fetchedItem.imageUrl,
        },
      ]);
    }
  };

  const removeFromCart = async (item, amountToRemove) => {
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
