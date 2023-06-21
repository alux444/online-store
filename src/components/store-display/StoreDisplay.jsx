import React, { useState } from "react";
import Items from "./Items";
import Cart from "./cart/Cart";
import SortItems from "./SortItems";

const StoreDisplay = () => {
  const [sortingOption, setSortingOption] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSorting = (option) => {
    setSortingOption(option);
  };

  const handleChange = () => {
    setChecked(!checked);
  }

  return (
    <div>
      <p>Store display.</p>
      <Cart />
      <SortItems handleSorting={handleSorting} handleChange={handleChange} sortingOption={sortingOption} checked={checked}/>
      <Items sortingOption={sortingOption} checked={checked}/>
    </div>
  );
};

export default StoreDisplay;
