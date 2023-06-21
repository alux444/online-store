import { Modal } from "@mui/material";
import React, { useRef, useContext } from "react";
import useOutsideClick from "../../../utils/useOutsideClose";

const CheckoutModal = ({ open, close }) => {
  const modalRef = useRef(null);

  useOutsideClick(modalRef, close);

  return (
    <Modal open={open}>
      <div className="h-screen w-screen flex align-center items-center justify-center">
        <div className="border-2 border-white bg-white p-5" ref={modalRef}>
          <p>checkout</p>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
