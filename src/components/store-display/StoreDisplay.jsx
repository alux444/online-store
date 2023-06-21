import React from "react";
import Items from "./Items";
import Cart from "./cart/Cart";

const StoreDisplay = () => {
  return (
    <div>
      <p>Store display.</p>
      <Cart />
      <Items />
    </div>
  );
};

export default StoreDisplay;
