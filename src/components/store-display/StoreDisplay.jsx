import React, { useState } from "react";
import Items from "./Items";
import Cart from "./cart/Cart";
import SortItems from "./SortItems";

const StoreDisplay = () => {
  const [sortingOption, setSortingOption] = useState("");
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState("");

  const handleSorting = (option) => {
    setSortingOption(option);
  };

  const handleChange = () => {
    setChecked(!checked);
  }

  const handleCategory = (option) => {
    setCategory(option);
  }

  return (
    <div>
      <p>Store display.</p>
      <Cart />
      <SortItems 
        handleSorting={handleSorting} 
        handleChange={handleChange} 
        sortingOption={sortingOption} 
        checked={checked} 
        category={category} 
        handleCategory={handleCategory} 
      />
      <Items sortingOption={sortingOption} checked={checked} category={category} />
    </div>
  );
};

export default StoreDisplay;
