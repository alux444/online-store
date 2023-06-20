import React, { useState, useEffect } from "react";
import { Modal, Button } from "@mui/material";
import createNewItem from "../../utils/createNewItem";

const AddItemModal = ({ item, onClose }) => {
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  
  const [form, setForm] = useState({
    name: toTitleCase(item),
    description: "",
    price: "",
    discount: "",
    onSale: false,
    clearance: false,
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
    console.log(await createNewItem({ formInfo: form, imageFile: file }));
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-1/2 relative">
          <Button onClick={onClose} className="absolute top-2 right-2">
            X
          </Button>
          <h2 className="text-xl font-bold mb-2">{toTitleCase(item)}</h2>
          <div>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={handleDescriptionChange}
              />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handlePriceChange}
              />
              <input
                type="number"
                placeholder="Discount"
                value={form.discount}
                onChange={handleDiscountChange}
              />
              <input type="file" className="w-full" onChange={onChangeImage} accept=".jpg,.jpeg,.png" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddItemModal;
