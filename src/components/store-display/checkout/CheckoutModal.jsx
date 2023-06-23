import { Modal } from "@mui/material";
import React, { useRef, useState } from "react";
import useOutsideClick from "../../../utils/useOutsideClose";

const CheckoutModal = ({ open, close }) => {
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

  return (
    <Modal open={open}>
      <div className="h-screen w-screen flex align-center items-center justify-center">
        <div className="border-2 border-white bg-white p-5" ref={modalRef}>
          <h1 className="text-2xl font-bold">Payment</h1>
          <p>All transactions are secure and encrypted</p>
          <form className="flex flex-col items-center space-y-4 mt-3">
            <label>
              <input
                className="w-96 rounded-lg"
                type="text"
                value={cardNumber}
                onChange={handleCardNumber}
                placeholder="Card number"
              />
            </label>
            <label>
              <input
                className="w-96 rounded-lg"
                type="text"
                value={name}
                onChange={handleName}
                placeholder="Name on card"
              />
            </label>
            <div>
              <label>
                <input
                  className="w-58 rounded-lg mr-2"
                  type="text"
                  value={expirationDate}
                  onChange={handleExpirationDate}
                  placeholder="Expiration Date (MM / YY)"
                />
              </label>
              <label>
                <input
                  className="w-36 rounded-lg ml-1"
                  type="text"
                  value={securityCode}
                  onChange={handleSecurityCode}
                  placeholder="Security code"
                />
              </label>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
