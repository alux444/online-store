import { useContext } from "react";
import { CartContext } from "../App";

const useAddToCart = () => {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (item, amountToAdd) => {
    console.log(item);
    console.log(amountToAdd);

    if (item == null) {
      console.log("aaaa");
      return;
    }

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

  return addToCart;
};

export default useAddToCart;
