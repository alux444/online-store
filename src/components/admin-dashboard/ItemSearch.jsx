import React, { useState, useEffect } from "react";

const ItemSearch = ({ items, updateItems, setAddModalOpen, setItem, setCurrentPage }) => {
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

  const handleChange = (event) => {
    event.preventDefault();
    console.log("Search query:", search);
    if (noResults) {
      setAddModalOpen(true);
      setItem(search);
    }
  };

  const resetPage = () => {
    setCurrentPage(1);
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

  const searchButtonText = noResults ? "Add" : "Search";

  return (
    <div>
      <div className="flex justify-center flex-wrap">
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
        </div>
        <br />
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
          <span className="ml-2 lg:ml-0">Results: {searchResults.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemSearch;
