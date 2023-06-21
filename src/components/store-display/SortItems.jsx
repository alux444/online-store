import React, { useState } from "react";

const SortItems = ({handleSorting, handleChange, sortingOption, checked}) => {
  return (
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
  );
};

export default SortItems;
