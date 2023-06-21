import React, { useEffect, useState } from "react";
import getAllItems from "../../utils/getAllItems";
import ItemDisplayStore from "./ItemDisplayStore";

const Items = ({sortingOption, checked}) => {
  const [allItems, setAllItems] = useState([]);

  const getItems = async () => {
    const results = await getAllItems();
    setAllItems(results);
  };

  useEffect(() => {
    getItems();
  }, []);

  const itemMap = allItems.map((item) => {
    return <ItemDisplayStore item={item} key={item.id} />;
  });

  const clearanceItemMap = allItems.filter((item) => item.clearance).map((item) => {
    return <ItemDisplayStore item={item} key={item.id} />;
  })

  return (
    <div>
      <div className="flex flex-wrap justify-center align-center items-center gap-2">
        {checked ? itemMap : clearanceItemMap}
      </div>
    </div>
  );
};

export default Items;
