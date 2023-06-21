import React from "react";

const ItemDisplayList = ({ item }) => {
  return (
    <div className="flex border-[1px] justify-center align-center">
      <div className="flex justify-center align-center">
        <img src={item.imageUrl} className="max-w-[20vw] max-h-10vh" />
      </div>
      <div className="block border-2 border-red">
        <p>
          {item.name}, ${item.price}, discount: {item.discount}
        </p>
        <small>
          {item.onSale ? "On Sale" : "Not on Sale"},{" "}
          {item.clearance ? "In Clearance Section" : "Not on Clearance."}
        </small>
        <br />
        <small>Description: {item.description}</small>
      </div>
      <button>Edit this Item</button>
    </div>
  );
};

export default ItemDisplayList;
