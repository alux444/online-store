import React, { useState } from "react";
import createNewItem from "../utils/createNewItem";

const Test = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    onSale: false,
    clearance: false,
  });

  const [file, setFile] = useState(null);

  const handleNameChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, name: e.target.value }));
  };

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
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleNameChange}
        />
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
        <input type="file" onChange={onChangeImage} accept=".jpg,.jpeg,.png" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Test;
