import React, { useState } from "react";
import ItemModal from "../admin-dashboard/ItemModal";
import convertDate from "../../utils/convertDate";

const ItemDisplayList = ({ item }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const closePreview = () => {
    setShowPreview(false);
  };

  const date = convertDate(item.timeCreated);

  const handleItemClick = (item) => {
    setModalItem(item);
    setModalOpen(true);
    console.log("Search query:", item.name);
  };

  const handleModalClose = () => {
    setModalItem(null);
    setModalOpen(false);
    console.log("Modal closed.");
  };

  return (
    <div className="flex border-[1px] items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleItemClick(item)}
      >
      <div className="mr-4 text-left w-2/3">
        <p>{item.name}</p>
      </div>
      <div className="text-left">
        <p>
          Current price: ${item.onSale ? item.price - item.discount : item.price}
          <br />
          Original price: ${item.price}
          <br />
          Stock on hand: {item.stock}
        </p>
      </div>
      {modalItem && modalOpen && (
      <ItemModal item={modalItem} onClose={handleModalClose} />
       )}
    </div>
  );
};

/*
return (
    <div className="flex border-[1px] justify-center align-center">
      <div className="flex justify-center align-center">
        <img src={item.imageUrl} className="max-w-[20vw] max-h-10vh" />
      </div>
      <div className="block border-2 border-red">
        <p>
          {item.name}, ${item.onSale ? item.price - item.discount : item.price}
          <br />
          original price: {item.price}, discount: {item.discount}
        </p>
        <small>
          {item.onSale ? "On Sale" : "Not on Sale"},{" "}
          {item.clearance ? "In Clearance Section" : "Not on Clearance."}
        </small>
        <br />
        <small>Description: {item.description}</small>
        <br />
        <small>Added on: {date}</small>
      </div>
      <button>Edit this Item</button>
      <button onClick={() => setShowPreview(true)}>Preview this Item</button>
      <ItemDisplayModal open={showPreview} close={closePreview} item={item} />
    </div>
  );
*/
export default ItemDisplayList;
