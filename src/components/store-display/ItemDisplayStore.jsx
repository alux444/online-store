import { useState } from "react";
import ItemDisplayModal from "./ItemDisplayModal";
import useEditCart from "../../utils/useEditCart";
import image from "../../utils/noImage.svg";

const ItemDisplayStore = ({ item }) => {
  const [open, setOpen] = useState(false);

  const realPrice = item.onSale ? item.price - item.discount : item.price;
  const { addToCart } = useEditCart();

  const addOneToCart = () => {
    addToCart(item, 1);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="block w-[20vw] lg:w-[28vw] md:[44vw] sm:w-[70vw] border-[1px] justify-center align-center p-3">
      {item.clearance ? (
        <h3 className="font-bold">Clearance Item!</h3>
      ) : item.onSale ? (
        <h3 className="font-bold">On Special! Save ${item.discount}</h3>
      ) : (
        <h3 className="font-bold">Great Deal!</h3>
      )}
      <div className="flex justify-center align-center">
        <img
          src={item.imageUrl == "" ? image : item.imageUrl}
          className="max-w-[90%] max-h-10vh"
        />
      </div>
      <div>
        <p>{item.name}</p>
        <br />
        {item.onSale ? (
          <p>
            <span className="font-bold">${realPrice}</span> <s>${item.price}</s>
          </p>
        ) : (
          <p>${item.price}</p>
        )}

        <br />
      </div>
      <button className="mx-2" onClick={() => addOneToCart()}>
        Add to Cart
      </button>
      <button className="mx-2" onClick={() => setOpen(true)}>
        Show More
      </button>
      <ItemDisplayModal open={open} close={closeModal} item={item} />
    </div>
  );
};

export default ItemDisplayStore;
