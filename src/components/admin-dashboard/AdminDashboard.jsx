import React, { useState, useEffect } from "react";
import ItemSearch from "./ItemSearch";
import ItemDisplayList from "./ItemDisplayList";
import getAllItems from "../../utils/getAllItems";
import ItemModal from "./ItemModal";

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleOpenModal = (item) => {
    setModalItem(item);
    setModalOpen(true);
    console.log("Modal opened.");
  };

  const handleModalClose = () => {
    setModalItem(null);
    setModalOpen(false);
    console.log("Modal closed.");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <ItemSearch items={items} updateItems={updateItems} onOpenModal={() => handleOpenModal()}/>

      <div className="mt-5 w-[70vw]">
        {filteredItems.length === 0 && (
          <div className="flex border-[1px] items-center px-4 py-2">
            <p>No results found.</p>
          </div>
        )}
        {filteredItems.map((item) => (
          <ItemDisplayList item={item} key={item.id} onOpenModal={() => handleOpenModal(item)} />
        ))}
      </div>

      {modalItem && modalOpen && (
        <ItemModal item={modalItem} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default AdminDashboard;
