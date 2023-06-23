import { Modal } from "@mui/material";
import React, { useRef, useContext } from "react";
import useOutsideClick from "../../../utils/useOutsideClose";
import { CartContext } from "../../../App";
import CartItemDisplay from "./CartItemDisplay";
import Checkout from "../checkout/Checkout";

const CartModal = ({ open, close, total }) => {
  const { cart, setCart } = useContext(CartContext);

  const modalRef = useRef(null);

  useOutsideClick(modalRef, close);

  const items = cart.map((item) => {
    return <CartItemDisplay key={item.name} item={item} />;
  });

  return (
    <Modal open={open}>
      <div className="h-screen w-screen flex align-center items-center justify-center">
        <div
          className="border-2 border-white bg-white p-5 flex align-center justify-center items-center text-center flex-col gap-1 rounded-lg "
          ref={modalRef}
        >
          <button onClick={() => setCart([])}>Clear Cart?</button>
          <br />
          {items}
          <br />
          <p>Total Cost: ${total}</p>
          <Checkout />
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
