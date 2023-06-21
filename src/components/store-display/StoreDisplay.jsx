import React, { useState } from "react";
import Items from "./Items";
import Cart from "./cart/Cart";

const StoreDisplay = () => {
  const [sortingOption, setSortingOption] = useState("");

  const handleSorting = (option) => {
    setSortingOption(option);

    console.log(`sorting by ${option}`);
  };

  return (
    <div>
      <p>Store display.</p>
      <Cart />

      <div>
        <p>Filter by:</p>
        <select
          value={sortingOption}
          onChange={(e) => handleSorting(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price-low">Price (Low)</option>
          <option value="price-high">Price (High)</option>
          <option value="date-old">Date Added (Oldest)</option>
          <option value="date-new">Date added (Newest)</option>
        </select>
      </div>

      <Items />
    </div>
  );
};

export default StoreDisplay;
