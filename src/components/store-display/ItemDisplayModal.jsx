import React, { useRef } from "react";
import { Modal } from "@mui/material";
import useOutsideClick from "../../utils/useOutsideClose";

const ItemDisplayModal = ({ open, close, item }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, close);

  return (
    <Modal open={open}>
      <div className="w-screen h-screen flex align-center justify-center text-center items-center">
        <div
          className="border-2 border-blue border-solid h-[min-content] bg-white"
          ref={modalRef}
        >
          <h2>{item.name}</h2>
          <img src={item.imageUrl} className="max-w-[50vw] max-h[50vh]" />
          <h2>{item.onSale ? item.price - item.discount : item.price} each.</h2>
          <p>{item.description}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ItemDisplayModal;
