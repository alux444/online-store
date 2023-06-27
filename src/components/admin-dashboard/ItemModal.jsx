import React, { useRef, useEffect, useState } from "react";
import { Modal, Button } from "@mui/material";
import deleteItem from "../../utils/deleteItem";
import updateItem from "../../utils/updateItem";
import useOutsideClick from "../../utils/useOutsideClose";
import convertDate from "../../utils/convertDate";
import noImage from "../../utils/noImage.svg";
import addImage from "../../utils/addImage";
import { validateName } from "../../utils/validateName";
import "./util.css";

const ItemModal = ({ item, onClose, itemUpdate }) => {
  const [checkDelete, setCheckDelete] = useState(false);
  const [message, setMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(item.imageUrl);
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  const [form, setForm] = useState({
    name: item.name,
    description: item.description,
    price: item.price,
    discount: item.discount,
    onSale: item.onSale,
    clearance: item.clearance,
    stock: item.stock,
    category: item.category,
  });

  useEffect(() => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      discount: item.discount,
      onSale: item.onSale,
      clearance: item.clearance,
      stock: item.stock,
      category: item.category,
    });
    if (item.imageUrl === "") {
      setPreviewImage(noImage);
    }
  }, [item]);

  const [file, setFile] = useState(null);
  const date = convertDate(item.timeCreated);

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

    const reader = new FileReader();
    reader.onload = () => {
      const imageDataURL = reader.result;
      setForm((prevForm) => ({
        ...prevForm,
        imageUrl: imageDataURL,
      }));
      setPreviewImage(imageDataURL);
    };
    reader.readAsDataURL(image);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = item.imageUrl;

      if (file) {
        imageUrl = await addImage(file, item.id);
      }

      const updatedImage = {
        ...form,
        imageUrl: imageUrl,
      };
      const nameIsValid = await validateName(form.name);

      if (nameIsValid || form.name === item.name) {
        const isUpdated = await updateItem(item.id, updatedImage);
        if (isUpdated) {
          const updatedItem = { ...item, ...updatedImage };
          itemUpdate(updatedItem);
          console.log(`${item.name} updated successfully`);
        } else {
          console.log("Item not found or could not be updated");
        }
        onClose();
      } else {
        setMessage("Name is already taken.");
      }
    } catch (error) {
      console.log("Error updating item:", error);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    console.log("Deleting:", item.name);

    try {
      const isDeleted = await deleteItem(item.id);
      if (isDeleted) {
        itemUpdate(null);
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
          <div
            className="bg-blue-50 rounded-lg p-6 lg:w-[80w] md:w-[80vw] sm:w-[90vw] max-h-[90vh] relative overflow-auto"
            ref={modalRef}
          >
            <button onClick={onClose} className="absolute top-1 right-2 p-2 border-none bg-blue-50 hover:text-[#315cfd]">
              X
            </button>
            <div className="flex align-center justify-center items-center flex-col">
              <form onSubmit={onSubmit}>
                <div className="flex align-center items-center justify-center flex-col">
                  <div className="w-5/6">
                    <input
                      type="text"
                      value={form.name}
                      onChange = {handleNameChange}
                      className={`w-full text-center ${
                        form.name.length > 30 ? 'text-lg' : 'text-2xl'
                      } overflow-auto border-none font-bold text-blue-800 placeholder-blue-800
                       bg-blue-50 hover:border hover:border-gray-300 rounded px-3 py-1`}
                    />
                  </div>
                  <p>Date created: {date}</p>
                  <br/>
                  <div className="flex align-center">
                    <label htmlFor="image-upload" className="relative">
                      <div className="file-input-mask">
                        <div className="flex align-center items-center justify-center text-center">
                          <input
                            id="image-upload"
                            type="file"
                            className="file-input"
                            onChange={onChangeImage}
                            accept=".jpg,.jpeg,.png"
                          />
                          <p className="overlay border-2 flex justify-center items-center text-center align-center text-xl text-white font-bold cursor-pointer">
                            Upload New Image?
                          </p>
                          <div className="relative">
                            <img
                              src={previewImage}
                              className="w-96 md:max-w-[80vw] border rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </label>
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
                <div className="flex align-center justify-center">
                  <button className="altbutton " type="submit">
                    Confirm changes
                  </button>
                </div>
              </form>
              <br/>
              <button
                onClick={() => setCheckDelete(true)}
                className="deletebutton hover:bg-[#ec2917] hover:text-white hover:border-white"
              >
                Delete {item && item.name}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center align-center justify-center">
          <div className="bg-blue-50 rounded-lg p-6 w-min-content relative">
            <button
              onClick={() => setCheckDelete(false)}
              className="absolute top-1 right-2 p-2 border-none bg-white hover:text-[#315cfd]"
            >
              X
            </button>
            <div className="flex align-center justify-center items-center flex-col">
              <h2 className="text-xl font-bold mb-2">{item && item.name}</h2>
              <br/>
              <p>Are you sure you want to delete</p>
              <p className="font-bold">{item && item.name}?</p>
              <br/>
              <Button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-r"
              >
                Yes, delete {item && item.name}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ItemModal;
