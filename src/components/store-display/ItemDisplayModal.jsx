import { useRef, useState } from "react";
import { Modal } from "@mui/material";
import useOutsideClick from "../../utils/useOutsideClose";

const ItemDisplayModal = ({ open, close, item }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, close);

  const [count, setCount] = useState(1);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const salePrice = item.price - item.discount;

  const overallCost = count * (item.onSale ? salePrice : item.price);

  return (
    <Modal open={open}>
      <div className="w-screen h-screen flex align-center justify-center text-center items-center">
        <div
          className="border-2 border-blue border-solid h-[min-content] bg-white p-5 rounded-lg "
          ref={modalRef}
        >
          <h2>{item.name}</h2>
          <img src={item.imageUrl} className="max-w-[50vw] max-h[50vh]" />
          <h2>{item.onSale ? salePrice : item.price} each.</h2>
          <p>{item.description}</p>
          <p>Add: {count} to Cart</p>
          <button onClick={incrementCount}>+</button>
          <button onClick={decrementCount}>-</button>
          <small>This will cost : ${overallCost}</small>
        </div>
      </div>
    </Modal>
  );
};

export default ItemDisplayModal;
