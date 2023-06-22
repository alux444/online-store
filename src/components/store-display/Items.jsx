import React, { useEffect, useState } from "react";
import getAllItems from "../../utils/getAllItems";
import ItemDisplayStore from "./ItemDisplayStore";
import Pagination from "../misc-components/Pagination";

const Items = ({
  sortingOption,
  checked,
  category,
  allItems,
  currentPage,
  changePage,
}) => {
  let sortedItems = allItems;

  if (category != "") {
    sortedItems = sortedItems.filter((item) => item.category === category);
  }

  if (sortingOption === "date-old") {
    sortedItems = sortedItems.sort((a, b) => a.timeCreated - b.timeCreated);
  } else if (sortingOption === "date-new") {
    sortedItems = sortedItems.sort((a, b) => b.timeCreated - a.timeCreated);
  } else if (sortingOption === "price-low") {
    sortedItems = sortedItems.sort(
      (a, b) => a.price - a.discount - (b.price - b.discount)
    );
  } else if (sortingOption === "price-high") {
    sortedItems = sortedItems.sort(
      (a, b) => b.price - b.discount - (a.price - a.discount)
    );
  }

  const clearanceItems = sortedItems.filter((item) => item.clearance);

  const displaysPerPage = 12;
  const indexOfLastItem = currentPage * displaysPerPage;
  const indexOfFirstItem = indexOfLastItem - displaysPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const currentClearance = clearanceItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const itemMap = currentItems.map((item) => (
    <ItemDisplayStore item={item} key={item.id} />
  ));

  const clearanceMap = currentClearance.map((item) => (
    <ItemDisplayStore item={item} key={item.id} />
  ));

  return (
    <div>
      <div className="flex flex-wrap justify-center align-center items-center gap-2">
        {checked ? clearanceMap : itemMap}
      </div>
      <Pagination
        totalDisplay={checked ? clearanceItems.length : sortedItems.length}
        displaysPerPage={displaysPerPage}
        paginate={changePage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Items;
