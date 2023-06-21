import React, { useState } from "react";
import Items from "./Items";
import Cart from "./cart/Cart";

const StoreDisplay = () => {
  const [sortingOption, setSortingOption] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSorting = (option) => {
    setSortingOption(option);

    console.log(`sorting by ${option}`);
  };

  const handleChange = () => {
    setChecked(!checked);
  }

  return (
    <div>
      <p>Store display.</p>
      <Cart />
      <div className="flex justify-center align-center">
        <div>
          <p>Filter by:</p>
        </div>
        <div className="mr-5">
          <select
            value={sortingOption}
            onChange={(e) => handleSorting(e.target.value)}
          >
            <option value="date-old">Date Added (Oldest)</option>
            <option value="date-new">Date added (Newest)</option>
            <option value="price-low">Price (Low)</option>
            <option value="price-high">Price (High)</option>
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
            />
            Show clearance
          </label>
        </div>
      </div>


      <Items sortingOption={sortingOption} checked={checked}/>
    </div>
  );
};

export default StoreDisplay;
