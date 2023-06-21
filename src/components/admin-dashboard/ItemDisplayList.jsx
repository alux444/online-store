import React, { useState } from "react";
import ItemDisplayModal from "../store-display/ItemDisplayModal";
import convertDate from "../../utils/convertDate";

const ItemDisplayList = ({ item }) => {
  const [showPreview, setShowPreview] = useState(false);

  const closePreview = () => {
    setShowPreview(false);
  };

  const date = convertDate(item.timeCreated);

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
};

export default ItemDisplayList;
