import React, { useState, useEffect } from "react";
import getAllItems from "../../utils/getAllItems";

const ItemSearch = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
                    <li key={item.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
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
    </div>
  );
};

export default ItemSearch;