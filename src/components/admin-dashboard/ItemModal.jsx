import React, { useState } from "react";
import { Modal, Button } from "@mui/material";

const ItemModal = ({ item, onClose }) => {
  const [edit, setEdit] = useState('');

  const handleChange = (event) => {
    event.preventDefault();
    
    console.log('Changing to:', edit);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-1/2 relative">
          <Button onClick={onClose} className="absolute top-2 right-2">
            X
          </Button>
          <h2 className="text-xl font-bold mb-2">{item && item.name}</h2>
          <form onSubmit={handleChange} >
            <input
              type="text"
              placeholder={item && item.description}
              value={edit}
              onChange={(event) => setEdit(event.target.value)}
              className="px-4 py-2 rounded-l border-none w-full text-gray-600"

            />
          </form>
          <p>${item && item.price}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ItemModal;
