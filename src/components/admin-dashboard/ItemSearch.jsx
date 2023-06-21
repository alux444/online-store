import React, { useState, useEffect } from "react";
import getAllItems from "../../utils/getAllItems";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import ItemDisplayList from "./ItemDisplayList";

const ItemSearch = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

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

  useEffect(() => {
    const filteredItems = items.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    setSearchResults(filteredItems);

    setNoResults(filteredItems.length === 0);
  }, [items, search]);

  useEffect(() => {
    if (!addModalOpen || !modalOpen) {
      fetchData();
    }
  }, [addModalOpen, modalOpen]);

  const fetchData = async () => {
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.log("Error retrieving items:", error);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    console.log("Search query:", search);
    if (noResults) {
      setAddModalOpen(true);
    }
  };

  const handleItemClick = (item) => {
    setModalItem(item);
    setModalOpen(true);
    console.log("Search query:", item.name);
  };

  const handleModalClose = () => {
    setModalItem(null);
    setSearch("");
    setModalOpen(false);
    setAddModalOpen(false);
    console.log("Modal closed.");
  };

  const listDisplay = items.map((item) => {
    return <ItemDisplayList item={item} key={item.id} />;
  });

  const searchButtonText = noResults ? "Add" : "Search";
  return (
    <div>
      <div className="flex justify-center">
        <div className="relative">
          <form onSubmit={handleChange} className="flex items-center">
            <input
              type="text"
              placeholder="Search for an item..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="px-4 py-2 rounded-l "
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r"
            >
              {searchButtonText}
            </button>
          </form>
          {search && (
            <div className="text-left mt-2 absolute z-10 w-full bg-white border border-gray-300 shadow-md">
              <ul className="py-1">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2">No results found.</li>
                )}
              </ul>
            </div>
          )}
        </div>
        {modalItem && modalOpen && (
          <ItemModal item={modalItem} onClose={handleModalClose} />
        )}
        {noResults && addModalOpen && (
          <AddItemModal item={search} onClose={handleModalClose} />
        )}
        <br />
        <p>test</p>
      </div>
      <div className="mt-5 w-[70vw]">{listDisplay}</div>
    </div>
  );
};

export default ItemSearch;
