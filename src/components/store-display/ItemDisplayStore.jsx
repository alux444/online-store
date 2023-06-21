import React, { useState } from "react";
import ItemDisplayModal from "./ItemDisplayModal";

const ItemDisplayStore = ({ item }) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex border-[1px] justify-center align-center">
      <div className="flex justify-center align-center">
        <img src={item.imageUrl} className="max-w-[20vw] max-h-10vh" />
      </div>
      <div className="block border-2 border-red">
        <p>
          {item.name}
          <br />${item.onSale ? item.price - item.discount : item.price}
        </p>
        <br />
      </div>
      <button>Add to Cart</button>
      <button onClick={() => setOpen(true)}>Show More</button>
      <ItemDisplayModal open={open} close={closeModal} item={item} />
    </div>
  );
};

export default ItemDisplayStore;
