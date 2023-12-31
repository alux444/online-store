import { Modal } from "@mui/material";
import React, { useState, useRef, useContext, useEffect } from "react";
import useOutsideClick from "../../../utils/useOutsideClose";
import { CartContext, UserContext } from "../../../App";
import CartItemDisplay from "./CartItemDisplay";
import Checkout from "../checkout/Checkout";
import { useAccessCart } from "../../../utils/useAccessCart";

const CartModal = ({ open, close, total }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shouldSaveCart, setShouldSaveCart] = useState(false);
  const modalRef = useRef(null);

  const { saveCart } = useAccessCart();
  useOutsideClick(modalRef, close);

  const items = cart.map((item) => {
    return <CartItemDisplay key={item.name} item={item} />;
  });

  useEffect(() => {
    if (shouldSaveCart) {
      saveCart();
      setShouldSaveCart(false);
    }
  }, [shouldSaveCart]);

  const clearCart = () => {
    setCart([]);
    setShouldSaveCart(true);
  };

  return (
    <Modal
      open={open}
      className="flex align-center items-center justify-center"
    >
      <div className="h-screen w-screen flex align-center items-center justify-center">
        <div
          className="border-2 border-white bg-white p-5 flex align-center justify-center items-center text-center flex-col gap-1 rounded-lg bg-blue-50  max-w-[90vw] max-h-[90vh]"
          ref={modalRef}
        >
          <div className="overflow-auto max-w-full max-h-full">
            {showCheckout ? (
              <Checkout setShowCheckout={setShowCheckout} />
            ) : (
              <div>
                <button className="altbutton" onClick={clearCart}>
                  Clear Cart?
                </button>
                <br />
                {items}
                <br />
                <div className="flex gap-2 align-center justify-center items-center">
                  <p className="price mb-3">
                    Total: $
                    {user.loggedIn
                      ? parseFloat(total * 0.95).toFixed(2)
                      : parseFloat(total).toFixed(2)}
                  </p>
                  {user.loggedIn && <s>{total}</s>}
                </div>
                {user.loggedIn && <small>5% discount applied!</small>}
                <div className="flex justify-center">
                  <button
                    className="paybutton"
                    onClick={() => setShowCheckout(true)}
                  >
                    {" "}
                    Pay
                    <svg className="svgIcon" viewBox="0 0 576 512">
                      <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
