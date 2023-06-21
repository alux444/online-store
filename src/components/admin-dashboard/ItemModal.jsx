import React, { useState } from "react";
import { Modal, Button } from "@mui/material";
import deleteItem from "../../utils/deleteItem";

const ItemModal = ({ item, onClose }) => {
  const [edit, setEdit] = useState("");
  const [checkDelete, setCheckDelete] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();

    console.log("Changing to:", edit);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    console.log("Deleting:", item.name);

    try {
      const isDeleted = await deleteItem(item.id);
      if (isDeleted) {
        console.log(`${item.name} deleted successfully`);
      } else {
        console.log("Item not found or could not be deleted");
      }
    } catch (error) {
      console.log("Error deleting item:", error);
    }

    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      {!checkDelete ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-1/2 relative">
            <Button onClick={onClose} className="absolute top-2 right-2">
              X
            </Button>
            <h2 className="text-xl font-bold mb-2">{item && item.name}</h2>
            <form onSubmit={handleChange}>
              <input
                type="text"
                placeholder={item && item.description}
                value={edit}
                onChange={(event) => setEdit(event.target.value)}
                className="px-4 py-2 rounded-l border-none w-full text-gray-600"
              />
            </form>
            <p>${item && item.price}</p>
            <Button
              onClick={() => setCheckDelete(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-r"
            >
              Delete {item && item.name}
            </Button>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-1/2 relative">
            <Button onClick={() => setCheckDelete(false)} className="absolute top-2 right-2">
              X
            </Button>
            <h2 className="text-xl font-bold mb-2">{item && item.name}</h2>
            <p>Are you sure you want to delete {item && item.name}?</p>
            <Button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-r"
            >
              Yes, delete {item && item.name}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ItemModal;
