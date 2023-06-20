import React from "react";
import { Modal, Button } from "@mui/material";

const ItemModal = ({ item, onClose }) => {
  return (
    <Modal open={true} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-1/2 relative">
          <Button onClick={onClose} className="absolute top-2 right-2">
            X
          </Button>
          <h2 className="text-xl font-bold mb-2">{item && item.name}</h2>
          <p>{item && item.description}</p>
          <p>${item && item.price}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ItemModal;
