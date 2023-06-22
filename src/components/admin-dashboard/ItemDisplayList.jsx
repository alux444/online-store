import React, { useState, useEffect } from "react";
import ItemModal from "../admin-dashboard/ItemModal";
import convertDate from "../../utils/convertDate";
import getAllItems from "../../utils/getAllItems";

const ItemDisplayList = ({ item, onOpenModal }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  const closePreview = () => {
    setShowPreview(false);
  };

  const date = convertDate(item.timeCreated);

  useEffect(() => {
    if (!modalOpen) {
      fetchData();
    }
  }, [modalOpen]);

  const fetchData = async () => {
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.log("Error retrieving items:", error);
    }
  };

  const handleItemClick = (item) => {
    setModalItem(item);
    onOpenModal();
    console.log("Search query:", item.name);
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
        {item.clearance ? `CLEARANCE: $${item.price - item.discount}` : item.onSale ? `SALE: $${item.price - item.discount}` : "No Sale."}{" "}
          <br />
          Original price: ${item.price}
          <br />
          Stock on hand: {item.stock}
        </p>
      </div>
    </div>
  );
};

export default ItemDisplayList;
