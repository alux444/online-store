import React from "react";

const ItemDisplayList = ({ item, onOpenModal }) => {
  const handleItemClick = (item) => {
    onOpenModal();
    console.log("Search query:", item.name);
  };
  const toTitleCase = (str) => {
    if (!str) return "";
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  if (!item) {
    return null;
  }

  return (
    <div
      className="flex border-[1px] bg-white items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => handleItemClick(item)}
    >
      <div className="mr-4 text-left w-1/2">
        <p>{item.name}</p>
      </div>
      <div className="mr-4 text-left w-1/4">
        <p>
          Department: {toTitleCase(item.category)} <br />
          Stock on hand: {item.stock}
        </p>
      </div>
      <div className="text-left w-1/5">
        <p>
          {item.clearance
            ? `CLEARANCE: $${item.price - item.discount}`
            : item.onSale
            ? `SALE: $${item.price - item.discount}`
            : "No Sale."}{" "}
          <br />
          Original price: ${item.price}
        </p>
      </div>
    </div>
  );
};

export default ItemDisplayList;
