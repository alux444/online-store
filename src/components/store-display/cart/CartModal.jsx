import { Modal } from "@mui/material";
import React, { useState, useRef, useContext } from "react";
import useOutsideClick from "../../../utils/useOutsideClose";
import { CartContext } from "../../../App";
import CartItemDisplay from "./CartItemDisplay";
import CheckoutModal from "../checkout/CheckoutModal";

const CartModal = ({ open, close, total }) => {
  const { cart, setCart } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const modalRef = useRef(null);

  useOutsideClick(modalRef, close);

  const items = cart.map((item) => {
    return <CartItemDisplay key={item.name} item={item} />;
  });

  return (
    <Modal open={open} className="flex align-center items-center justify-center">
      <div className="h-screen w-screen flex align-center items-center justify-center">
        <div
          className="border-2 border-white bg-white p-5 flex align-center justify-center items-center text-center flex-col gap-1 rounded-lg "
          ref={modalRef}
        >
          {showCheckout ? (
            <CheckoutModal setShowCheckout={setShowCheckout} />
          ) : (
            <div>
              <button onClick={() => setCart([])}>Clear Cart?</button>
              <br />
              {items}
              <br />
              <p>Total Cost: ${total}</p>
              <button onClick={() => setShowCheckout(true)}>Proceed to checkout</button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
