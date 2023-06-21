import React, { useRef, useState } from "react";
import { Modal, Button } from "@mui/material";
import deleteItem from "../../utils/deleteItem";
import updateItem from "../../utils/updateItem";
import useOutsideClick from "../../utils/useOutsideClose";


const ItemModal = ({ item, onClose }) => {
  const [checkDelete, setCheckDelete] = useState(false);
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  const [form, setForm] = useState({
    name: item.name,
    description: item.description,
    price: item.price,
    discount: item.discount,
    onSale: item.onSale,
    clearance: item.clearance,
  });

  const [file, setFile] = useState(null);

  /* const handleNameChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, name: e.target.value }));
  }; */

  const handleDescriptionChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, description: e.target.value }));
  };

  const handlePriceChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, price: e.target.value }));
  };

  const handleDiscountChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, discount: e.target.value }));
  };

  const onChangeImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(form, file);
    try {
      const isUpdated = await updateItem(item.id, form);
      if (isUpdated) {
        console.log(`${item.name} updated successfully`);
      } else {
        console.log("Item not found or could not be updated");
      }
    } catch (error) {
      console.log("Error updating item:", error);
    }
    onClose();
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
          <div className="bg-white rounded-lg p-6 w-1/2 relative"
            ref={modalRef}>
            <Button onClick={onClose} className="absolute top-2 right-2">
              X
            </Button>
            <h2 className="text-xl font-bold mb-2">{item && item.name}</h2>
            <form onSubmit={onSubmit}>
              <p>Description</p>
              <input
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={handleDescriptionChange}
              />
              <p>Price ($) </p>
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handlePriceChange}
              />
              <p>Discount (%)</p>
              <input
                type="number"
                placeholder="Discount"
                value={form.discount}
                onChange={handleDiscountChange}
              />
              <p>Image</p>
              <input
                type="file"
                className="w-full"
                onChange={onChangeImage}
                accept=".jpg,.jpeg,.png"
              />
              <button type="submit">Confirm changes</button>
            </form>
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
