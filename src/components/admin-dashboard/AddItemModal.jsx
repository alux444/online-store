import React, { useState, useRef } from "react";
import { Modal } from "@mui/material";
import createNewItem from "../../utils/createNewItem";
import useOutsideClick from "../../utils/useOutsideClose";
import { validateName } from "../../utils/validateName";

const AddItemModal = ({ item, onClose, itemAdd }) => {
  const [message, setMessage] = useState("");

  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const [form, setForm] = useState({
    name: toTitleCase(item),
    category: "produce",
    stock: 0,
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

  const handleCategoryChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, category: e.target.value }));
  };

  const handleStockChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, stock: e.target.value }));
  };

  const onChangeImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const validateForm = () => {
    if (form.price == "" || form.discount == "") {
      setMessage("A price and discount value is required.");
      return false;
    } else if (form.price < 0 || form.discount < 0) {
      setMessage("The price and discount must be positive.");
      return false;
    } else if (form.name.length <= 0 || form.name.length > 50) {
      setMessage("The item name should be between 1-50 characters");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    const formIsValid = validateForm();
    if (!formIsValid) {
      return false;
    }

    const nameIsValid = await validateName(form.name);

    if (nameIsValid) {
      createNewItem(form, file, itemAdd);
      console.log(form.name + " added successfully");
      onClose();
    } else {
      setMessage("Name is already taken.");
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          className="bg-blue-50 rounded-lg p-6 lg:w-[80w] md:w-[80vw] sm:w-[90vw] max-h-[90vh] relative overflow-auto"
          ref={modalRef}
        >
          <button
            onClick={onClose}
            className="absolute top-1 right-2 p-2 border-none bg-blue-50 hover:text-[#315cfd]"
          >
            X
          </button>
          <div className="flex align-center justify-center items-center flex-col">
            <form onSubmit={onSubmit}>
              <div className="flex align-center items-center justify-center flex-col gap-1">
                <label>Item Name</label>
                <input
                  type="text"
                  placeholder={item}
                  onChange={handleNameChange}
                  className="text-center text-xl font-bold text-black bg-blue-50 hover:border hover:border-gray-300 rounded px-3 py-1"
                />
                <br />
                <div className="flex align-center">
                  <p>Select image:</p>
                  <input
                    type="file"
                    className="w-full"
                    onChange={onChangeImage}
                    accept=".jpg,.jpeg,.png"
                  />
                </div>

                <br />
                <div className="flex mt-3 align-center justify-center items-center gap-4 flex-wrap">
                  <div className="">
                    <span className="mr-2">Category:</span>
                    <select
                      value={form.category}
                      onChange={handleCategoryChange}
                      className="px-4 py-2 border w-40 md:w-[20vw] bg-white border-gray-300 rounded"
                    >
                      <option value="produce">Produce</option>
                      <option value="seafood">Seafood</option>
                      <option value="bakery">Bakery</option>
                      <option value="liquor">Liquor</option>
                      <option value="chilled">Chilled</option>
                      <option value="frozen">Frozen</option>
                      <option value="deli">Deli</option>
                      <option value="grocery">Grocery</option>
                    </select>
                  </div>
                  <div className="">
                    <span className="mr-1">Stock on Hand:</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={form.stock}
                      className="px-4 py-2 border w-40 md:w-[20vw] bg-white border-gray-300 rounded"
                      onChange={handleStockChange}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div>
                <p>Description</p>
                <textarea
                  placeholder="Description"
                  value={form.description}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-1"
                  onChange={handleDescriptionChange}
                />
              </div>
              <br />
              <div className="flex flex-wrap justify-center gap-4 align-center items-center">
                <div className="flex justify-center items-center align-center mr-6">
                  <span className="mr-1">Normal Price ($): </span>
                  <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    className="px-4 py-2 border w-32 md:w-[15vw] bg-white border-gray-300 rounded"
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="mt-1 lg:mt-0 flex justify-center items-center align-center">
                  <span className="mr-1">Discount (-$):</span>
                  <input
                    type="number"
                    placeholder="Discount"
                    value={form.discount}
                    className="px-4 py-2 border w-32 md:w-[15vw] bg-white border-gray-300 rounded"
                    onChange={handleDiscountChange}
                  />
                </div>
              </div>
              <br />
              <div className="flex items-center justify-center gap-3 mb-3">
                <div>
                  <span>On sale?</span>
                  <input
                    type="checkbox"
                    checked={form.onSale}
                    className="mx-5"
                    onChange={(e) =>
                      setForm((prevForm) => ({
                        ...prevForm,
                        onSale: e.target.checked,
                      }))
                    }
                  />
                </div>

                <div>
                  <span>On clearance?</span>
                  <input
                    type="checkbox"
                    checked={form.clearance}
                    className="mx-5"
                    onChange={(e) =>
                      setForm((prevForm) => ({
                        ...prevForm,
                        clearance: e.target.checked,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex align-center justify-center">
                <p>{message}</p>
              </div>
              <div className="flex align-center justify-center mb-2">
                <button className="altbutton" type="submit">
                  Add item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddItemModal;
