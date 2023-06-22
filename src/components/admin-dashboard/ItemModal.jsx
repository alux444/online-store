import React, { useRef, useState } from "react";
import { Modal, Button } from "@mui/material";
import deleteItem from "../../utils/deleteItem";
import updateItem from "../../utils/updateItem";
import useOutsideClick from "../../utils/useOutsideClose";



const ItemModal = ({ item, onClose, onUpdate }) => {
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
      const updatedItem = await updateItem(item.id, form);
      updateItem(updatedItem).then(() => {
        onUpdate(updatedItem); // Call the callback to update item in ItemDisplayList
        onClose(); // Close the modal
      });
        console.log(`${item.name} updated successfully`);
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
              <div>
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
