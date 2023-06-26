import React from "react";
import ItemDisplayStore from "./ItemDisplayStore";
import Pagination from "../misc-components/Pagination";

const Items = ({
  sortingOption,
  checked,
  category,
  allItems,
  currentPage,
  changePage,
  displayNumber,
  setWobble,
  search
}) => {
  let sortedItems = allItems;

  if (search.length > 0) {
    sortedItems = sortedItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (category != "") {
    sortedItems = sortedItems.filter((item) => item.category === category);
  }

  if (sortingOption === "date-old") {
    sortedItems = sortedItems.sort((a, b) => a.timeCreated - b.timeCreated);
  } else if (sortingOption === "date-new") {
    sortedItems = sortedItems.sort((a, b) => b.timeCreated - a.timeCreated);
  } else if (sortingOption === "price-low") {
    sortedItems = sortedItems.sort((a, b) => {
      let aTotal = a.price;
      let bTotal = b.price;
      if (a.onSale) {
        aTotal -= a.discount;
      } 
      if (b.onSale) {
        bTotal -= b.discount;
      }
      return aTotal - bTotal;
    }
    );
  } else if (sortingOption === "price-high") {
    sortedItems = sortedItems.sort((a, b) => {
      let aTotal = a.price;
      let bTotal = b.price;
      if (a.onSale) {
        aTotal -= a.discount;
      } 
      if (b.onSale) {
        bTotal -= b.discount;
      }
      return bTotal - aTotal;
    }
    );
  }

  const clearanceItems = sortedItems.filter((item) => item.clearance);

  const displaysPerPage = displayNumber;
  const indexOfLastItem = currentPage * displaysPerPage;
  const indexOfFirstItem = indexOfLastItem - displaysPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const currentClearance = clearanceItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const itemMap = currentItems.map((item) => (
    <ItemDisplayStore item={item} key={item.id} setWobble={setWobble} />
  ));

  const clearanceMap = currentClearance.map((item) => (
    <ItemDisplayStore item={item} key={item.id} setWobble={setWobble} />
  ));

  return (
    <div>
      <div className="flex flex-wrap justify-center align-center items-center gap-2">
        {checked ? (clearanceMap.length ? clearanceMap : <h1>No results found</h1>) : (itemMap.length ? itemMap : <h1>No results found</h1>)}
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
