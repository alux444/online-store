import React, { useEffect, useState } from "react";
import getAllItems from "../../utils/getAllItems";
import ItemDisplayStore from "./ItemDisplayStore";

const Items = ({ sortingOption, checked, category }) => {
  const [allItems, setAllItems] = useState([]);

  const getItems = async () => {
    const results = await getAllItems();
    setAllItems(results);
  };

  useEffect(() => {
    getItems();
  }, []);

  let sortedItems = allItems;
  
  // Add proper category matching once store items are back
  if (category === "bakery") {
    sortedItems = allItems.filter((item) => item.category);
  } else if (category === "bakery") {
    sortedItems = allItems.filter((item) => item.category);
  } else if (category === "chilled") {
    sortedItems = allItems.filter((item) => item.category);
  } else if (category === "deli") {
    sortedItems = allItems.filter((item) => item.category);
  } else if (category === "frozen") {
    sortedItems = allItems.filter((item) => item.category);
  } else if (category === "grocery") {
    sortedItems = allItems.filter((item) => item.category);
  } else if (category === "liquor") {
    sortedItems = allItems.filter((item) => item.category);
  } else if (category === "produce") {
    sortedItems = allItems.filter((item) => item.category);
  } else if (category === "seafood") {
    sortedItems = allItems.filter((item) => item.category);
  }


  if (sortingOption === "date-old") {
    sortedItems = allItems.sort((a, b) => a.timeCreated - b.timeCreated);
  } else if (sortingOption === "date-new") {
    sortedItems = allItems.sort((a, b) => b.timeCreated - a.timeCreated);
  } else if (sortingOption === "price-low") {
    sortedItems = allItems.sort(
      (a, b) => (a.price - a.discount) - (b.price - b.discount)
    );
  } else if (sortingOption === "price-high") {
    sortedItems = allItems.sort(
      (a, b) => (b.price - b.discount) - (a.price - a.discount)
    );
  }

  const itemMap = sortedItems.map((item) => (
    <ItemDisplayStore item={item} key={item.id} />
  ));

  const clearanceItemMap = allItems
    .filter((item) => item.clearance)
    .map((item) => <ItemDisplayStore item={item} key={item.id} />);

  return (
    <div>
      <div className="flex flex-wrap justify-center align-center items-center gap-2">
        {checked ? clearanceItemMap : itemMap}
      </div>
    </div>
  );
};

export default Items;