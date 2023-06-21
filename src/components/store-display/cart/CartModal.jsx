import { Modal } from "@mui/material";
import React, { useRef, useContext } from "react";
import useOutsideClick from "../../../utils/useOutsideClose";
import { CartContext } from "../../../App";

const CartModal = ({ open, close }) => {
  const { cart } = useContext(CartContext);

  const modalRef = useRef(null);

  useOutsideClick(modalRef, close);

  const total = cart.reduce((total, item) => {
    return total + item.amount * item.price;
  }, 0);

  return (
    <Modal open={open}>
      <div className="h-screen w-screen flex align-center items-center justify-center">
        <div
          className="w-min h-min border-2 border-white bg-white p-5"
          ref={modalRef}
        >
          <p>Total Cost: ${total}</p>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
