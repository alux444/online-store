import React from "react";

const ItemDisplayList = ({ item }) => {
  return (
    <div className="block border-[1px]">
      <div className="w-[100%] flex justify-center align-center">
        <img src={item.imageUrl} className="max-w-[20vw] max-h-10vh" />
      </div>
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
  );
};

export default ItemDisplayList;
