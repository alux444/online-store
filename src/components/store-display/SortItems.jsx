import React, { useState } from "react";

const SortItems = ({
  handleSorting,
  handleChange,
  sortingOption,
  checked,
  category,
  handleCategory,
  displayNumber,
  handleDisplay
}) => {
  return (
    <div className="flex md:flex-col justify-center align-center items-center mb-3 gap-1 flex-wrap">
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
      <div className="flex flex-row ml-3 items-center">
        <p>Items per page: </p>
        <select
          value={displayNumber}
          className="bg-white border w-41 border-gray-300 rounded px-3 py-1 mx-1"
          onChange={(e) => handleDisplay(e.target.value)}
        >
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </div>
    </div>
  );
};

export default SortItems;
