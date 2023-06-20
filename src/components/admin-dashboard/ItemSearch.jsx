import React, { useState, useEffect } from "react";
import getAllItems from "../../utils/getAllItems";
import ItemModal from "./ItemModal";
import { set } from "firebase/database";

const ItemSearch = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
  }, [items, search]);

  const handleChange = (event) => {
    event.preventDefault();
    console.log('Search query:', search);
  };

  const handleItemClick = (item) => {
    setModalItem(item);
    setModalOpen(true);
    console.log("Search query:", item.name);
  };

  const handleModalClose = () => {
    setModalItem(null);
    setModalOpen(false);
    console.log("Modal closed.");
  };

  return (
    <div className="flex h-screen justify-center">
      <div className="relative">
        <form onSubmit={handleChange} className="flex items-center">
          <input
            type="text"
            placeholder="Search for an item..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="px-4 py-2 rounded-l "

          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
            Search
          </button>
          
        </form>
        {search && (
            <div className="text-left mt-2 absolute z-10 w-full bg-white border border-gray-300 shadow-md">
              <ul className="py-1">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <li key={item.id} 
                      onClick={() => handleItemClick(item)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
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
    </div>
  );
};

export default ItemSearch;