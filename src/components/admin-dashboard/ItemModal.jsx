import React, { useRef, useEffect, useState } from "react";
import { Modal, Button } from "@mui/material";
import deleteItem from "../../utils/deleteItem";
import updateItem from "../../utils/updateItem";
import useOutsideClick from "../../utils/useOutsideClose";
import convertDate from "../../utils/convertDate";
import noImage from "../../utils/noImage.svg";
import addImage from "../../utils/addImage";
import "./util.css";


const ItemModal = ({ item, onClose, itemUpdate }) => {
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
  }, [item]);

  const [file, setFile] = useState(null);
  const [isImageFocused, setIsImageFocused] = useState(false);
  const date = convertDate(item.timeCreated);

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
    try {
      let imageUrl = item.imageUrl; 

      if (file) {
        imageUrl = await addImage(file, item.id);
      }

      const updatedImage = {
        ...form,
        imageUrl: imageUrl, 
      };
      const isUpdated = await updateItem(item.id, updatedImage);
      if (isUpdated) {
        const updatedItem = { ...item, ...updatedImage };
        itemUpdate(updatedItem);
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

  const handleMouseEnter = () => {
    setIsImageFocused(true);
  };

  const handleMouseLeave = () => {
    setIsImageFocused(false);
  };

  const getImage = () => {
    let image = item.imageUrl === '' ? noImage : item.imageUrl;
    return (
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img
          src={image}
          className={`max-w-[20vw] max-h-10vh border rounded-lg ${isImageFocused ? 'opacity-75 shadow-lg' : ''}`}
        />
        {isImageFocused && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-bold opacity-0 transition-opacity duration-300 pointer-events-none">
            Edit image
          </div>
        )}
      </div>
    );
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
            <p>Date created: {date}</p>
            <br/>
            <form onSubmit={onSubmit}>
              <div>
                <div className="flex justify-center align-center">
                  <label htmlFor="image-upload" className="relative">
                    {getImage()}
                    <div className="file-input-mask">
                      <input
                        id="image-upload"
                        type="file"
                        className="file-input"
                        onChange={onChangeImage}
                        accept=".jpg,.jpeg,.png"
                      />
                    </div>
                  </label>
                </div>
                <span className="mr-2">Category:</span>
                <select
                  value={form.category}
                  onChange={handleCategoryChange}
                  className="px-4 py-2 border mx-5 w-1/4 bg-white border-gray-300 rounded"
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
                <span>Stock on Hand:</span>
                <input
                  type="number"
                  placeholder="0"
                  value={form.stock}
                  className="w-1/4 mx-5"
                  onChange={handleStockChange}
                />
              </div>
              <br/>
              <div>
                <p>Description</p>
                <input
                  type="text"
                  placeholder="Description"
                  value={form.description}
                  className="w-full"
                  onChange={handleDescriptionChange}
                />
              </div>
              <br/>
              <div> 
                <span>Normal Price ($) </span>
                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  className="w-1/5 mx-5"
                  onChange={handlePriceChange}
                />
                <span>Discount (-$)</span>
                <input
                  type="number"
                  placeholder="Discount"
                  value={form.discount}
                  className="w-1/4 mx-5"
                  onChange={handleDiscountChange}
                />
              </div>
              <br/>
              <div>
                <span>On sale?</span>
                <input
                  type="checkbox"
                  checked={form.onSale}
                  className="w-1/4 mx-5 bg-white"
                  onChange={(e) => setForm((prevForm) => ({ ...prevForm, onSale: e.target.checked }))}
                />
                <span>On clearance?</span>
                <input
                  type="checkbox"
                  checked={form.clearance}
                  className="w-1/4 mx-5"
                  onChange={(e) => setForm((prevForm) => ({ ...prevForm, clearance: e.target.checked }))}
                />
              </div>
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
