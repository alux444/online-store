import React, { useState, useEffect } from "react";
import ItemSearch from "./ItemSearch";
import ItemDisplayList from "./ItemDisplayList";
import getAllItems from "../../utils/getAllItems";

const AdminDashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
      } catch (error) {
        console.log("Error retrieving items:", error);
      }
    };
  
    fetchData();
  }, []);

  const updateItems = (updatedItems) => {
    setItems(updatedItems);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <ItemSearch items={items} updateItems={updateItems} />
    </div>
  );
};

export default AdminDashboard;
