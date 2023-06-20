import React, { useState } from "react";
import { Modal, Button } from "@mui/material";

const ItemModal = ({ item, onClose }) => {
  return (
    <Modal open={true} onClose={onClose}>
      <div className="modal">
        <div className="modal-content">
          <h2>{item && item.name}</h2>
          <p>{item && item.description}</p>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ItemModal;
