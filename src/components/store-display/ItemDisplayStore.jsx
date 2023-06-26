import { useState } from "react";
import ItemDisplayModal from "./ItemDisplayModal";
import useEditCart from "../../utils/useEditCart";
import image from "../../utils/noImage.svg";

const ItemDisplayStore = ({ item, setWobble }) => {
  const [open, setOpen] = useState(false);

  const realPrice = item.onSale ? item.price - item.discount : item.price;
  const { addToCart } = useEditCart();

  const addOneToCart = () => {
    addToCart(item, 1);
    setWobble(1);
    setTimeout(() => {
      setWobble(0);
    }, 1000);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="block w-[20vw] lg:w-[28vw] md:[44vw] sm:w-[70vw] border-[1px] border-blue-500 justify-center align-center p-3 bg-blue-100 shadow-xl dispdiv">
      {item.clearance ? (
        <h3 className="font-bold headerbutton">
          <span>Clearance Item!</span>
        </h3>
      ) : item.onSale ? (
        <h3 className="font-bold salebutton">
          On Special! Save ${item.discount}
        </h3>
      ) : (
        <h3 className="font-bold dealbutton">Great Deal!</h3>
      )}
      <div className="flex justify-center align-center mt-3">
        <img
          src={item.imageUrl == "" ? image : item.imageUrl}
          className="max-w-[90%] border-[1px] border-blue-600 bg-blue-50"
        />
      </div>
      <div className="flex gap-2 align-center flex-wrap justify-center items-center">
        <h2>{item.name}</h2>
        {item.onSale ? (
          <p>
            <span className="font-bold price">${realPrice}</span>{" "}
            <s>${item.price}</s>
          </p>
        ) : (
          <p className="price">${item.price}</p>
        )}

        <br />
      </div>
      <button className="mx-2 altbutton" onClick={() => addOneToCart()} >
        Add to Cart
      </button>
      <button className="mx-2 altbutton" onClick={() => setOpen(true)}>
        Show More
      </button>
      <ItemDisplayModal open={open} close={closeModal} item={item} />
    </div>
  );
};

export default ItemDisplayStore;
