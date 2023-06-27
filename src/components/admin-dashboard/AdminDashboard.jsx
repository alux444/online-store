import React, { useState, useEffect } from "react";
import ItemSearch from "./ItemSearch";
import ItemDisplayList from "./ItemDisplayList";
import getAllItems from "../../utils/getAllItems";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import Pagination from "../misc-components/Pagination";

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayNumber, setDisplayNumber] = useState("12");

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

  const itemUpdate = (updatedItem) => {
    setItems((prevItems) => {
      let updatedItems;
      if (updatedItem === null) {
        updatedItems = prevItems.filter((item) => item.id !== modalItem.id);
      } else {
        updatedItems = prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
      }
      setFilteredItems(updatedItems);
      return updatedItems;
    });
    setModalItem(null);
    setModalOpen(false);
  };

  const itemAdd = (newItem) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems, newItem];
      setFilteredItems(updatedItems);
      console.log("Total items: " + updatedItems.length);
      return updatedItems;
    });
    setAddModalOpen(false);
  };

  const handleOpenModal = (item) => {
    setModalItem(item);
    setModalOpen(true);
    console.log("Modal opened.");
  };

  const handleModalClose = () => {
    setModalItem(null);
    setModalOpen(false);
    setAddModalOpen(false);
    console.log("Modal closed.");
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displaysPerPage = displayNumber;
  const indexOfLastItem = currentPage * displaysPerPage;
  const indexOfFirstItem = indexOfLastItem - displaysPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const mappedItems = currentItems.map((item) => (
    <ItemDisplayList
      item={item}
      key={`${item.id}-${Date.now()}`} // Generate a unique key using item ID and timestamp
      onOpenModal={() => handleOpenModal(item)}
    />
  ));

  return (
    <div className="flex align-center justify-center flex-col">
      <h1 className="price">Admin Dashboard</h1>

      <ItemSearch
        items={items}
        updateItems={updateItems}
        setAddModalOpen={setAddModalOpen}
        setItem={setSearch}
        setCurrentPage={setCurrentPage}
        displayNumber={displayNumber}
        setDisplayNumber={setDisplayNumber}
      />

      <div className="mt-5 w-[70vw] md:w-[90vw]">
        {filteredItems.length === 0 && (
          <div className="flex border-[1px] items-center px-4 py-2">
            <p>No results found.</p>
          </div>
        )}
        {mappedItems}
      </div>
      <Pagination
        totalDisplay={filteredItems.length}
        displaysPerPage={displaysPerPage}
        paginate={changePage}
        currentPage={currentPage}
      />

      {modalItem && modalOpen && (
        <ItemModal
          item={modalItem}
          onClose={handleModalClose}
          itemUpdate={itemUpdate}
        />
      )}
      {addModalOpen && (
        <AddItemModal
          item={search}
          onClose={handleModalClose}
          itemAdd={itemAdd}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
