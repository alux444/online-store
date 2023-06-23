import React, { useState, useEffect } from "react";
import getAllItems from "../../utils/getAllItems";
import Items from "./Items";
import Cart from "./cart/Cart";
import SortItems from "./SortItems";

const StoreDisplay = () => {
  const [sortingOption, setSortingOption] = useState("");
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getItems = async () => {
    const results = await getAllItems();
    setAllItems(results);
  };

  useEffect(() => {
    getItems();
  }, []);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  const handleSorting = (option) => {
    resetPage();
    setSortingOption(option);
  };

  const handleChange = () => {
    resetPage();
    setChecked(!checked);
  };

  const handleCategory = (option) => {
    resetPage();
    setCategory(option);
  };

  return (
    <div className="w-[90vw]">
      <Cart />
      <SortItems
        handleSorting={handleSorting}
        handleChange={handleChange}
        sortingOption={sortingOption}
        checked={checked}
        category={category}
        handleCategory={handleCategory}
        resetPage={resetPage}
      />
      <Items
        sortingOption={sortingOption}
        checked={checked}
        category={category}
        allItems={allItems}
        currentPage={currentPage}
        changePage={changePage}
      />
    </div>
  );
};

export default StoreDisplay;
