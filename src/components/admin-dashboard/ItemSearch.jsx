import React, { useState, useEffect } from "react";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import ItemDisplayList from "./ItemDisplayList";

const ItemSearch = ({ items, updateItems }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [saleFilter, setSaleFilter] = useState(false);
  const [clearanceFilter, setClearanceFilter] = useState(false);

  useEffect(() => {
    const filteredItems = items.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(search.toLowerCase());
      const categoryMatch =
        categoryFilter === "" || item.category === categoryFilter;
      const saleMatch = !saleFilter || item.onSale;
      const clearanceMatch = !clearanceFilter || item.clearance;
      return nameMatch && categoryMatch && saleMatch && clearanceMatch;
    });

    setSearchResults(filteredItems);
    setNoResults(filteredItems.length === 0);
    updateItems(filteredItems);
  }, [items, search, categoryFilter, saleFilter, clearanceFilter]);


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

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const handleSaleFilter = () => {
    setSaleFilter((prevValue) => !prevValue);
  };

  const handleClearanceFilter = () => {
    setClearanceFilter((prevValue) => !prevValue);
  };

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
              className="px-4 py-2 rounded-l"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r"
            >
              {searchButtonText}
            </button>
          </form>
          {search && (
            <div className="text-left mt-2 absolute z-10 w-full bg-white border border-gray-300 shadow-md max-h-56 overflow-y-auto">
              <ul className="py-1">
                {searchResults.length > 0 ? (
                  searchResults.slice(0, 10).map((item) => (
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
      </div>
      <div className="mt-5 items-center">
        <p>Filter:</p>
        <div className="flex justify-center items-center mt-2">
          <input
            type="checkbox"
            checked={saleFilter}
            onChange={handleSaleFilter}
            className="mr-1 bg-white"
          />
          <label htmlFor="saleFilter" className="mr-4">
            On Sale
          </label>
          <input
            type="checkbox"
            checked={clearanceFilter}
            onChange={handleClearanceFilter}
            className="mr-1"
          />
          <label htmlFor="clearanceFilter" className="mr-4">
            On Clearance
          </label>
          <select
            value={categoryFilter}
            className="bg-white border w-41 border-gray-300 rounded px-3 py-1"
            onChange={(event) => handleCategoryFilter(event.target.value)}
          >
            <option value="">All Departments</option>
            <option value="bakery">Bakery</option>
            <option value="chilled">Chilled</option>
            <option value="deli">Deli</option>
            <option value="frozen">Frozen</option>
            <option value="grocery">Grocery</option>
            <option value="liquor">Liquor</option>
            <option value="produce">Produce</option>
            <option value="seafood">Seafood</option>
          </select>
          <div className="ml-5">
            <span>Results: {searchResults.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSearch;
