import React, { useState, useEffect } from "react";
import ItemSearch from "./ItemSearch";
import ItemDisplayList from "./ItemDisplayList";
import getAllItems from "../../utils/getAllItems";

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
        setFilteredItems(data); 
      } catch (error) {
        console.log("Error retrieving items:", error);
      }
    };

    fetchData();
  }, []);

  const updateItems = (updatedItems) => {
    setFilteredItems(updatedItems); 
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <ItemSearch items={items} updateItems={updateItems} />

      <div className="mt-5 w-[70vw]">
        {filteredItems.map((item) => (
          <ItemDisplayList item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
