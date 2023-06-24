import React, { useState, useRef } from "react";
import { Modal, Button } from "@mui/material";
import createNewItem from "../../utils/createNewItem";
import useOutsideClick from "../../utils/useOutsideClose";


const AddItemModal = ({ item, onClose }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(form, file);
    console.log(await createNewItem(form, file));
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
     <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 sm:max-w-[80vw] lg:w-1/2 relative"
            ref={modalRef}>
            <Button onClick={onClose} className="absolute top-2 right-2">
              X
            </Button>
            <div className="flex align-center justify-center items-center flex-col">
              <form onSubmit={onSubmit}>
                <div className="flex align-center items-center justify-center flex-col">
                  <input
                    type="text"
                    placeholder={item}
                    onChange = {handleNameChange}
                    className="text-center text-xl font-bold text-black bg-white hover:border hover:border-gray-300 rounded px-3 py-1"
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
                      <span className="mr-1">Category:</span>
                      <select
                        value={form.category}
                        onChange={handleCategoryChange}
                        className="px-4 py-2 border md:w-[30vw] bg-white border-gray-300 rounded"
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
                        className=""
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
                <div className="lg:flex flex-wrap justify-center gap-4 align-center items-center">
                  <div className="flex justify-center items-center align-center">
                    <span>Normal Price ($) </span>
                    <input
                      type="number"
                      placeholder="Price"
                      value={form.price}
                      className="md:w-[17vw] lg:w-[10vw] w-[20%] ml-2"
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div className="mt-1 lg:mt-0 flex justify-center items-center align-center">
                    <span>Discount (-$)</span>
                    <input
                      type="number"
                      placeholder="Discount"
                      value={form.discount}
                      className="md:w-[15vw] lg:w-[10vw] w-[20%] ml-2"
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
                <br/>
                <div className="flex align-center justify-center">
                  <button type="submit">Add item</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </Modal>
  );
};

export default AddItemModal;
