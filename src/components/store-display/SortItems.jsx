import React, { useState } from "react";

const SortItems = ({handleSorting, handleChange, sortingOption, checked, category, handleCategory}) => {
  return (
    <div className="flex justify-center align-center items-center">
      <div>
        <p>Filter by: </p>
      </div>
      <div className="mr-5">
        <select
          value={sortingOption}
          onChange={(e) => handleSorting(e.target.value)}
          className="bg-white border w-41 border-gray-300 rounded px-3 py-1 ml-2"
        >
          <option value="date-old">Date Added (Oldest)</option>
          <option value="date-new">Date added (Newest)</option>
          <option value="price-low">Price (Low)</option>
          <option value="price-high">Price (High)</option>
        </select>
      </div>
      <select
        value={category}
        className="bg-white border w-41 border-gray-300 rounded px-3 py-1 mr-5"
        onChange={(e) => handleCategory(e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="bakery">Bakery</option>
        <option value="chilled">Chilled</option>
        <option value="deli">Deli</option>
        <option value="frozen">Frozen</option>
        <option value="grocery">Grocery</option>
        <option value="liquor">Liquor</option>
        <option value="produce">Produce</option>
        <option value="seafood">Seafood</option>
      </select>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            className="mr-1"
          />
          Show clearance
        </label>
      </div>
    </div>
  );
};

export default SortItems;
