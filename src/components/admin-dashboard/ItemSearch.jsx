import React, { useState, useEffect } from "react";
import notepad from "../../images/notepad.png";

const ItemSearch = ({
  items,
  updateItems,
  setAddModalOpen,
  setItem,
  setCurrentPage,
  displayNumber,
  setDisplayNumber,
}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [saleFilter, setSaleFilter] = useState(false);
  const [clearanceFilter, setClearanceFilter] = useState(false);

  useEffect(() => {
    const filteredItems = items.filter((item) => {
      const nameMatch =
        item.name && item.name.toLowerCase().includes(search.toLowerCase());
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

  const resetPage = () => {
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    resetPage();
  };

  const handleCreateItem = (event) => {
    event.preventDefault();
    setAddModalOpen(true);
    setItem(search);
  };

  const handleCategoryFilter = (category) => {
    resetPage();
    setCategoryFilter(category);
  };

  const handleSaleFilter = () => {
    resetPage();
    setSaleFilter((prevValue) => !prevValue);
  };

  const handleClearanceFilter = () => {
    resetPage();
    setClearanceFilter((prevValue) => !prevValue);
  };

  const handleDisplay = (option) => {
    resetPage();
    setDisplayNumber(option);
  };

  return (
    <div>
      <div className="flex justify-center align-middle">
        <div className="relative mt-1.5 mb-2.5">
          <input
            type="text"
            placeholder="Search for an item..."
            value={search}
            onChange={handleSearch}
            className="mt-1.5 mb-2.5 px-4 py-2 rounded-lg w-96 h-12 border border-black"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 border-none hover:text-blue-400 font-bold p-2 mr-1 bg-white"
            >
            X
            </button>
          )}
        </div>
        <div className="relative">
          <button 
            onClick={handleCreateItem} 
            className="w-14 hover:w-16 my-2.5 hover:my-1 mx-5 hover:mx-4 bg-white py-0.5 px-1 border-black 
              rounded-lg transition-all duration-300"
            >
            <img src={notepad} className=""/>
          </button>
          <span className="absolute bg-white text-gray-700 border border-gray-700 rounded-md text-sm py-1 px-2 
            -bottom-1 md:-bottom-8 ml-2 left-20 md:-left-7 opacity-0 transition-opacity duration-300 pointer-events-none w-32">
            Create new item
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center">
          
        </div>
      <div className="mt-5 items-center">
        <p>Filter:</p>
        <div className="flex justify-center items-center align-center mt-2 md:flex-col">
          <div>
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
          </div>
          <div className="flex gap-2 justify-center">
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
          </div>
          <div className="flex flex-row ml-3 items-center">
            <p>Items per page: </p>
            <select
              value={displayNumber}
              className="bg-white border w-41 border-gray-300 rounded px-3 py-1 mx-1"
              onChange={(e) => handleDisplay(e.target.value)}
            >
              <option value="12">12</option>
              <option value="24">24</option>
            </select>
          </div>
          <span className="ml-2 lg:ml-0">Results: {searchResults.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemSearch;
