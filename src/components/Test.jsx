import React, { useEffect, useState } from "react";
import ItemDisplayModal from "./store-display/ItemDisplayModal";
import getAllItems from "../utils/getAllItems";
import ItemDisplayStore from "./store-display/ItemDisplayStore";

const Test = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const getItems = async () => {
    const results = await getAllItems();
    setData(results);
  };

  useEffect(() => {
    getItems();
  }, []);

  const test = () => {
    setOpen(false);
    console.log(data);
  };

  const itemMap = data.map((item) => {
    return <ItemDisplayStore item={item} key={item.id} />;
  });

  return (
    <div>
      <button onClick={test}>aaaa</button>
      {itemMap}
    </div>
  );
};

export default Test;
