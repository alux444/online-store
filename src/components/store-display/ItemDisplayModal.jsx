import { useRef, useState } from "react";
import { Modal } from "@mui/material";
import useOutsideClick from "../../utils/useOutsideClose";
import useEditCart from "../../utils/useEditCart";
import image from "../../utils/noImage.svg";

const ItemDisplayModal = ({ open, close, item }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, close);
  const { addToCart } = useEditCart();

  const [count, setCount] = useState(1);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addCountToCart = () => {
    addToCart(item, count);
    console.log(item.category);
  };

  const salePrice = item.price - item.discount;
  const overallCost = count * (item.onSale ? salePrice : item.price);

  return (
    <Modal open={open}>
      <div className="w-screen h-screen flex align-center justify-center text-center items-center">
        <div
          className="border-2 border-blue border-solid h-[min-content] bg-white p-5 rounded-lg max-w-[75vw]"
          ref={modalRef}
        >
          <h2>{item.name}</h2>
          <div className="align-center flex flex-col justify-center">
            <img
              src={item.imageUrl == "" ? image : item.imageUrl}
              className="max-h-[50vh]"
            />
          </div>
          <h2 className="text-lg">
            ${item.onSale ? salePrice : item.price}/ea
          </h2>
          <br />
          <p>{item.description}</p>
          <br />
          <p>Add: {count} to Cart</p>
          <button onClick={incrementCount}>+</button>
          <button onClick={decrementCount}>-</button>
          <br />
          <small>This will cost : ${overallCost}</small>
          <br />
          <button onClick={addCountToCart}>Add to Cart!</button>
        </div>
      </div>
    </Modal>
  );
};

export default ItemDisplayModal;
