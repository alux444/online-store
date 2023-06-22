import React from "react";

const ItemDisplayList = ({ item, onOpenModal }) => {
  const handleItemClick = (item) => {
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
