import { useContext, useState } from "react";
import ItemDisplayModal from "./ItemDisplayModal";
import { CartContext } from "../../App";

const ItemDisplayStore = ({ item }) => {
  const [open, setOpen] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const randomNumber = Math.floor(Math.random() * 3);
  const otherHeaders = ["Great Deal!", "What a Bargain!", "While Stocks Last!"];
  const realPrice = item.onSale ? item.price - item.discount : item.price;

  const closeModal = () => {
    setOpen(false);
  };

  const addOneToCart = () => {
    setCart((prevCart) => [
      ...prevCart,
      { name: item.name, amount: 1, price: realPrice },
    ]);
  };

  return (
    <div className="block w-[25vw] border-[1px] justify-center align-center">
      {item.onSale ? (
        <h3>On Special! Save ${item.discount}</h3>
      ) : (
        <h3>{otherHeaders[randomNumber]}</h3>
      )}
      <div className="flex justify-center align-center">
        <img src={item.imageUrl} className="max-w-[20vw] max-h-10vh" />
      </div>
      <div>
        <p>{item.name}</p>
        <br />
        {item.onSale ? (
          <p>
            ${realPrice} <s>${item.price}</s>
          </p>
        ) : (
          <p>${item.price}</p>
        )}

        <br />
      </div>
      <button onClick={() => addOneToCart()}>Add to Cart</button>
      <button onClick={() => setOpen(true)}>Show More</button>
      <ItemDisplayModal open={open} close={closeModal} item={item} />
    </div>
  );
};

export default ItemDisplayStore;
