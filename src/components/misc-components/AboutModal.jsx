import { Modal } from "@mui/material";
import React, { useRef } from "react";
import useOutsideClick from "../../utils/useOutsideClose";

const AboutModal = ({ open, close }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, close);

  return (
    <Modal open={open}>
      <div className="w-screen h-screen flex justify-center items-center align-center">
        <div
          className="border-2 bg-white flex flex-col text-center"
          ref={modalRef}
        >
          <h2>About ShopNameHere</h2>
          <p>Shopnamehere is a project built by a team of 3.</p>
          <p>
            The project is built on React for Frontend, Firebase for Backend,
            and TailwindCSS for styling.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AboutModal;
