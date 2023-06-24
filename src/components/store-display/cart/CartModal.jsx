import { Modal } from "@mui/material";
import React, { useState, useRef, useContext } from "react";
import useOutsideClick from "../../../utils/useOutsideClose";
import { CartContext } from "../../../App";
import CartItemDisplay from "./CartItemDisplay";
import Checkout from "../checkout/Checkout";

const CartModal = ({ open, close, total }) => {
  const { cart, setCart } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const handleCardNumber = (e) => {
    setCardNumber(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleExpirationDate = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleSecurityCode = (e) => {
    setSecurityCode(e.target.value);
  };

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
            <div className="flex align-center items-center justify-center">
              <div className="border-2 border-white bg-white p-5">
                <h1 className="text-2xl font-bold">Payment</h1>
                <p>All transactions are secure and encrypted</p>
                <form className="flex flex-col items-center space-y-4 mt-3">
                  <label>
                    <input
                      className="w-96 rounded-lg sm:w-80"
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumber}
                      placeholder="Card number"
                    />
                  </label>
                  <label>
                    <input
                      className="w-96 rounded-lg sm:w-80"
                      type="text"
                      value={name}
                      onChange={handleName}
                      placeholder="Name on card"
                    />
                  </label>
                  <div>
                    <label>
                      <input
                        className="w-58 rounded-lg mr-2 sm:w-48"
                        type="text"
                        value={expirationDate}
                        onChange={handleExpirationDate}
                        placeholder="Expiration Date (MM / YY)"
                      />
                    </label>
                    <label>
                      <input
                        className="w-36 rounded-lg ml-1 sm:w-28"
                        type="text"
                        value={securityCode}
                        onChange={handleSecurityCode}
                        placeholder="Security code"
                      />
                    </label>
                  </div>
                  <button>Submit</button>
                </form>
                <button onClick={() => setShowCheckout(false)}>Return to cart</button>
              </div>
            </div>
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
