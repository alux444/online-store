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
          className="border-2 bg-white flex flex-col text-center p-4 rounded-lg max-w-[80vw]"
          ref={modalRef}
        >
          <h2>About ShopNameHere</h2>
          <br />
          <p>Shopnamehere is a project built by a team of 3.</p>
          <p>
            It is an online shopping site which includes an admin dashboard for
            CRUD operations on the store.
          </p>
          <p>
            The project is built on React for Frontend, Firebase for Backend,
            and TailwindCSS for styling.
          </p>
          <p>Note: Item data was randomly generated using mockaroo.</p>
          <p>Admin Dashboard access:</p>
          <small>Username: admin</small>
          <small>Password: admin</small>
          <br />
          <hr />
          <h2>Contributors</h2>
          <a href="https://github.com/alux444" target="_blank" rel="noreferrer">
            alux444
          </a>{" "}
          <a href="https://github.com/ckim349" target="_blank" rel="noreferrer">
            ckim349
          </a>{" "}
          <a href="https://github.com/eejl773" target="_blank" rel="noreferrer">
            eejl773
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default AboutModal;
