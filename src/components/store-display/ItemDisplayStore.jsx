import { useState } from "react";
import ItemDisplayModal from "./ItemDisplayModal";
import useEditCart from "../../utils/useEditCart";
import image from "../../utils/noImage.svg";

const ItemDisplayStore = ({ item, setWobble }) => {
  const [open, setOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const realPrice = item.onSale ? item.price - item.discount : item.price;
  const { addToCart } = useEditCart();

  const addOneToCart = async () => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);

    addToCart(item, 1);
    setWobble(1);
    setTimeout(() => {
      setWobble(0);
      setIsAddingToCart(false);
    }, 1000);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col w-[20vw] xl:w-[24vw] lg:w-[28vw] md:w-[44vw] sm:w-[70vw] border-[1px] sm:h-min border-blue-500 justify-between align-center p-3 bg-blue-100 shadow-xl dispdiv">
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
      <div className="flex gap-2 flex-wrap justify-center items-center flex-col">
        <div className="overflow-hidden max-w-[100%] h-12 flex justify-center items-center">
          <h2>{item.name}</h2>
        </div>
        {item.onSale ? (
          <p>
            <span className="font-bold price">
              ${parseFloat(realPrice).toFixed(2)}
            </span>{" "}
            <s>${item.price}</s>
          </p>
        ) : (
          <p className="price">${parseFloat(item.price).toFixed(2)}</p>
        )}

        <br />
      </div>

      <div className="flex align-center justify-center items-center">
        {item.stock > 0 ? (
          <button
            className="mx-2 altbutton"
            disabled={isAddingToCart}
            onClick={() => addOneToCart()}
          >
            {isAddingToCart ? "Loading..." : "Add to Cart"}
          </button>
        ) : (
          <button
            className="deletebutton hover:bg-[#ec2917] hover:text-white hover:border-white"
            disabled="true"
          >
            Out of Stock
          </button>
        )}
        <button className="mx-2 altbutton" onClick={() => setOpen(true)}>
          Show More
        </button>
      </div>
      <ItemDisplayModal open={open} close={closeModal} item={item} />
    </div>
  );
};

export default ItemDisplayStore;
