import React, { useEffect, useState } from "react";
import getAllItems from "../../utils/getAllItems";
import ItemDisplayStore from "./ItemDisplayStore";

const Items = () => {
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

  return (
    <div>
      <div className="flex flex-wrap justify-center align-center items-center gap-2">
        {itemMap}
      </div>
    </div>
  );
};

export default Items;
