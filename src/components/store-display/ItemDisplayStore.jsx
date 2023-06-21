import { useState } from "react";
import ItemDisplayModal from "./ItemDisplayModal";

const ItemDisplayStore = ({ item }) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const randomNumber = Math.floor(Math.random() * 3);

  const otherHeaders = ["Great Deal!", "What a Bargain!", "While Stocks Last!"];

  const discountPrice = item.price - item.discount;

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
            ${discountPrice} <s>${item.price}</s>
          </p>
        ) : (
          <p>${item.price}</p>
        )}

        <br />
      </div>
      <button>Add to Cart</button>
      <button onClick={() => setOpen(true)}>Show More</button>
      <ItemDisplayModal open={open} close={closeModal} item={item} />
    </div>
  );
};

export default ItemDisplayStore;
